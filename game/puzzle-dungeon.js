'use strict'

sqCmd('SqDungeonTalkGuard', /^(?:talk|speak|chat)(?: to| with)? (?:the )?(?:guard|jailer|gaoler|prison guard)$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('The prison guard is not here.')
  if (!sq.dungeonAwake) { sq.dungeonAwake = true; w.sq_princess.loc = 'dungeon_cell_1'; return sqMsg('The guard gestures around the cell. “Four walls, straw bed, locked door. Welcome to your worst Knightmare.” Before you can object to the pun, the Princess arrives with an escort. She recognises you from the forest and thanks you again. She is also openly relieved Sir Arrogant did not win.') }
  return sqMsg('The guard has exhausted both useful information and his Knightmare joke.')
})
sqCmd('SqGiveBroochPrincess', [/^(?:give|hand|offer) (?:the )?(?:brooch|jewel(?:led|-encrusted)? brooch) to (?:the )?princess$/i,/^(?:give|hand) (?:the )?princess (?:the )?(?:brooch|jewel(?:led|-encrusted)? brooch)$/i], function () {
  if (!sqHere('dungeon_cell_1') || !sq.dungeonAwake || w.sq_princess.loc !== 'dungeon_cell_1') return sqFail('The Princess is not currently here to receive it.')
  if (!sqHas('sq_brooch')) return sqFail('You are not carrying the brooch.')
  sqRemove('sq_brooch'); sq.princessBroochGiven = true; w.sq_princess.loc = undefined
  return sqMsg('You give the Princess the jewel-encrusted brooch. She is delighted, kisses you on the cheek and is immediately summoned away by the King. The guard pretends not to have witnessed anything interesting.')
})
sqCmd('SqSleepDungeon', /^(?:sleep|sleep on|lie on|lie down on|rest on|go to sleep(?: on)?) ?(?:the )?(?:straw|hay|bed)?$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('This is not a good sleeping location, which is saying something.')
  sq.attackHappened = true; sq.dungeonAwake = true; w.sq_princess.loc = undefined
  return sqMsg('You sleep on the straw and dream of the Princess. You wake to distant crashes and shouting above. An injured guard staggers past: Dragon Lord Fire-Ra and his minions have returned and kidnapped the Princess. The surviving guards rush away, apparently deciding that leaving you to rot is now an acceptable administrative shortcut.')
})
sqCmd('SqPushDungeonWall', /^(?:push|shove|press|move|ram|kick) (?:the )?(?:wall|stonework|stones|stone|loose stone|loose stonework|west wall)$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('There is no useful loose prison wall here.')
  if (sq.wallOpen) return sqMsg('The opening in the west wall is already large enough to pass through.')
  sq.wallPushes++
  if (sq.wallPushes === 1) return sqMsg('You heave against the loose stonework. Something shifts and dust falls. For once, repeating an action may actually be intentional.')
  sq.wallOpen = true; return sqMsg('You push again. A block tears free and crashes into the neighbouring cell, leaving a rough opening to the WEST.')
})
sqCmd('SqTakeFemur', /^(?:take|get|grab|pull|pick up) (?:the )?(?:femur|bone|leg bone)$/i, function () {
  if (!sqHere('dungeon_cell_2')) return sqFail('There is no useful femur here.')
  if (sqHas('sq_femur')) return sqMsg('You already have the femur. This is not the kind of collection to expand casually.')
  sqGive('sq_femur'); return sqMsg('You take the femur from the skeleton. The skeleton offers no formal objection.')
})
sqCmd('SqTakeRags', /^(?:take|get|grab|pick up|collect) (?:the )?(?:rags|cloth|clothes|old clothes|old rags)$/i, function () {
  if (!sqHere('dungeon_cell_2')) return sqFail('There are no old prison rags here.')
  if (sqHas('sq_rags') || sqHas('sq_wet_rags')) return sqMsg('You already have the rags.')
  sqGive('sq_rags'); return sqMsg('You gather the old clothing rags. They are unpleasant enough to be useful, which is becoming a theme.')
})
sqCmd('SqWetRags', [/^(?:wet|soak|dampen|dip) (?:the )?(?:rags|cloth|clothes) (?:in|under|with) (?:the )?(?:water|drip|dripping water)$/i,/^(?:put|hold) (?:the )?(?:rags|cloth|clothes) (?:under|in) (?:the )?(?:water|drip|dripping water)$/i], function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('You need the dripping water in the starting cell.')
  if (!sqHas('sq_rags')) { if (sqHas('sq_wet_rags')) return sqMsg('The rags are already soaked.'); return sqFail('You do not have suitable rags.') }
  sqRemove('sq_rags'); sqGive('sq_wet_rags'); sq.ragsWet = true
  return sqMsg('You soak the rags under the steady drip until they are thoroughly wet. Somewhere, basic mechanics begins to look nervous.')
})
sqCmd('SqWrapVent', /^(?:wrap|tie|loop|use|put|place) (?:the )?(?:wet )?(?:rags|cloth|clothes) (?:around|round|on|over|through) (?:the )?(?:bars|vent|grille|grill)$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('There is no barred vent here.')
  if (!sqHas('sq_wet_rags')) return sqFail('Dry cloth will not do much. You need the wet rags.')
  sqRemove('sq_wet_rags'); sq.ventWrapped = true
  return sqMsg('You loop the wet rags tightly around the vent bars, creating a makeshift tourniquet of questionable architectural intent.')
})
sqCmd('SqUseFemurVent', /^(?:use|put|insert|place|stick) (?:the )?(?:femur|bone|leg bone) (?:in|into|through|with|on) (?:the )?(?:rags|bars|vent|cloth)$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('The vent is not here.')
  if (!sq.ventWrapped) return sqFail('The bone needs something to twist against. Wet rags around the bars would create leverage.')
  if (!sqHas('sq_femur')) return sqFail('You need the femur bone.')
  return sqMsg('You slide the femur through the wet rags. The arrangement looks barbaric, improvised and mechanically promising.')
})
sqCmd('SqTwistFemur', [/^(?:twist|turn|rotate|wind|crank) (?:the )?(?:femur|bone|leg bone)$/i,/^(?:twist|turn|rotate|wind|crank) (?:the )?(?:rags|vent|bars)$/i], function () {
  if (!sqHere('dungeon_cell_1') || !sq.ventWrapped || !sqHas('sq_femur')) return sqFail('You have not assembled the wet-rag-and-femur leverage device yet.')
  if (sq.ventOpen) return sqMsg('The vent bars are already spread far enough.')
  sq.ventTurns++
  if (sq.ventTurns === 1) return sqMsg('You twist the femur. The wet rags tighten and the bars creak apart slightly.')
  if (sq.ventTurns === 2) return sqMsg('You twist again. Metal groans. The gap widens, but not quite enough.')
  sq.ventOpen = true; return sqMsg('One more turn. The bars spread just far enough to squeeze through. Primitive engineering wins another troubling victory.')
})
sqCmd('SqTakeTorch', /^(?:take|get|grab|pick up) (?:the )?(?:torch|flaming torch)$/i, function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('There is no torch here.')
  if (sqHas('sq_torch')) return sqMsg('You already have the torch.')
  sqGive('sq_torch'); return sqMsg('You take the torch. It occupies one hand and makes the vent’s “both hands required” problem immediately obvious.')
})
sqCmd('SqTorchMouth', [/^(?:put|hold|clench|place) (?:the )?torch (?:in|between) (?:your )?(?:mouth|teeth)$/i,/^(?:bite|mouth) (?:the )?torch$/i], function () {
  if (!sqHas('sq_torch')) return sqFail('You do not have the torch.')
  sq.torchInMouth = true; return sqMsg('Against dentistry, common sense and every fire-safety rule ever written, you clamp the torch between your teeth. Both hands are now free.')
})
sqCmd('SqEnterVent', [/^(?:enter|climb into|crawl into|go into|squeeze into|use) (?:the )?(?:vent|shaft|vent shaft)$/i,/^(?:go|climb|crawl) up$/i], function () {
  if (!sqHere('dungeon_cell_1')) return sqFail('There is no accessible dungeon vent here.')
  if (!sq.ventOpen) return sqFail('The vent bars are still too narrow.')
  if (!sqHas('sq_torch')) return sqFail('The shaft is completely dark. Entering without a light source feels like volunteering for whatever is making that scurrying noise.')
  if (!sq.torchInMouth) return sqFail('The vent requires both hands. The torch occupies one of them. You consider your mouth and immediately dislike where this puzzle is going.')
  return sqMovePlayer('inside_vent_shaft','You squeeze into the vent with the torch between your teeth. Dignity remains behind in the cell.')
})
sqCmd('SqVentWest', /^(?:go|crawl|move|head) west$/i, function () {
  if (!['inside_vent_shaft','vent_shaft'].includes(player.loc)) return sqFail('West is not a special vent route here.')
  if (!sqHas('sq_torch') || !sq.torchInMouth) {
    if (!sq.spiderWarned) { sq.spiderWarned = true; return sqFail('The darkness ahead contains a sudden scurrying sound. Continuing without the torch would be an excellent way to discover what made it from the inside.') }
    return sqFail('You continue into the dark. Something fast, many-legged and catastrophically hungry proves the warning adequate. [GAME OVER - reload to continue from your last save.]')
  }
  return sqHere('inside_vent_shaft') ? sqMovePlayer('vent_shaft') : sqMovePlayer('large_cavern')
})
sqCmd('SqTouchWeb', /^(?:touch|walk into|grab|pull|take|cut) (?:the )?(?:web|webs|web strands|cobwebs)$/i, function () {
  if (!sqHere('large_cavern')) return sqFail('There are no cave-spider webs here.')
  return sqFail('The web vibrates. The cave spider descends with terrible efficiency. You have just converted a navigation hazard into dinner service. [GAME OVER - reload to continue from your last save.]')
})
sqCmd('SqClimbRungs', [/^(?:climb|go|head) (?:up )?(?:the )?(?:rungs|ladder|iron rungs)$/i,/^(?:climb up)$/i], function () {
  if (!sqHere('large_cavern')) return sqFail('There are no iron rungs here.')
  return sqMovePlayer('vent_shaft_exit','You avoid the web strands and climb the iron rungs towards the roar of water.')
})
sqCmd('SqJumpExitWater', [/^(?:enter|jump|jump into|dive|dive into|go through|climb through|use) (?:the )?(?:water|opening|hole|waterfall)$/i,/^(?:go|move|head) west$/i], function () {
  if (!sqHere('vent_shaft_exit')) return sqFail('There is no rushing-water exit here.')
  sq.chapterComplete = true
  sqMsg('You jump through the opening. The waterfall grabs you immediately. You are swept downriver, spun around the water wheel with the elegance of laundry in a barrel and flung onto the bank near the Old Mill.')
  sqMsg('Old Man Emmett stares. “Where in all of Kamalot did you come from?” You explain, with severe editing, that the Princess has been kidnapped. Emmett’s expression changes. “Dragon and his minions were seen riding WEST through the forest.”')
  sqMsg('The Quest to save the Princess and stop Dragon Lord Fire-Ra has begun. [CHAPTER ONE COMPLETE]')
  return sqMovePlayer('old_mill_outside')
})

