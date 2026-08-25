'use strict'

sqCmd('SqBoardShip', [/^(?:board|enter|get on|get aboard|climb aboard|go aboard) (?:the )?(?:ship|boat|vessel)$/i,/^(?:climb|walk|go) (?:up|along|onto) (?:the )?(?:gang ?plank|plank)$/i], function () {
  if (!sqHere('eastern_dock')) return sqFail('There is no ship here to board.')
  if (sq.chickenRequested) return sqFail('The ship has already left. Its commitment to avoiding further plot is admirable.')
  return sqFail('The crewman steps neatly into your path. “Regulation 7.45: passengers who have disembarked may not re-embark during cargo operations.” A loader calls, “Isn’t 7.45 the one about boiling bananas after noon?” The crewman chooses not to hear him.')
})
sqCmd('SqTalkCrewman', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:crewman|sailor|sailer|clipboard man)$/i, function () {
  if (!sqHere('eastern_dock') || sq.chickenRequested) return sqFail('There is no crewman here to talk to.')
  return sqMsg('You greet the crewman. “Regulation 3.12 prohibits distracting an officer during inventory reconciliation.” A loader carrying a barrel says, “That’s ceremonial goats.” The crewman presses his pencil harder into the clipboard.')
})
sqCmd('SqOpenDockCargo', /^(?:open|unpack|pry open) (?:the )?(?:barrels?|crates?|boxes?)$/i, function () {
  if (!sqHere('eastern_dock')) return sqFail('There is no ship cargo here.')
  return sqFail('They are nailed shut, and the crewman is already looking at you as though he has a regulation prepared specifically for this.')
})
sqCmd('SqTakeDockCargo', /^(?:take|get|pick up|lift|carry) (?:the )?(?:barrels?|crates?|boxes?|rope|coil(?: of rope)?)$/i, function () {
  if (!sqHere('eastern_dock')) return sqFail('You cannot see that here.')
  return sqFail('You try. Your back files an immediate formal complaint. Your heroic career will not begin by carrying dock furniture.')
})
sqCmd('SqCutDockRope', /^(?:cut|slice|chop|saw) (?:the )?(?:rope|coil(?: of rope)?)$/i, function () {
  if (!sqHere('eastern_dock')) return sqFail('There is no giant dock rope here.')
  return sqFail('The rope is absurdly thick. You would need a saw, half an hour and a convincing explanation for the crewman.')
})

sqCmd('SqTalkClerk', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:clerk|tourist clerk|information clerk|attendant)$/i, function () {
  if (!sqHere('tourist_information')) return sqFail('The tourist information clerk is not here.')
  if (!sqHas('sq_leaflet')) {
    sqGive('sq_leaflet'); sqGive('sq_kfc_voucher')
    return sqMsg('The clerk hands you a tourist leaflet and a promotional KFC voucher. “Do read everything,” she says, tapping the tiny P.T.O. at the bottom with all the subtlety of a siege engine.')
  }
  return sqMsg('“Fountain north, food east, tavern west, docks south,” says the clerk. “And if you’re going into the forest, read the back of the leaflet.”')
})
sqCmd('SqTurnLeaflet', [/^(?:pto|p\.?t\.?o\.?)$/i,/^(?:turn|flip|reverse) (?:over )?(?:the )?(?:leaflet|brochure|pamphlet)$/i,/^(?:turn|flip) (?:the )?(?:leaflet|brochure|pamphlet) over$/i,/^(?:read|look at|examine) (?:the )?(?:back|rear) (?:of )?(?:the )?(?:leaflet|brochure|pamphlet)$/i], function () {
  if (!sqHas('sq_leaflet')) return sqFail('You are not carrying a tourist leaflet.')
  if (sq.leafletTurned) return sqMsg('The leaflet is already showing its trollishly informative rear.')
  sq.leafletTurned = true
  return sqMsg('You turn the leaflet over. TROLL SAFETY NOTICE: travellers entering the western forest are advised that trolls are terrified of loudly ringing bells.')
})

