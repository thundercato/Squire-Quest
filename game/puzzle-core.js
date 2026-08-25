'use strict'

var sq = window.sq = {
  stage:'opening', leafletTurned:false, chickenRequested:false, fishermanActive:false,
  fishermanInformed:false, alleyRevealed:false, onionsRevealed:false, fountainBroken:false,
  herbsBought:false, kitchenOpen:false, chickenDelivered:false, beansAvailable:false,
  beanSamplesEaten:0, bellAvailable:false, princessRescued:false, magpieTriggered:false,
  waterfallRestored:false, millBeltBroken:false, vinesCut:false, cogDisengaged:false,
  cogRepaired:false, flourReady:false, flourDelivered:false, woodQuest:false,
  sirSoInSoDrinks:0, armStolen:false, dogAtBeggar:false, branchBought:false,
  camphorObtained:false, friedChickenReady:false, keepSequenceDone:false,
  dungeonAwake:false, princessBroochGiven:false, attackHappened:false,
  wallPushes:0, wallOpen:false, ragsWet:false, ventWrapped:false, ventTurns:0,
  ventOpen:false, torchInMouth:false, spiderWarned:false, chapterComplete:false,
}

function sqMsg(s) { msg(s); return world.SUCCESS }
function sqFail(s) { msg(s); return world.FAILED }
function sqHere(room) { return player.loc === room }
function sqHas(id) { return !!(w[id] && w[id].loc === player.name) }
function sqGive(id) { if (w[id]) w[id].loc = player.name }
function sqRemove(id) { if (w[id]) w[id].loc = undefined }
function sqMovePlayer(room, text) {
  if (text) msg(text)
  player.loc = room
  world.update()
  world.enterRoom()
  return world.SUCCESS
}
function sqCmd(name, regexes, script) {
  new Cmd(name, { regexes:Array.isArray(regexes) ? regexes : [regexes], script:script })
}
function sqScenery(id, loc, alias, synonyms, examine) {
  if (w[id]) return
  createItem(id, { alias:alias, synonyms:synonyms || [], loc:loc, scenery:true, examine:examine })
}
function sqTakeable(id, alias, examine, synonyms) {
  if (w[id]) return
  createItem(id, TAKEABLE(), { alias:alias, synonyms:synonyms || [], examine:examine })
}
function sqNpc(id, loc, alias, synonyms, examine) {
  if (w[id]) return
  createItem(id, NPC(), { alias:alias, synonyms:synonyms || [], loc:loc, examine:examine })
}

sqTakeable('sq_leaflet','tourist leaflet','A tourist leaflet headed WELCOME TO KAMELOT. Tiny letters at the bottom say P.T.O.',['leaflet','brochure','pamphlet'])
sqTakeable('sq_kfc_voucher','KFC voucher','A promotional voucher for a free Fiery Fava Beans sample.',['voucher','coupon','kfc coupon'])
sqTakeable('sq_wormy_onions','worm-ridden onions','Rotten onions generously supplied with free-range maggots.',['onions','wormy onions','rotten onions','bait','maggots','worms'])
sqTakeable('sq_fish_bucket','bucket containing a fish','A wooden bucket containing one confused fish.',['bucket','fish bucket','bucket of fish'])
sqTakeable('sq_empty_bucket','empty bucket','A wooden bucket that has already had a surprisingly eventful day.',['bucket','wooden bucket'])
sqTakeable('sq_gold_coin','gold coin','A slightly damp gold coin, formerly somebody else’s wish.',['coin','gold','money'])
sqTakeable('sq_herb_parcel','three-spice parcel','The three herbs and spices required for the chef’s Royal Three-Spice Stew.',['herbs','spices','ingredients','parcel'])
sqTakeable('sq_fresh_chicken','fresh chicken','A whole fresh chicken. It has not yet met its crunchy destiny.',['chicken','whole chicken','raw chicken'])
sqTakeable('sq_blunt_knife','blunt knife','A kitchen knife about as sharp as your wit. Your what? Never mind.',['knife','kitchen knife'])
sqTakeable('sq_sharp_knife','sharp knife','The once-blunt knife now has a properly dangerous edge.',['knife','sharp knife'])
sqTakeable('sq_bell','handbell','A sturdy handbell supplied by Stan on financially catastrophic terms.',['bell','hand bell'])
sqTakeable('sq_bean_sample','Fiery Fava Beans sample','A small sample of Fiery Fava Beans. The word FIERY is doing considerable work.',['beans','bean sample','fava beans'])
sqTakeable('sq_bean_bucket','bucket of Fiery Fava Beans','An entire bucket of Fiery Fava Beans. This quantity should probably require a licence.',['bucket of beans','beans bucket','fava bean bucket'])
sqTakeable('sq_brooch','jewel-encrusted brooch','A beautiful jewel-encrusted brooch recovered from a magpie nest.',['brooch','jewel brooch','jewelled brooch'])
sqTakeable('sq_tree_coin','gold coin','A gold coin recovered from a magpie nest.',['coin','gold coin'])
sqTakeable('sq_vines_item','cut vines','Two strong lengths of vine, suspiciously belt-shaped.',['vines','vine','cut vines'])
sqTakeable('sq_flour','sack of flour','A sack of freshly milled flour from Old Man Emmett.',['flour','sack','sack of flour'])
sqTakeable('sq_dropped_coin','gold coin','A gold coin dropped outside KFC by a passing punter with convenient timing.',['coin','gold coin'])
sqTakeable('sq_wooden_branch','wooden branch','A completely ordinary branch from Wood 4U.',['branch','stick','wooden toy','dog toy'])
sqTakeable('sq_camphor_arm','camphor prosthetic arm','Sir SoInSo’s wooden prosthetic arm, fashioned from rare camphor wood.',['arm','wooden arm','prosthetic arm','camphor wood'])
sqTakeable('sq_fried_chicken','fried chicken bucket','One whole bucket of Kamalot Fried Chicken, gizzards n’ all.',['fried chicken','chicken bucket','bucket meal','kfc bucket'])
sqTakeable('sq_femur','femur bone','A sturdy human femur. It is difficult to make “useful lever” sound dignified.',['femur','bone','leg bone'])
sqTakeable('sq_rags','old clothing rags','Old strips of prison clothing.',['rags','cloth','clothes','old clothes'])
sqTakeable('sq_wet_rags','wet rags','Water-soaked strips of old clothing.',['wet cloth','wet clothes','soaked rags'])
sqTakeable('sq_torch','torch','A burning torch. Carrying it in your mouth would be a spectacularly bad idea.',['torch','flaming torch'])

