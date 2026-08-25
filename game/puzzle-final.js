'use strict'

sqCmd('SqDroppedCoin', /^(?:look|look at|search|examine|inspect) (?:the )?(?:ground|floor|street|pavement)$/i, function () {
  if (!sqHere('kfc_4u_outside') || !sq.woodQuest) return sqFail('The ground offers no especially useful revelation.')
  if (sqHas('sq_dropped_coin') || sq.branchBought || sq.camphorObtained) return sqMsg('The ground has already yielded its suspiciously convenient gold coin.')
  sqGive('sq_dropped_coin'); return sqMsg('A passing punter drops something shiny and continues without noticing. A gold coin lies on the ground, radiating plot utility.')
})
sqCmd('SqReadPlaque', /^(?:read|examine|look at|inspect) (?:the )?(?:plaque|memorial|sign)$/i, function () {
  if (!sqHere('commemorative_tree')) return sqFail('There is no commemorative plaque here.')
  return sqMsg('The plaque records that thirty-odd years ago Sir SoInSo struck down Dragon Lord Fire-Ra, losing an arm in the battle. A prosthetic was fashioned from a branch of this rare camphor tree.')
})
sqCmd('SqCutCamphorTree', /^(?:cut|chop|hack|saw|take) (?:a |the )?(?:branch|wood|camphor wood|tree|camphor tree)$/i, function () {
  if (!sqHere('commemorative_tree')) return sqFail('There is no camphor tree here.')
  return sqFail('The nearby guard clears his throat and rests a hand on his weapon. Apparently commemorative trees are not self-service timber yards.')
})
sqCmd('SqTalkSoInSo', /^(?:talk|speak|chat)(?: to| with)? (?:sir )?(?:soinso|so in so|old knight|knight|war hero)$/i, function () {
  if (!sqHere('dragons_maw_inside')) return sqFail('Sir SoInSo is not here.')
  if (sq.armStolen) return sqMsg('Sir SoInSo is unconscious and considerably less armed in the anatomical sense.')
  if (sq.sirSoInSoDrinks === 0) return sqMsg('Sir SoInSo tells you the battle with Fire-Ra was “a long bloody business” and taps his wooden arm. He squints at his empty drink. “History’s thirsty work.”')
  if (sq.sirSoInSoDrinks < 3) return sqMsg('Sir SoInSo is increasingly enthusiastic about the battle and increasingly vague about which army he was in.')
  return sqMsg('Sir SoInSo has reached the advanced stage of heroism known as sleeping face-first on a tavern table.')
})
sqCmd('SqBuyDrink', [/^(?:buy|get|order|give) (?:a |the )?(?:drink|ale|beer)(?: for (?:sir )?(?:soinso|old knight|knight))?$/i,/^(?:give|hand) (?:sir )?(?:soinso|old knight|knight) (?:a |the )?(?:drink|ale|beer)$/i], function () {
  if (!sqHere('dragons_maw_inside')) return sqFail('You are not in the tavern.')
  if (sq.armStolen) return sqMsg('Buying more drink for the unconscious one-armed war hero would be excessive.')
  const coin = ['sq_dropped_coin','sq_tree_coin','sq_gold_coin'].find(sqHas)
  if (!coin) return sqFail('The bartender introduces the radical tavern policy of requiring money.')
  sqRemove(coin); sq.sirSoInSoDrinks++
  if (sq.sirSoInSoDrinks < 3) return sqMsg('You buy Sir SoInSo another drink. He drains it, begins a story about Fire-Ra, forgets the middle and goes to the toilet with increasingly unreliable navigation.')
  sq.armStolen = true; w.sq_scraps.loc = 'southern_gate'; w.sq_beggar_later.loc = 'southern_gate'; sq.dogAtBeggar = true
  return sqMsg('Sir SoInSo collapses onto the table. His wooden arm rolls free. Scraps wakes instantly, grabs it and bolts from the tavern. The dog has understood the puzzle before you have.')
})
sqCmd('SqTalkBeggarArm', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:beggar|poor man)$/i, function () {
  if (!sqHere('southern_gate') || !sq.dogAtBeggar) return sqMsg('The beggar eyes you cautiously and returns to the important work of sitting down.')
  if (!sq.branchBought) return sqMsg('The beggar nods towards Scraps and the wooden arm. “That belongs to the dog now. Bring him another wooden branch or toy and he might trade.”')
  if (sq.camphorObtained) return sqMsg('“You got your arm,” says the beggar. “That is not a sentence I expected to say today.”')
  return sqMsg('The beggar points at your ordinary branch, then at Scraps. “Trade the dog. He has a simpler economy than Stan.”')
})
sqCmd('SqBuyBranch', [/^(?:buy|get|take|ask for|request) (?:a |the )?(?:branch|stick|wooden branch|dog toy)$/i,/^(?:ask) (?:stan|salesman|shopkeeper) (?:for|about) (?:a |the )?(?:branch|stick|dog toy)$/i], function () {
  if (!sqHere('four_u_inside') || !sq.flourDelivered) return sqFail('WOOD 4U is not currently in a useful branch-selling phase.')
  if (sq.branchBought) return sqMsg('You already bought the one branch Stan eventually admitted was in stock.')
  const coin = ['sq_dropped_coin','sq_tree_coin','sq_gold_coin'].find(sqHas)
  if (!coin) return sqFail('Stan offers several finance products before finally mentioning that branches still cost one gold coin.')
  sqRemove(coin); sq.branchBought = true; sqGive('sq_wooden_branch')
  return sqMsg('Stan cycles through oak, ash, pine, elm and “premium artisanal twig” before discovering one ordinary branch is actually in stock. You buy it.')
})
sqCmd('SqTradeScraps', [/^(?:give|offer|trade|swap|use) (?:the )?(?:branch|stick|wooden branch|dog toy) (?:to|with|for) (?:the )?(?:dog|scraps)$/i,/^(?:give|offer) (?:the )?(?:dog|scraps) (?:the )?(?:branch|stick|wooden branch|dog toy)$/i], function () {
  if (!sqHere('southern_gate') || !sq.dogAtBeggar) return sqFail('Scraps is not here with the wooden arm.')
  if (!sqHas('sq_wooden_branch')) return sqFail('You need another wooden branch or toy to tempt Scraps.')
  sqRemove('sq_wooden_branch'); sqGive('sq_camphor_arm'); sq.camphorObtained = true; w.sq_scraps.loc = 'dragons_maw_inside'
  return sqMsg('You offer Scraps the fresh branch. The ordinary stick wins decisively over the historically significant prosthetic. He drops Sir SoInSo’s camphor arm and trots off.')
})
sqCmd('SqGiveCamphor', [/^(?:give|hand|offer|use) (?:the )?(?:camphor )?(?:arm|prosthetic arm|wood|camphor wood) (?:to|with) (?:the )?(?:server|woman|clerk)$/i,/^(?:give|hand) (?:the )?(?:server|woman|clerk) (?:the )?(?:camphor )?(?:arm|prosthetic arm|wood)$/i], function () {
  if (!sqHere('kfc_inside')) return sqFail('The KFC server is not here.')
  if (!sqHas('sq_camphor_arm')) return sqFail('You do not have suitable camphor wood.')
  sqRemove('sq_camphor_arm'); sq.friedChickenReady = true; sqGive('sq_fried_chicken'); sq.stage = 'keep'
  return sqMsg('The server accepts the camphor wood with remarkably few questions about provenance. The fryers roar to life, and she presents one whole bucket of Kamalot Fried Chicken, gizzards n’ all.')
})
sqCmd('SqEnterKeep', [/^(?:enter|go in|go inside|open|go through) (?:the )?(?:keep|main keep|keep doors|doors)$/i,/^(?:go|walk|head) north$/i], function () {
  if (!sqHere('main_keep_entrance')) return sqFail('This is not the Main Keep entrance.')
  if (!sqHas('sq_fried_chicken')) return sqFail('The guard blocks the doors. “No fried chicken, no knight.”')
  return sqMovePlayer('knights_room','The guard spots the chicken and waves you through with reverence normally reserved for royalty.')
})
sqCmd('SqDeliverFinalChicken', [/^(?:give|leave|put|place|hand) (?:the )?(?:fried chicken|chicken bucket|bucket meal|kfc) (?:to|for|on) (?:sir )?(?:arrogant|knight|table)$/i,/^(?:knock|knock on) (?:the )?(?:door|room door)$/i], function () {
  if (!sqHere('knights_room')) return sqFail('Sir Arrogant’s room is not here.')
  if (!sqHas('sq_fried_chicken')) return sqFail('You have somehow reached the knight without the food he demanded.')
  sqRemove('sq_fried_chicken'); sq.keepSequenceDone = true; sq.stage = 'dungeon'
  const cuddleCandidates = ['the beggar','the fisherman','the chef','Scraps the dog','Old Man Emmett','a very confused King’s Guard']
  const cuddle = cuddleCandidates[Math.floor(Math.random() * cuddleCandidates.length)]
  sqMsg('You knock. Sir Arrogant snaps from inside: “About time! Leave it on the table and get out!” A maid giggles. You decide several questions are outside your employment contract.')
  sqMsg('Later, off duty, you join other squires at the Dragon’s Maw. One drink becomes several. Next morning you wake in the abandoned cart beside Tourist Information cuddling ' + cuddle + '. Horns announce the joust.')
  sqMsg('Sir Arrogant charges Sir Just. Halfway down the list, pieces of Arrogant’s armour begin falling off. Sir Just knocks him cleanly from the saddle. Officials discover the armour was never properly fitted because his squire was absent. A major breach of the Squire’s Code. You are arrested and knocked unconscious.')
  Object.keys(w).forEach(function (key) { const item=w[key]; if (!item || item.room || item===player || item.name==='sq_brooch') return; if (item.loc===player.name) item.loc=undefined })
  return sqMovePlayer('dungeon_cell_1')
})