sqCmd('SqTalkServer', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:server|kfc server|woman|clerk)$/i, function () {
  if (!sqHere('kfc_inside')) return sqFail('The KFC server is not here.')
  if (!sq.chickenRequested) {
    sq.chickenRequested = true; sq.fishermanActive = true; w.sq_fisherman.loc = 'western_dock'
    w.sq_ship.loc = undefined; w.sq_gangplank.loc = undefined; w.sq_crewman.loc = undefined
    sq.stage = 'chicken'
    return sqMsg('“A whole chicken?” The server grimaces. “We’ve sold every bird in Kamalot for the jousting festivities. Bring us one fresh chicken and we’ll fry it. The Castle Kitchen may still have stock.” Outside, 4U quietly transforms into CHICKEN 4U. Back at the Western Dock, an old fisherman begins losing an argument with the sea.')
  }
  if (!sq.chickenDelivered) return sqMsg('“Fresh chicken first,” says the server. “The Castle Kitchen is behind the market. Banquet stock, ingredients permitting.”')
  if (!sq.flourDelivered) return sqMsg('“Chicken acquired. Next problem: flour. Old Man Emmett’s mill west of the castle supplies us, and naturally it has chosen today to stop.”')
  if (!sq.camphorObtained) return sqMsg('“Flour, yes. Now we need camphor wood for the oil fryers. Rare, long-burning, distinctive flavour. Delivery due next Tuesday.”')
  if (!sq.friedChickenReady) return sqMsg('“Give me the camphor wood and we can finally finish this absurdly over-engineered bucket meal.”')
  return sqMsg('The server points at your fried-chicken bucket. “One whole chicken, gizzards n’ all. Try not to start another six puzzles on the way to the Keep.”')
})
sqCmd('SqUseVoucher', [/^(?:use|give|hand|show|redeem) (?:the )?(?:kfc )?(?:voucher|coupon)(?: to (?:the )?(?:server|clerk|woman))?$/i,/^(?:give|hand) (?:the )?(?:server|clerk|woman) (?:the )?(?:kfc )?(?:voucher|coupon)$/i], function () {
  if (!sqHere('kfc_inside')) return sqFail('You need to be at Kamalot Fried Chicken to redeem that.')
  if (!sqHas('sq_kfc_voucher')) return sqFail('You are not carrying the voucher.')
  if (!sq.chickenDelivered) return sqFail('The server checks the bean station. “Not ready yet. Something about liability forms and adequate ventilation.”')
  sq.beansAvailable = true
  return sqMsg('The server stamps the voucher. The Fiery Fava Beans trial station is active. “Free samples and refills,” she says, in the tone of somebody whose insurance policy definitely has an exclusion clause.')
})
sqCmd('SqGetBeanSample', /^(?:take|get|grab|collect|sample|have) (?:a |the )?(?:fiery )?(?:fava )?(?:beans?|bean sample)$/i, function () {
  if (!sqHere('kfc_inside') || !sq.beansAvailable) return sqFail('There is no available bean sample here.')
  if (sqHas('sq_bean_sample')) return sqMsg('You already have a sample. Your pockets are not a buffet.')
  sqGive('sq_bean_sample'); return sqMsg('You collect a small sample of Fiery Fava Beans. They smell like a culinary threat.')
})
sqCmd('SqEatBeans', /^(?:eat|taste|swallow|consume) (?:the )?(?:fiery )?(?:fava )?(?:beans?|bean sample)$/i, function () {
  if (!sqHas('sq_bean_sample')) return sqFail('You do not have a bean sample to eat.')
  sqRemove('sq_bean_sample'); sq.beanSamplesEaten++
  if (sq.beanSamplesEaten === 1) return sqMsg('You eat the sample. Your stomach emits a noise normally associated with distant artillery. Perhaps stop there.')
  if (sq.beanSamplesEaten === 2) return sqMsg('You eat another sample. Every sensible organ in your body submits written notice that a third would be unwise.')
  return sqFail('You attempt a third sample. There is a brief internal pressure event, an expression of profound regret, and then nothing worth describing to the undertaker. [GAME OVER - reload to continue from your last save.]')
})
sqCmd('SqFillBucketBeans', [/^(?:fill|load|pack) (?:the )?bucket(?: with)? (?:fiery )?(?:fava )?beans$/i,/^(?:fill|load|pack) (?:the )?bucket (?:at|from) (?:the )?(?:bean|beans|fava bean) (?:station|counter)$/i], function () {
  if (!sqHere('kfc_inside') || !sq.beansAvailable) return sqFail('You need an active Fiery Fava Beans station.')
  if (!sqHas('sq_empty_bucket')) return sqFail('You need an empty bucket.')
  sqRemove('sq_empty_bucket'); sqGive('sq_bean_bucket')
  return sqMsg('You fill the entire bucket with Fiery Fava Beans. The server watches, considers intervening, and apparently decides she does not earn enough.')
})