sqNpc('sq_clerk','tourist_information','tourist information clerk',['clerk','information clerk','tourist clerk','attendant'],'The clerk has the polished smile of somebody who has explained the same four directions to twelve hundred knights.')
sqNpc('sq_server','kfc_inside','KFC server',['server','woman','kfc woman'],'The server remains impressively polite despite her workplace repeatedly running out of the nouns in its own name.')
sqNpc('sq_fisherman',undefined,'fisherman',['old fisherman','angler','fisher'],'The old fisherman is deeply tanned and weathered, with a thick white beard and the agitated look of a man being personally insulted by fish.')
sqNpc('sq_merchant','market','herbs and spices merchant',['merchant','herb merchant','spice merchant','stallholder'],'The merchant is surrounded by coloured jars labelled with increasingly implausible spellings.')
sqNpc('sq_stan','four_u_inside','Stan',['salesman','shopkeeper','assistant'],'Stan has too many teeth, too much confidence and a contractual relationship with compound interest.')
sqNpc('sq_chef','castle_kitchen','chef',['cook','castle chef'],'The chef is large, angry and stout, wearing a white hat and apron as though they are official warning colours.')
sqNpc('sq_princess',undefined,'Princess',['princess','hooded figure','figure','woman'],'The Princess is considerably more capable than the tournament arrangements surrounding her would suggest.')
sqNpc('sq_soinso','dragons_maw_inside','Sir SoInSo',['old knight','knight','sir soinso','war hero'],'Sir SoInSo is an ageing war hero with a wooden prosthetic arm and the drinking posture of a man trying to become horizontal gradually.')
sqNpc('sq_scraps','dragons_maw_inside','Scraps',['dog','beggars dog'],'Scraps is a scruffy dog with excellent instincts for unattended wooden objects.')
sqNpc('sq_beggar_later',undefined,'beggar',['beggar','poor man'],'The beggar regards you with the wary expression of somebody who suspects a side quest is approaching.')
sqNpc('sq_dungeon_guard','dungeon_cell','prison guard',['guard','jailer','gaoler'],'The prison guard has the relaxed confidence of somebody currently on the useful side of the locked door.')