sqCmd('SqHelp', /^(?:help|hint|hints|what now|what do i do|stuck)$/i, function () {
  let h = 'Explore, EXAMINE visible scenery, TALK to people and check your INVENTORY.'
  if (['eastern_dock','main_dock','southern_gate'].includes(player.loc)) h = 'Sir Arrogant wants fried chicken. Tourist Information is just inside the Southern Gate.'
  if (sqHere('tourist_information')) h = !sqHas('sq_leaflet') ? 'Talk to the tourist information clerk.' : !sq.leafletTurned ? 'The leaflet has a suspicious P.T.O. at the bottom.' : 'KFC is east. The tavern is west.'
  if (sqHere('kfc_inside') && !sq.chickenRequested) h = 'Talk to the KFC server.'
  else if (sq.stage === 'chicken' && sqHere('market') && !sq.fishermanInformed) h = 'Examine the market crates or barrels, explore the alley, and remember that disgusting kitchen scraps may make good bait.'
  else if (sq.stage === 'chicken' && sqHere('western_dock') && !sq.fishermanInformed) h = 'Talk to the fisherman.'
  else if (sq.fishermanInformed && !sqHas('sq_wormy_onions') && !sq.fountainBroken) h = 'Climb the crates at the alley dead end and investigate the kitchen window and onions.'
  else if (sqHas('sq_fish_bucket') && !sq.fountainBroken) h = 'The fountain guard hates anything entering the fountain. You have a fish and poor judgement.'
  else if (sq.fountainBroken && !sq.herbsBought) h = 'Take one fountain coin and buy the chef’s three spices at the market.'
  else if (sq.kitchenOpen && !sqHas('sq_fresh_chicken') && !sq.chickenDelivered) h = 'Take a fresh chicken and the blunt knife from the Castle Kitchen.'
  else if (sq.chickenDelivered && !sqHas('sq_bell') && !sq.princessRescued) h = 'Use the voucher for beans, then visit BELLS 4U and get a bell.'
  else if (sqHas('sq_bell') && !sq.princessRescued) h = 'The western gate guard will now let you into the forest. At the clearing, trolls hate loud bells.'
  else if (sq.princessRescued && !sq.waterfallRestored) h = 'Visit Emmett, then explore the waterfall. The Troll Chieftain needs a bucket-sized dose of beans.'
  else if (sq.waterfallRestored && !sq.cogRepaired) h = 'Sharpen the blunt knife, cut the cliff vines, disengage the cogs, and fit the vines as a belt.'
  else if (sq.cogRepaired && !sq.flourDelivered) h = 'Talk to Emmett for flour, then deliver it to KFC.'
  else if (sq.flourDelivered && !sq.camphorObtained) h = 'Read the commemorative-tree plaque, investigate Sir SoInSo in the tavern, and remember that Scraps likes wooden things.'
  else if (sq.camphorObtained && !sq.friedChickenReady) h = 'Give the camphor prosthetic arm to the KFC server.'
  else if (sq.friedChickenReady && !sq.keepSequenceDone) h = 'Take the fried-chicken bucket to the Main Keep and deliver it to Sir Arrogant.'
  else if (sq.stage === 'dungeon' && !sq.wallOpen) h = 'The west-wall stonework is loose. Persistence matters.'
  else if (sq.wallOpen && !sq.ventOpen) h = 'Get the femur and rags, wet the rags, wrap them around the vent bars, then twist with the femur.'
  else if (sq.ventOpen && sqHere('dungeon_cell_1')) h = 'Take the torch, put it in your mouth to free both hands, then enter the vent.'
  return sqMsg('HINT: '+h)
})