sqCmd('SqTalkFisherman', /^(?:talk|speak|chat|ask)(?: to| with)? (?:the )?(?:fisherman|angler|old fisherman)(?: about bait)?$/i, function () {
  if (!sqHere('western_dock') || !sq.fishermanActive) return sqFail('There is no fisherman here.')
  if (sqHas('sq_fish_bucket') || sq.fountainBroken) return sqMsg('The fisherman is now catching fish at an alarming industrial rate.')
  sq.fishermanInformed = true
  return sqMsg('“Bait’s gone,” he sighs. “Worms, maggots, rotten vegetables, anything wriggly. Used to be easier in my father’s day. These days it’s all phishing scams.”')
})
sqCmd('SqPushFisherman', /^(?:push|shove|kick|hit) (?:the )?(?:fisherman|angler|old fisherman)$/i, function () {
  if (!sqHere('western_dock') || !sq.fishermanActive) return sqFail('There is no fisherman here to assault.')
  return sqFail('He wobbles alarmingly. Best not turn a bait puzzle into manslaughter.')
})

sqCmd('SqRevealAlley', [/^(?:examine|look at|look behind|search|inspect|move) (?:the )?(?:crates|barrels|boxes|market crates|market barrels)$/i,/^(?:search|inspect) (?:the )?(?:rear|back) (?:of )?(?:the )?market$/i], function () {
  if (!sqHere('market')) return sqFail('Those particular crates and barrels are not here.')
  sq.alleyRevealed = true; return sqMsg('Behind the crates and barrels you discover a dark, narrow alley leading NORTH WEST. Adventure-game urban planning strikes again.')
})
sqCmd('SqKnockKitchen', [/^(?:knock|bang|rap) (?:on )?(?:the )?(?:door|kitchen door)$/i,/^(?:knock|bang|rap)$/i], function () {
  if (!sqHere('alleyway')) return sqFail('You knock on the nearest available piece of reality. Nothing useful happens.')
  if (!sqHas('sq_herb_parcel')) return sqMsg('The door cracks open. The chef looks at your empty hands. “Ingredients?” You display an impressive absence of ingredients. The door slams hard enough to season the wall.')
  sq.kitchenOpen = true; return sqMovePlayer('castle_kitchen', 'The chef sees the spice parcel, grabs you by the sleeve and drags you inside with terrifying gratitude.')
})
sqCmd('SqClimbDeadCrates', [/^(?:climb|clamber up|stand on|get on|mount) (?:the )?(?:crates|boxes)$/i,/^(?:climb up)$/i], function () {
  if (!sqHere('alleyway_dead_end')) return sqFail('There are no conveniently stacked kitchen-window crates here.')
  sq.onionsRevealed = true
  return sqMsg('You clamber onto the crates and peer through the kitchen window. The chef is frantic, muttering about the Royal Three-Spice Stew. Beside the window sits a bowl of rotten onions crawling with maggots.')
})
sqCmd('SqLookWindow', /^(?:look|look in|look through|peer through|examine|inspect) (?:the )?(?:window|kitchen window)$/i, function () {
  if (!sqHere('alleyway_dead_end')) return sqFail('There is no useful kitchen window here.')
  sq.onionsRevealed = true
  return sqMsg('Through the window the chef rushes between pots, repeatedly checking a recipe for three missing herbs and spices. A bowl of rotten onions beside the sill is visibly alive with maggots.')
})
sqCmd('SqTakeOnions', /^(?:take|get|grab|pick up|collect) (?:the )?(?:onions|rotten onions|wormy onions|maggots|worms|bait)$/i, function () {
  if (!sqHere('alleyway_dead_end') || !sq.onionsRevealed) return sqFail('You cannot reach any suitable rotten onions from here.')
  if (!sq.fishermanInformed) return sqFail('They are revolting. You cannot currently imagine a reason to carry them.')
  if (sqHas('sq_wormy_onions')) return sqMsg('You already have more rotten onion than any hero should.')
  sqGive('sq_wormy_onions'); return sqMsg('Remembering the fisherman’s plea, you scoop up the worm-ridden onions. Heroism has many textures.')
})
sqCmd('SqGiveOnions', [/^(?:give|hand|offer) (?:the )?(?:onions|wormy onions|rotten onions|maggots|worms|bait) to (?:the )?(?:fisherman|angler)$/i,/^(?:give|hand) (?:the )?(?:fisherman|angler) (?:the )?(?:onions|wormy onions|bait)$/i], function () {
  if (!sqHere('western_dock') || !sq.fishermanActive) return sqFail('The fisherman is not here.')
  if (!sqHas('sq_wormy_onions')) return sqFail('You do not have the worm-ridden onions.')
  sqRemove('sq_wormy_onions'); sqGive('sq_fish_bucket')
  return sqMsg('The fisherman accepts the onions with unsettling delight. Moments later he hooks a fish and hands you the bucket. “First catch all day!”')
})