w.western_dock.desc = function () {
  if (!sq.fishermanActive) return 'This is the quiet western end of the dock. Gentle waves lap against the supports and gulls wheel overhead. The Main Dock lies EAST.'
  if (sqHas('sq_fish_bucket') || sq.fountainBroken) return 'The old fisherman is now hauling in fish with suspicious regularity. The Main Dock lies EAST.'
  return 'An old fisherman sits at the far end with his line in the water, visibly irritated by the absence of fish. The Main Dock lies EAST.'
}
w.kfc_4u_outside.desc = function () {
  let shop = 'The neighbouring 4U shop is boarded up beneath a COMING SOON notice.'
  if (sq.chickenRequested && !sq.chickenDelivered) shop = 'The neighbouring shop is now CHICKEN 4U, selling every chicken-related item except a useful fresh chicken.'
  if (sq.chickenDelivered && !sq.flourDelivered) shop = 'The neighbouring shop has become BELLS 4U with suspicious speed.'
  if (sq.flourDelivered) shop = 'The neighbouring shop is now WOOD 4U.'
  return 'Kamalot Fried Chicken occupies one shopfront. '+shop+' WEST returns to Tourist Information and NORTH to the Eastern Gate.'
}
w.waterfall.desc = function () { return sq.waterfallRestored ? 'A full waterfall thunders down the rock face into the river. The cliff route remains accessible behind it.' : 'Only a thin trickle descends the rock face. A small rounded opening high in the rocks is plainly visible, the sort of feature a proper waterfall would hide.' }
w.top_of_waterfall.desc = function () { return sq.waterfallRestored ? 'The river races freely towards the restored waterfall. Gorgul Thunderfist is conspicuously absent, having been promoted to airborne troll.' : 'The river has been almost completely blocked by an enormous Troll Chieftain wedged in the channel.' }
w.cog_house.desc = function () { if (!sq.waterfallRestored) return 'Huge wooden cogs dominate the Cog House, all motionless because the river is stopped.'; if (!sq.cogRepaired) return 'The water wheel has power again, but the drive belt has snapped. Huge wooden cogs wait beside a disengage lever.'; return 'The tied-vine belt links the mechanism. The lever controls whether the repaired cogs are engaged.' }

w.market.northwest = new Exit('alleyway',{use:function(){if(!sq.alleyRevealed)return falsemsg('You cannot see any route north-west until you investigate the market clutter.');player.moveChar(this);return true}})
w.western_gate_inside.west = new Exit('western_gate_outside',{use:function(){if(!sqHas('sq_leaflet'))return falsemsg('The guard blocks you. “Forest travel requires safety advice from Tourist Information.”');if(!sq.leafletTurned)return falsemsg('“Do you have protection?” asks the guard. Perhaps the leaflet contains more than you first read.');if(!sqHas('sq_bell'))return falsemsg('“No bell, no forest,” says the guard.');player.moveChar(this);return true}})
w.main_keep_entrance.north = new Exit('knights_room',{use:function(){if(!sqHas('sq_fried_chicken'))return falsemsg('The guard blocks the doors. “No fried chicken, no knight.”');player.moveChar(this);return true}})