sqScenery('sq_ship','eastern_dock','ship',['boat','vessel','boaty mcboatface'],function(){ return sq.chickenRequested ? 'The ship has sailed.' : 'The enormous ship that brought you here sits alongside the Eastern Dock, much of it beyond the frame.' })
sqScenery('sq_crewman','eastern_dock','crewman',['sailor','sailer','clipboard man'],'An officious crewman guards the gangplank with a clipboard and an unhealthy relationship with regulations.')
sqScenery('sq_gangplank','eastern_dock','gangplank',['gang plank','boardwalk','plank'],'A stout gangplank links ship and dock. The crewman has appointed himself Minister for Not Letting You Back On.')
sqScenery('sq_barrels','eastern_dock','barrels',['barrel','casks'],'Solid wooden barrels wait among the cargo.')
sqScenery('sq_crates','eastern_dock','crates',['crate','boxes','box'],'Large wooden crates are stacked for unloading.')
sqScenery('sq_rope','eastern_dock','rope',['coil','coil of rope','ropes'],'The thickest coil of rope you have ever seen sits on the dock.')
sqScenery('sq_nets','eastern_dock','nets',['net','netting'],'Heavy cargo netting lies among the supplies.')
sqScenery('sq_lantern','eastern_dock','lantern',['lamp','ship lantern'],'A lantern glows in the darker ship opening, illuminating more crates.')
for (const rn of ['eastern_dock','main_dock','western_dock']) {
  sqScenery('sq_water_'+rn,rn,'water',['sea','bay','ocean','golden bay'],'The clear and calm waters of Golden Bay shimmer in the sunlight.')
  sqScenery('sq_birds_'+rn,rn,'seagulls',['seagull','seagul','seaguls','birds','bird','gulls'],'The gulls catch the wind, rising and falling over the deep blue bay.')
  sqScenery('sq_dock_'+rn,rn,'dock',['pier','boards','planks'],'The weathered wooden planks creak underfoot.')
}
sqScenery('sq_main_banner','main_dock','Kamalot banner',['banner','flag','castle banner','games banner'],'A red-and-gold Kamalot banner marks the route inland and advertises the coming games.')
sqScenery('sq_main_castle','main_dock','castle',['Kamalot','Castle Kamalot','towers','battlements'],'Only the upper parts of Castle Kamalot show above the distant trees.')
sqScenery('sq_gate_guard','southern_gate','castle guard',['guard',"king's guard",'big guard','fat guard'],'A broad armoured guard watches the gate with great confidence and limited visible processing power.')
sqScenery('sq_gate_beggar','southern_gate','beggar',['poor man','vagrant'],'The beggar sits off to one side with a small and highly motivated cloud of flies.')
sqScenery('sq_gate_flies','southern_gate','flies',['fly','insects'],'The flies orbit the beggar with impressive discipline.')
sqScenery('sq_gate_foliage','southern_gate','foliage',['bushes','bush','trees','undergrowth'],'Thick foliage hems in the approach. Sneaking into it would attract the guard’s attention.')
sqScenery('sq_info_booth','tourist_information','tourist information booth',['booth','kiosk','tourist information'],'A cheerful booth dispenses maps, advice and an alarming quantity of paper.')
sqScenery('sq_cart','tourist_information','cart',['wooden cart','abandoned cart'],'An abandoned wooden cart sits nearby. It looks deeply uncomfortable.')
sqScenery('sq_fountain','castle_fountain','fountain',['water fountain','castle fountain'],function(){ return sq.fountainBroken ? 'The fountain has stopped. Somewhere in the plumbing, a fish is redefining public infrastructure.' : 'A grand white-limestone fountain sprays around a heroic knight statue while coins glitter beneath the water.' })
sqScenery('sq_fountain_guard','castle_fountain','fountain guard',['guard',"king's guard"],function(){ return sq.fountainBroken ? 'The guard has run off for maintenance.' : 'The guard watches the fountain with religious intensity.' })
sqScenery('sq_tree_camphor','commemorative_tree','camphor tree',['tree','commemorative tree','wood','camphor wood'],'The rare camphor tree has dense, long-burning wood.')
sqScenery('sq_tree_plaque','commemorative_tree','plaque',['memorial','sign'],'The plaque commemorates Sir SoInSo defeating Dragon Lord Fire-Ra and losing an arm, later replaced with camphor wood from this tree.')
sqScenery('sq_market_crates','market','crates and barrels',['crates','crate','barrels','barrel','boxes','box'],'Crates and barrels clutter the rear of the market, concealing a narrow route.')
sqScenery('sq_alley_door','alleyway','kitchen door',['door','castle kitchen door'],'A heavy kitchen door is set into the wall. Chopping and swearing come from behind it.')
sqScenery('sq_dead_crates','alleyway_dead_end','old crates',['crates','crate','boxes','box'],'Old crates are stacked suspiciously conveniently beneath the kitchen window.')
sqScenery('sq_dead_window','alleyway_dead_end','kitchen window',['window','open window'],'The kitchen window is too high to see through comfortably from the ground.')
sqScenery('sq_dead_onions','alleyway_dead_end','onions',['onion','rotten onions','maggots','worms'],function(){ return sq.onionsRevealed ? 'The onions are soft, rotten and crawling with maggots.' : 'You can just make out a bowl of onions near the window.' })
sqScenery('sq_kitchen_chef','castle_kitchen','chef',['cook','castle chef'],'The chef moves through the kitchen with the calm of a hurricane in a white hat.')
sqScenery('sq_west_guard','western_gate_inside','western gate guard',['guard','forest guard'],'The guard takes troll-related travel safety very seriously.')
sqScenery('sq_mill_wheel','old_mill_outside','water wheel',['waterwheel','wheel','mill wheel'],function(){ return !sq.waterfallRestored ? 'The water wheel stands still.' : !sq.cogRepaired ? 'The restored river drives the wheel, but something inside sounds expensively broken.' : 'The water wheel turns steadily.' })
sqScenery('sq_emmett','old_mill_inside','Old Man Emmett',['Emmett','old man','miller'],'Old Man Emmett looks capable of repairing machinery, clocks or causality.')
sqScenery('sq_cogs','cog_house','cogs',['cog','gears','gear','mechanism'],function(){ return !sq.waterfallRestored ? 'Huge wooden cogs sit idle.' : !sq.cogRepaired ? 'The cogs are intact, but the drive belt has snapped.' : 'The cogs turn with satisfying mechanical confidence.' })
sqScenery('sq_cog_lever','cog_house','lever',['disengage lever','handle'],function(){ return 'The lever is '+(sq.cogDisengaged?'pulled and the mechanism disengaged.':'pushed and the mechanism engaged.') })
sqScenery('sq_magpie','forest_tree','magpie',['bird','black and white bird'],'A magpie watches you with the acquisitive focus of a tiny feathered burglar.')
sqScenery('sq_nest','tree_top','magpie nest',['nest','birds nest'],'A messy collection of twigs and shamelessly stolen shiny objects.')
sqScenery('sq_vines','cliffs','vines',['vine','hanging vines'],function(){ return sq.vinesCut ? 'The useful vines have already been cut free.' : 'Strong vines hang from the rocks.' })
sqScenery('sq_troll_chief','top_of_waterfall','Troll Chieftain',['troll','chieftain','Gorgul','Gorgul Thunderfist'],function(){ return sq.waterfallRestored ? 'The Troll Chieftain is gone. He achieved flight.' : 'Gorgul Thunderfist is wedged in the river channel, blocking almost all the water.' })
sqScenery('sq_dungeon_straw','dungeon_cell','straw bed',['straw','hay','bed'],'A pile of prison straw offers all the support of a landlord’s promise.')
sqScenery('sq_dungeon_water','dungeon_cell','dripping water',['water','drip','leak'],'Water drips steadily from the stonework.')
sqScenery('sq_dungeon_wall','dungeon_cell','loose stonework',['wall','stonework','stones','stone','west wall'],function(){ return sq.wallOpen ? 'A rough opening now leads through the west wall.' : 'The west wall has suspiciously loose stonework.' })
sqScenery('sq_dungeon_vent','dungeon_cell','barred vent',['vent','bars','grille','grill'],function(){ return sq.ventOpen ? 'The bars have been spread far enough to squeeze through.' : 'A small barred vent sits high in the wall.' })
sqScenery('sq_dungeon_skeleton','dungeon_cell_west','skeleton',['bones','corpse','dead prisoner'],'A chained skeleton slumps in the neighbouring cell.')
sqScenery('sq_dungeon_rat','dungeon_cell_west','rat',['rats'],'A rat peers from a hole with weary local-resident contempt.')
sqScenery('sq_spider','large_cavern','cave spider',['spider','large spider','giant spider'],'A large cave spider waits above the cavern.')
sqScenery('sq_webs','large_cavern','webs',['web','web strands','cobwebs'],'Silvery web strands cross parts of the cavern.')
sqScenery('sq_rungs','large_cavern','iron rungs',['rungs','ladder','iron ladder'],'Iron rungs climb towards the sound of rushing water.')

sqCmd('SqSwim', [/^(?:swim|swim in|jump in|jump into|dive in|dive into|wade into) (?:the )?(?:water|sea|bay|ocean)$/i,/^(?:swim|dive)$/i], function(){
  if (!['eastern_dock','main_dock','western_dock'].includes(player.loc)) return sqFail('This is not an especially aquatic location.')
  return sqFail('As inviting as Golden Bay looks, drowning during the opening chicken errand would be a humiliatingly short legend.')
})
sqCmd('SqAttack', /^(?:attack|kill|murder|stab|slay|fight|punch|hit) (?:.+)$/i, function(){ return sqFail('You are a squire, not a murder-hobo. At least not without a much more specific puzzle justification.') })
sqCmd('SqKickGeneric', /^(?:kick) (?:.+)$/i, function(){ return sqMsg('You kick it. Your foot contributes strongly to the experience and nothing else changes.') })