sqCmd('SqFountainFish', [/^(?:empty|pour|tip|dump) (?:the )?(?:fish )?bucket (?:into|in|over) (?:the )?(?:fountain|water fountain)$/i,/^(?:put|drop|throw) (?:the )?(?:fish|bucket|fish bucket) (?:into|in) (?:the )?(?:fountain|water fountain)$/i,/^(?:use) (?:the )?(?:fish bucket|bucket|fish) (?:on|with|in) (?:the )?(?:fountain|water fountain)$/i], function () {
  if (!sqHere('castle_fountain')) return sqFail('There is no castle fountain here.')
  if (!sqHas('sq_fish_bucket')) return sqFail('You need the fisherman’s bucket containing a fish.')
  if (sq.fountainBroken) return sqMsg('The fountain is already impressively broken.')
  sq.fountainBroken = true; sqRemove('sq_fish_bucket'); sqGive('sq_empty_bucket')
  return sqMsg('You tip the fish into the fountain. It disappears into a pipe. The fountain coughs, shudders and stops. “OI!” cries the guard, sprinting away for maintenance.')
})
sqCmd('SqTakeFountainCoin', /^(?:take|get|grab|pick up|steal|fish out) (?:a |the )?(?:gold )?coins?$/i, function () {
  if (!sqHere('castle_fountain')) return sqFail('There are no fountain coins here.')
  if (!sq.fountainBroken) return sqFail('The guard slaps your hand away with professional efficiency.')
  if (sqHas('sq_gold_coin')) return sqMsg('One stolen wish is enough for now.')
  sqGive('sq_gold_coin'); return sqMsg('You take one gold coin. “This was somebody’s dream, their wish, and I’m taking it back.” You have no idea why you said that, but it felt important.')
})
sqCmd('SqTalkMerchant', /^(?:talk|speak|chat|ask)(?: to| with)? (?:the )?(?:merchant|herb merchant|spice merchant|herbs merchant|stallholder)(?: about (?:herbs|spices|ingredients))?$/i, function () {
  if (!sqHere('market')) return sqFail('The herbs and spices merchant is not here.')
  if (sqHas('sq_herb_parcel')) return sqMsg('“Those are the right three,” she assures you.')
  const coin = ['sq_gold_coin','sq_tree_coin','sq_dropped_coin'].find(sqHas)
  if (!coin) return sqMsg('“Three required banquet spices for one gold coin,” says the merchant.')
  sqRemove(coin); sqGive('sq_herb_parcel'); sq.herbsBought = true
  return sqMsg('You buy the chef’s special three-spice banquet parcel. The merchant somehow knows exactly which three the current recipe requires.')
})
sqCmd('SqTakeChicken', /^(?:take|get|grab|pick up|collect|steal) (?:a |the )?(?:fresh |whole |raw )?chicken$/i, function () {
  if (!sqHere('castle_kitchen')) return sqFail('There is no fresh chicken here.')
  if (!sq.kitchenOpen) return sqFail('You have not legitimately entered the kitchen yet.')
  if (sqHas('sq_fresh_chicken')) return sqMsg('One whole chicken is enough.')
  sqGive('sq_fresh_chicken'); return sqMsg('You take one fresh chicken. “Best only take one!” bellows the chef, then drops into a serene spice-cooking trance.')
})
sqCmd('SqTakeKnife', /^(?:take|get|grab|pick up|collect) (?:the )?(?:blunt |kitchen )?knife$/i, function () {
  if (!sqHere('castle_kitchen')) return sqFail('There is no kitchen knife here.')
  if (sqHas('sq_blunt_knife') || sqHas('sq_sharp_knife')) return sqMsg('You already have the knife.')
  sqGive('sq_blunt_knife')
  return sqMsg('You pick up the kitchen knife. The chef pauses. “Aye, go ahead. It’s useless to me, it’s about as sharp as your wit!” “My what?” “Your wit!” “Your wit?” “What?” “Wit?” “Just take it and get out my kitchen.”')
})
sqCmd('SqGiveChickenKfc', [/^(?:give|hand|offer) (?:the )?(?:fresh |whole |raw )?chicken to (?:the )?(?:server|woman|clerk)$/i,/^(?:give|hand) (?:the )?(?:server|woman|clerk) (?:the )?(?:fresh |whole |raw )?chicken$/i], function () {
  if (!sqHere('kfc_inside')) return sqFail('The KFC server is not here.')
  if (!sqHas('sq_fresh_chicken')) return sqFail('You do not have a fresh chicken.')
  sqRemove('sq_fresh_chicken'); sq.chickenDelivered = true; sq.beansAvailable = sqHas('sq_kfc_voucher'); sq.bellAvailable = true; sq.stage = 'flour'
  return sqMsg('The server accepts the bird. “Excellent. Next we need flour from Old Man Emmett’s mill west of the castle.” She activates the Fiery Fava Beans station. Outside, 4U becomes BELLS 4U.')
})