w.dungeon_cell_1.desc = function () { const west=sq.wallOpen?'A rough opening leads WEST into the neighbouring cell.':'Loose stonework marks part of the WEST wall.'; const vent=sq.ventOpen?'The vent bars have been spread far enough to squeeze through.':'A small barred vent sits high in the wall.'; return 'Four damp stone walls, a straw bed and a steady drip of water define the cell. '+west+' '+vent+' A torch burns within reach.' }
w.dungeon_cell_1.west = new Exit('dungeon_cell_2',{use:function(){if(!sq.wallOpen)return falsemsg('The west wall has not been opened yet.');player.moveChar(this);return true}})
w.dungeon_cell_1.north = new Exit('inside_vent_shaft',{use:function(){if(!sq.ventOpen)return falsemsg('The vent bars are still too narrow.');if(!sqHas('sq_torch'))return falsemsg('The shaft is completely dark. Take the torch.');if(!sq.torchInMouth)return falsemsg('The climb needs both hands. Find somewhere else to hold the torch.');player.moveChar(this);return true}})

const sqOriginalAfterEnter = settings.afterEnter
settings.afterEnter = function () {
  if (typeof sqOriginalAfterEnter === 'function') sqOriginalAfterEnter()
  if (typeof updateRoomPresentation === 'function') updateRoomPresentation()
  if (sq.fishermanActive && !sqHas('sq_fish_bucket') && !sq.fountainBroken) w.sq_fisherman.loc = 'western_dock'; else if (!sq.fishermanActive) w.sq_fisherman.loc = undefined
  if (sq.armStolen && sq.dogAtBeggar && !sq.camphorObtained) { w.sq_scraps.loc='southern_gate'; w.sq_beggar_later.loc='southern_gate' }
  const cameoRooms=['tourist_information','castle_fountain','commemorative_tree','eastern_gate_inside','western_gate_inside','market']
  if (sq.chickenRequested && !sq.princessRescued && sq.stage !== 'dungeon' && cameoRooms.includes(player.loc) && Math.random()<0.18) sqMsg('Across the courtyard you glimpse the Princess walking with her handmaiden. Before you can approach, they disappear into the crowd.')
  if (player.loc==='dungeon_cell_1' && sq.stage==='dungeon' && !sq.dungeonAwake) {
    sq.dungeonAwake=true; w.sq_princess.loc='dungeon_cell_1'
    sqMsg('You wake on a straw bed to the sound of dripping water. A prison guard gestures around the cell. “Four walls, straw bed, locked door. Welcome to your worst Knightmare.” Before you can object to the pun, the Princess arrives under guard. She recognises you from the forest and thanks you again. She is also rather relieved Sir Arrogant did not win the joust.')
  }
}
