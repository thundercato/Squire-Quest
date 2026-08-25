'use strict'

sqCmd('SqTalkStan', /^(?:talk|speak|chat)(?: to| with)? (?:stan|the salesman|salesman|shopkeeper|assistant)$/i, function () {
  if (!sqHere('four_u_inside')) return sqFail('Stan is not here.')
  if (sq.flourDelivered) {
    if (!sq.branchBought) return sqMsg('“Welcome to WOOD 4U!” says Stan. “Branches, sticks, twigs, poles, dowels and several things legal asked me not to call lumber!” Ask for a BRANCH if you value your financial future poorly.')
    return sqMsg('Stan has already sold you a branch and is now calculating interest on eye contact.')
  }
  if (!sq.bellAvailable) return sqMsg('Stan smiles. “Coming Soon!” The shop is currently selling optimism.')
  if (!sqHas('sq_bell')) { sqGive('sq_bell'); return sqMsg('Stan places a sturdy bell in your hand. “No money? No problem! Store credit at only ninety-nine point nine per cent interest!”') }
  return sqMsg('“Enjoy the bell!” says Stan. “Repayments began yesterday!”')
})
sqCmd('SqGetBell', [/^(?:get|take|buy|borrow|ask for|request) (?:a |the )?bell$/i,/^(?:ask) (?:stan|salesman|shopkeeper) (?:for|about) (?:a |the )?bell$/i], function () {
  if (!sqHere('four_u_inside')) return sqFail('You would need to be in the 4U shop to obtain one.')
  if (sqHas('sq_bell')) return sqMsg('You already have the bell.')
  if (!sq.bellAvailable) return sqFail('BELLS 4U is not open yet.')
  sqGive('sq_bell'); return sqMsg('Stan hands you a bell on store credit at ninety-nine point nine per cent interest. The repayment schedule appears to begin yesterday.')
})
sqCmd('SqRingBell', [/^(?:ring|shake|use|sound) (?:the )?bell$/i,/^(?:ring)$/i], function () {
  if (!sqHas('sq_bell')) return sqFail('You mime ringing a bell. The performance lacks both bell and effect.')
  if (!sqHere('forest_clearing')) return sqMsg('The bell rings loudly. Somewhere, a troll updates its risk assessment.')
  if (sq.princessRescued) return sqMsg('You ring the bell again. The trolls are already several counties away.')
  sq.princessRescued = true; w.sq_princess.loc = 'forest_clearing'; sq.stage = 'waterfall'
  return sqMsg('You ring the bell. The two trolls shriek and crash away through the undergrowth. The hooded figure removes her hood. It is the Princess. “You saved me. I come out here secretly because palace life is unbearable and both jousting finalists are worse. Please tell nobody.”')
})
sqCmd('SqTalkPrincessForest', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:princess|hooded figure|figure|woman)$/i, function () {
  if (!sqHere('forest_clearing') || !sq.princessRescued) return sqFail('Talking is difficult while the Princess is either absent or being attacked by trolls.')
  w.sq_princess.loc = undefined
  return sqMsg('The Princess thanks you again and asks you not to reveal her secret walks. Before you can form a sentence without tripping over it, she heads back towards Kamalot.')
})
sqCmd('SqTalkEmmett', /^(?:talk|speak|chat)(?: to| with)? (?:old man )?(?:emmett|miller|old man)$/i, function () {
  if (!sqHere('old_mill_inside')) return sqFail('Old Man Emmett is not here.')
  if (!sq.waterfallRestored) return sqMsg('“River’s dried up,” says Emmett. “No water wheel, no mill, no flour.”')
  if (!sq.cogRepaired) { sq.millBeltBroken = true; return sqMsg('Emmett listens to the machinery. “Water’s back, but the drive belt snapped. Leather replacement’ll take weeks.”') }
  if (!sq.flourReady) { sq.flourReady = true; sqGive('sq_flour'); return sqMsg('Emmett starts the repaired mill. Cogs turn, stones grind and a sack fills with fresh flour in a sequence one lightning strike short of mad science.') }
  return sqMsg('Emmett pats the working mill. “Never doubted you.” His earlier remarks are not invited to testify.')
})
sqCmd('SqClimbTree', /^(?:climb|go up|climb up|ascend) (?:the )?(?:tree|branches?)$/i, function () {
  if (!sqHere('forest_tree')) return sqFail('There is no climbable forest tree here.')
  sq.magpieTriggered = true; return sqMovePlayer('tree_top','You climb carefully into the tree. The upper branch flexes under your weight in a way that feels legally significant.')
})
sqCmd('SqNestLoot', /^(?:look|examine|search|look in|peer in|inspect) (?:the )?(?:nest|magpie nest)$/i, function () {
  if (!sqHere('tree_top')) return sqFail('There is no magpie nest here.')
  return sqMsg('Inside the nest glitter a gold coin and a jewel-encrusted brooch. The magpie’s retirement portfolio is disturbingly diversified.')
})
sqCmd('SqTakeBrooch', /^(?:take|get|grab|pick up) (?:the )?(?:brooch|jewel(?:led|-encrusted)? brooch)$/i, function () {
  if (!sqHere('tree_top')) return sqFail('The brooch is not here.')
  if (sqHas('sq_brooch')) return sqMsg('You already have the brooch.')
  sqGive('sq_brooch'); return sqMsg('You take the brooch and retreat from the branch before gravity adds a competing puzzle.')
})
sqCmd('SqTakeTreeCoin', /^(?:take|get|grab|pick up) (?:the )?(?:gold )?coin$/i, function () {
  if (!sqHere('tree_top')) return sqFail('There is no magpie coin here.')
  if (sqHas('sq_tree_coin')) return sqMsg('You already took the coin.')
  sqGive('sq_tree_coin'); return sqMsg('You pocket the magpie’s gold coin. Somewhere nearby, a bird begins composing a strongly worded complaint.')
})
sqCmd('SqTalkTrollChief', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:troll|chieftain|troll chieftain|gorgul|gorgul thunderfist)$/i, function () {
  if (!sqHere('top_of_waterfall') || sq.waterfallRestored) return sqFail('The Troll Chieftain is not available for conversation.')
  return sqMsg('Gorgul Thunderfist strains against the riverbed. “Help Gorgul free, Gorgul not eat squire.” You negotiate one additional term: the trolls leave this area. He grudgingly agrees.')
})
sqCmd('SqGiveTrollBeans', [/^(?:give|hand|feed|offer|use) (?:the )?(?:bucket of )?(?:fiery )?(?:fava )?beans to (?:the )?(?:troll|chieftain|gorgul)$/i,/^(?:give|hand|feed) (?:the )?(?:troll|chieftain|gorgul) (?:the )?(?:bucket of )?(?:fiery )?(?:fava )?beans$/i], function () {
  if (!sqHere('top_of_waterfall') || sq.waterfallRestored) return sqFail('There is no wedged Troll Chieftain here who needs beans.')
  if (sqHas('sq_bean_sample')) { sqRemove('sq_bean_sample'); return sqMsg('Gorgul eats the tiny sample. A few bubbles rise around him. He looks disappointed. “Need… more.”') }
  if (!sqHas('sq_bean_bucket')) return sqFail('You need rather more than a sample. Think bucket-sized gastrointestinal engineering.')
  sqRemove('sq_bean_bucket'); sqGive('sq_empty_bucket'); sq.waterfallRestored = true; sq.millBeltBroken = true
  return sqMsg('Gorgul devours the entire bucket. There is a silence of terrible scientific significance. Then a blast launches the Troll Chieftain out of the river and into the middle distance. Water surges over the falls.')
})
sqCmd('SqSharpenKnife', [/^(?:sharpen|grind|hone) (?:the )?(?:blunt |kitchen )?knife (?:on|with|using) (?:the )?(?:mill ?stone|grinding stone|stone)$/i,/^(?:use) (?:the )?(?:blunt |kitchen )?knife (?:on|with) (?:the )?(?:mill ?stone|grinding stone)$/i], function () {
  if (!sqHere('old_mill_inside')) return sqFail('You need the mill stone.')
  if (!sqHas('sq_blunt_knife')) { if (sqHas('sq_sharp_knife')) return sqMsg('The knife is already sharp enough.'); return sqFail('You do not have the blunt knife.') }
  sqRemove('sq_blunt_knife'); sqGive('sq_sharp_knife')
  return sqMsg('You grind the blunt knife against the mill stone until it develops an edge capable of cutting something more challenging than porridge.')
})
sqCmd('SqCutVines', /^(?:cut|slice|chop|sever) (?:the )?(?:vines|vine)(?: with (?:the )?(?:knife|sharp knife))?$/i, function () {
  if (!sqHere('cliffs')) return sqFail('There are no useful cliff vines here.')
  if (sq.vinesCut) return sqMsg('The useful vines have already been cut.')
  if (!sqHas('sq_sharp_knife')) return sqFail(sqHas('sq_blunt_knife') ? 'The blunt knife worries the vine without actually inconveniencing it.' : 'You need something properly sharp.')
  sq.vinesCut = true; sqGive('sq_vines_item'); return sqMsg('The sharpened knife slices through two strong vines. You gather them before the cliff reclaims them.')
})
sqCmd('SqTieVinesTogether', /^(?:tie|join|knot|fasten) (?:the )?(?:vines|vine)(?: together)?$/i, function () {
  if (!sqHas('sq_vines_item')) return sqFail('You do not have the vines.')
  return sqMsg('You knot the two lengths of vine together into a surprisingly respectable improvised belt.')
})
sqCmd('SqPullLever', /^(?:pull|lower|move) (?:the )?(?:lever|handle)$/i, function () {
  if (!sqHere('cog_house')) return sqFail('There is no cog-house lever here.')
  if (sq.cogDisengaged) return sqMsg('The lever is already pulled and the mechanism disengaged.')
  sq.cogDisengaged = true; return sqMsg('You pull the lever. The drive disengages with a heavy clunk.')
})
sqCmd('SqPushLever', /^(?:push|raise|engage|move) (?:the )?(?:lever|handle)$/i, function () {
  if (!sqHere('cog_house')) return sqFail('There is no cog-house lever here.')
  if (!sq.cogDisengaged) return sqMsg('The lever is already pushed and the mechanism engaged.')
  sq.cogDisengaged = false
  return sqMsg(sq.cogRepaired ? 'You push the lever. The repaired drive catches and the cogs begin turning.' : 'You re-engage the mechanism. Without a replacement belt, the cogs rotate uselessly.')
})
sqCmd('SqTieVinesCog', [/^(?:tie|attach|fasten|fit|use) (?:the )?(?:vines|vine) (?:to|onto|around|on|with) (?:the )?(?:cog|cogs|gear|mechanism)$/i,/^(?:use) (?:the )?(?:vines|vine) (?:as|for) (?:a )?(?:belt|drive belt)$/i], function () {
  if (!sqHere('cog_house')) return sqFail('You need the broken mill mechanism.')
  if (!sqHas('sq_vines_item')) return sqFail('You need the cut vines.')
  if (!sq.cogDisengaged) return sqFail('The engaged cogs snatch at the vine. You recoil just before becoming a workplace-safety poster. Disengage the mechanism first.')
  sqRemove('sq_vines_item'); sq.cogRepaired = true
  return sqMsg('With the cogs safely disengaged, you fit the tied vines as a replacement drive belt. Against several engineering principles, it fits.')
})
sqCmd('SqGiveFlour', [/^(?:give|hand|offer) (?:the )?(?:flour|sack of flour) to (?:the )?(?:server|woman|clerk)$/i,/^(?:give|hand) (?:the )?(?:server|woman|clerk) (?:the )?(?:flour|sack of flour)$/i], function () {
  if (!sqHere('kfc_inside')) return sqFail('The KFC server is not here.')
  if (!sqHas('sq_flour')) return sqFail('You do not have the flour.')
  sqRemove('sq_flour'); sq.flourDelivered = true; sq.woodQuest = true; sq.stage = 'wood'
  return sqMsg('The server accepts the flour. “Wonderful. Last thing: camphor wood for the fryers. Our delivery is delayed until next Tuesday.” Outside, BELLS 4U becomes WOOD 4U.')
})
