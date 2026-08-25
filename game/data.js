'use strict'

// Chapter One walkable world skeleton.
// Geography follows the three Chapter One maps supplied by Adam on 25 Aug 2026.
// Puzzle gates are intentionally relaxed here so the whole chapter can be explored during development.

createItem('me', PLAYER(), {
  loc: 'eastern_dock',
  examine: 'A loyal squire with a heroic future, assuming you can survive the first afternoon.',
})

function addScenery(id, loc, alias, synonyms, examine) {
  createItem(id, {
    alias: alias,
    synonyms: synonyms || [],
    loc: loc,
    scenery: true,
    examine: examine,
  })
}

function room(id, alias, desc, exits, image, imageAlt) {
  const data = { alias: alias, desc: desc }
  if (image) {
    data.roomImage = image
    data.roomImageAlt = imageAlt || alias
  }
  Object.keys(exits || {}).forEach(function (direction) {
    data[direction] = new Exit(exits[direction])
  })
  createRoom(id, data)
}

// -----------------------------------------------------------------------------
// DOCKS AND KAMELOT CASTLE
// -----------------------------------------------------------------------------

room(
  'eastern_dock',
  'Eastern Dock',
  'You stand on the eastern end of an old creaky wooden dock. The enormous ship that brought you to Kamalot towers alongside the pier while crew unload supplies for the festivities. Open sea stretches away beneath a bright sky. The Main Dock lies to the WEST.',
  { west: 'main_dock' },
  'assets/images/rooms/eastern-dock-initial.png',
  'The Eastern Dock with the enormous arrival ship moored alongside.'
)

room(
  'main_dock',
  'Main Dock',
  'The broad central dock stretches EAST and WEST over the calm waters of Golden Bay. To the NORTH, timber gives way to shore and a well-worn path heads inland towards Castle Kamalot. A castle banner marks the route for arriving visitors.',
  { east: 'eastern_dock', west: 'western_dock', north: 'southern_gate' },
  'assets/images/rooms/main-dock.png',
  'The central dock with a woodland path leading inland towards distant Castle Kamalot.'
)

room(
  'western_dock',
  'Western Dock',
  'This is the quieter western end of the dock. Gentle waves lap against the support pillars and gulls wheel overhead. For now the end of the pier is deserted. The Main Dock lies to the EAST.',
  { east: 'main_dock' },
  'assets/images/rooms/western-dock.png',
  'The quiet western end of the dock before the fisherman arrives.'
)

createRoom('southern_gate', {
  alias: 'The Southern Gate',
  roomImage: 'assets/images/rooms/southern-gate.png',
  roomImageAlt: 'The busy Southern Gate of Castle Kamalot, decorated for the forthcoming games.',
  desc: 'The Southern Gate of Castle Kamalot stands open to the NORTH, alive with visitors and tournament preparations. A large castle guard watches the traffic while a beggar sits off to one side amid a small cloud of flies. Thick foliage crowds the wall to EAST and WEST. SOUTH leads back towards the docks.',
  south: new Exit('main_dock'),
  north: new Exit('tourist_information'),
  beforeEnter: function (exit) {
    if (exit && exit.origin && exit.origin.name === 'main_dock' && typeof showTravelInterlude === 'function') {
      showTravelInterlude('You leave the docks behind and follow the well-worn path inland. For the next twenty minutes, woodland closes around you as the cries of the gulls fade into the distance. At last, the trees thin and the Southern Gate of Castle Kamalot rises ahead.')
    }
  },
})

room(
  'tourist_information',
  'Tourist Information',
  'You are just inside the Southern Gate in a busy castle courtyard. A cheerful tourist information booth stands nearby, together with an abandoned wooden cart. NORTH lies the Castle Fountain, EAST the shops and Kamalot Fried Chicken, WEST the Dragon\'s Maw tavern, and SOUTH the gate.',
  { north: 'castle_fountain', east: 'kfc_4u_outside', west: 'dragons_maw_outside', south: 'southern_gate' }
)

room(
  'castle_fountain',
  'Castle Fountain',
  'A grand white-limestone fountain dominates the courtyard, crowned by the statue of a heroic knight. Coins glitter beneath the water while a King\'s Guard watches the fountain with suspicious devotion. NORTH is the Commemorative Tree, SOUTH Tourist Information, WEST the Western Gate and EAST the Eastern Gate.',
  { north: 'commemorative_tree', south: 'tourist_information', west: 'western_gate_inside', east: 'eastern_gate_inside' }
)

room(
  'commemorative_tree',
  'Commemorative Tree',
  'A rare camphor tree grows beside the northern castle wall. A plaque commemorates the old battle in which Sir SoInSo defeated Dragon Lord Fire-Ra and lost an arm. EAST leads to the Main Keep entrance, WEST to the Market and SOUTH to the fountain.',
  { east: 'main_keep_entrance', west: 'market', south: 'castle_fountain' }
)

room(
  'main_keep_entrance',
  'Main Keep Entrance',
  'An enormous arched wooden door marks the entrance to the Main Keep. A guard stands beside it, looking as though entry is a privilege rather than a direction. WEST is the Commemorative Tree, SOUTH the Eastern Gate, and NORTH leads into the Knights Room for this development build.',
  { west: 'commemorative_tree', south: 'eastern_gate_inside', north: 'knights_room' }
)

room(
  'knights_room',
  'Knights Room',
  'A private chamber inside the Main Keep reserved for knights of sufficient importance, or sufficient confidence to claim they are. A bed, table and assorted knightly clutter occupy the room. SOUTH returns to the Main Keep entrance.',
  { south: 'main_keep_entrance' }
)

room(
  'eastern_gate_inside',
  'Eastern Gate (Inside)',
  'You stand inside the eastern castle gate. A guard watches the passage. NORTH is the Main Keep entrance, SOUTH the KFC and 4U shopfronts, and WEST the Castle Fountain.',
  { north: 'main_keep_entrance', south: 'kfc_4u_outside', west: 'castle_fountain' }
)

room(
  'kfc_4u_outside',
  'KFC & 4U Shops (Outside)',
  'Kamalot Fried Chicken occupies one shopfront while the neighbouring 4U premises looks ready to reinvent itself at a moment\'s notice. WEST returns to Tourist Information, NORTH to the Eastern Gate. You can ENTER KFC to the SOUTH or visit the 4U shop to the EAST in this development build.',
  { west: 'tourist_information', north: 'eastern_gate_inside', south: 'kfc_inside', east: 'four_u_inside' }
)

room(
  'kfc_inside',
  'Kamalot Fried Chicken',
  'A server waits behind the counter of Kamalot Fried Chicken. Cooking equipment fills the rear of the shop and a Fiery Fava Beans trial station sits nearby, currently looking far more innocent than its name suggests. NORTH returns outside.',
  { north: 'kfc_4u_outside' }
)

room(
  'four_u_inside',
  '4U Shops',
  'The interior of 4U Shops is a retail identity crisis waiting to happen. Shelves, signs and suspiciously enthusiastic salesmanship surround Stan, the ever-present assistant. WEST returns outside.',
  { west: 'kfc_4u_outside' }
)

room(
  'western_gate_inside',
  'Western Gate (Inside)',
  'The western castle gate opens towards the forest road. A guard keeps watch for trolls and other inconveniences. NORTH is the Market, SOUTH the Dragon\'s Maw, EAST the Castle Fountain and WEST leads outside the castle.',
  { north: 'market', south: 'dragons_maw_outside', east: 'castle_fountain', west: 'western_gate_outside' }
)

room(
  'dragons_maw_outside',
  'The Dragons Maw (Outside)',
  'The Dragon\'s Maw is an ancient timber tavern, perhaps older than the castle itself. Its sign shows a dragon\'s head with jaws spread wide. NORTH is the Western Gate, EAST Tourist Information and WEST takes you inside the tavern.',
  { north: 'western_gate_inside', east: 'tourist_information', west: 'dragons_maw_inside' }
)

room(
  'dragons_maw_inside',
  'The Dragons Maw',
  'Heavy beams cross the ceiling of a smoky medieval tavern. A fire crackles, barrels line the walls and patrons nurse drinks with varying degrees of success. An old knight and a dog named Scraps are among the regular fixtures. EAST returns outside.',
  { east: 'dragons_maw_outside' }
)

room(
  'market',
  'Market',
  'A bustling market fills the north-west corner of the castle grounds. Fruit, meat, herbs and spices compete for attention while crates and barrels clutter the edges. EAST is the Commemorative Tree, SOUTH the Western Gate and NORTH WEST a narrow alleyway.',
  { east: 'commemorative_tree', south: 'western_gate_inside', northwest: 'alleyway' }
)

room(
  'alleyway',
  'Alleyway',
  'A dark narrow alley hides behind the market. Rats treat it as a major transport route. The Castle Kitchen is reached to the NORTH EAST, a dead end lies NORTH and the Market is SOUTH EAST.',
  { north: 'alleyway_dead_end', northeast: 'castle_kitchen', southeast: 'market' }
)

room(
  'alleyway_dead_end',
  'Alleyway Dead End',
  'The alley ends beneath a kitchen window. Old crates are stacked conveniently beneath it, providing a suspiciously climbable view into the Castle Kitchen. SOUTH returns along the alleyway.',
  { south: 'alleyway' }
)

room(
  'castle_kitchen',
  'Castle Kitchen',
  'The Castle Kitchen boils, hisses and smells faintly dangerous. A large angry chef works among chopping boards, pots, onions and fresh chicken while a blunt kitchen knife lies within reach. SOUTH WEST returns to the alleyway.',
  { southwest: 'alleyway' }
)

// -----------------------------------------------------------------------------
// FOREST, WATERFALL AND OLD MILL
// -----------------------------------------------------------------------------

room(
  'western_gate_outside',
  'Western Gate (Outside)',
  'Outside the western castle wall, the road immediately gives way to forest. Castle stone rises behind you while dense foliage hems in the path. EAST returns inside the gate and WEST heads deeper into the trees.',
  { east: 'western_gate_inside', west: 'forest_path' }
)

room(
  'forest_path',
  'Forest Path',
  'A narrow path runs beneath thick woodland canopy. EAST leads back to Kamalot and WEST continues towards a forest crossroads.',
  { east: 'western_gate_outside', west: 'forest_crossroads' }
)

room(
  'forest_crossroads',
  'Forest Crossroads',
  'Several forest routes meet beneath the trees. NORTH leads to a great tree, SOUTH to a clearing and EAST back towards Kamalot. The path WEST disappears into deeper forest, but that belongs to Chapter Two and refuses to become relevant early.',
  { north: 'forest_tree', south: 'forest_clearing', east: 'forest_path' }
)

room(
  'forest_clearing',
  'Forest Clearing',
  'The trees open into a broad clearing. It is the sort of place where trolls could ambush a mysterious hooded figure without first completing a risk assessment. NORTH returns to the crossroads and WEST leads to the Old Mill.',
  { north: 'forest_crossroads', west: 'old_mill_outside' }
)

room(
  'old_mill_outside',
  'Old Mill (Outside)',
  'An old watermill crouches beside the river. Its great wooden wheel is connected to machinery inside and may or may not currently be moving depending on how much trouble you have caused upstream. EAST returns to the clearing and NORTH goes inside.',
  { east: 'forest_clearing', north: 'old_mill_inside' }
)

room(
  'old_mill_inside',
  'Old Mill',
  'Dusty mill machinery fills the room. Old Man Emmett works among sacks, flour, a mill stone and equipment powered by the waterwheel. SOUTH exits the mill and WEST leads into the Cog House.',
  { south: 'old_mill_outside', west: 'cog_house' }
)

room(
  'cog_house',
  'Cog House',
  'Huge wooden cogs dominate this cramped chamber. Belts and shafts link the mechanism to the mill, with a lever positioned where only somebody dangerously curious would ignore it. EAST returns to the mill.',
  { east: 'old_mill_inside' }
)

room(
  'forest_tree',
  'Tree',
  'A large old tree rises above the surrounding forest. A magpie has taken a particular interest in anything shiny. SOUTH returns to the crossroads, NORTH leads towards the waterfall and UP climbs into the branches.',
  { south: 'forest_crossroads', north: 'waterfall', up: 'tree_top' }
)

room(
  'tree_top',
  'Top of Tree (Long Branch)',
  'High in the tree, a long branch reaches towards a magpie nest. The branch is thinner than you would ideally like. The nest may contain a jewel-encrusted brooch and a gold coin once the relevant events occur. DOWN returns to safer ground.',
  { down: 'forest_tree' }
)

room(
  'waterfall',
  'Waterfall',
  'A waterfall spills down a rocky face into the forest river. Early in the chapter it may be little more than a trickle. A rounded opening high in the rock hints at somewhere water should probably be hiding. SOUTH leads to the tree and NORTH EAST slips behind the falls towards the cliffs.',
  { south: 'forest_tree', northeast: 'cliffs' }
)

room(
  'cliffs',
  'Cliffs',
  'Behind the waterfall, wet rock rises steeply above you. A precarious route climbs past a ledge and strong hanging vines. SOUTH WEST returns to the waterfall and NORTH WEST climbs towards the plateau.',
  { southwest: 'waterfall', northwest: 'plateau' }
)

room(
  'plateau',
  'Plateau',
  'A broad plateau overlooks the waterfall and forest below. SOUTH EAST descends towards the cliffs while SOUTH WEST leads to the top of the waterfall.',
  { southeast: 'cliffs', southwest: 'top_of_waterfall' }
)

room(
  'top_of_waterfall',
  'Top of Waterfall',
  'The river should pour over the edge here, although a very large troll chieftain may have something to say about that. NORTH EAST leads back to the plateau.',
  { northeast: 'plateau' }
)

// -----------------------------------------------------------------------------
// DUNGEON BELOW THE CASTLE
// -----------------------------------------------------------------------------

room(
  'dungeon_cell_1',
  'Dungeon Cell I',
  'A miserable stone cell contains a straw bed, dripping water, a barred vent and a torch. Loose stonework marks the WEST wall. WEST reaches the neighbouring cell for development purposes and NORTH climbs into the vent shaft.',
  { west: 'dungeon_cell_2', north: 'inside_vent_shaft' }
)

room(
  'dungeon_cell_2',
  'Dungeon Cell II',
  'The neighbouring cell contains old clothing rags, a chained skeleton, a rat hole and a surprisingly useful femur bone. EAST returns to the first cell.',
  { east: 'dungeon_cell_1' }
)

room(
  'inside_vent_shaft',
  'Inside Vent Shaft',
  'A tight damp crawlspace leads away from the cell. Cobwebs cling to the stone and darkness gathers quickly beyond the reach of the entrance. SOUTH returns to the cell and WEST continues through the shaft.',
  { south: 'dungeon_cell_1', west: 'vent_shaft' }
)

room(
  'vent_shaft',
  'Vent Shaft',
  'The shaft grows wetter and more claustrophobic. Cobwebs thicken and the sound of rushing water becomes louder. EAST returns towards the cell and WEST opens into a large cavern.',
  { east: 'inside_vent_shaft', west: 'large_cavern' }
)

room(
  'large_cavern',
  'Large Cavern',
  'A natural cavern opens around you, packed with stalagmites and strands of enormous spider web. A large cave spider regards the chamber as both home and restaurant. EAST returns to the vent shaft and NORTH climbs iron rungs towards an exit shaft.',
  { east: 'vent_shaft', north: 'vent_shaft_exit' }
)

room(
  'vent_shaft_exit',
  'Vent Shaft Exit',
  'At the top of a vertical shaft, a rounded opening is covered by rushing water. SOUTH descends to the cavern. WEST pushes out through the water and emerges at the forest waterfall.',
  { south: 'large_cavern', west: 'waterfall' }
)

// -----------------------------------------------------------------------------
// BASELINE SCENERY COVERAGE
// These objects exist so visible/obvious room elements already have sensible LOOK responses.
// Puzzle-specific state and verbs will be layered in later.
// -----------------------------------------------------------------------------

addScenery('arrival_ship', 'eastern_dock', 'ship', ['boat', 'vessel'], 'The enormous arrival ship is moored alongside the dock, with most of it extending beyond your view.')
addScenery('gangplank', 'eastern_dock', 'gangplank', ['plank', 'boardwalk'], 'A stout wooden gangplank links the dock to the ship. The clipboard-wielding crewman is making sure you do not use it.')
addScenery('crewman', 'eastern_dock', 'crewman', ['sailor', 'clipboard man', 'posh man'], 'An officious crewman clutches an inventory list with the solemnity of a royal decree. Whatever his name is, he has not offered it.')
addScenery('dock_crew', 'eastern_dock', 'crew', ['sailors', 'workers', 'men'], 'Several crewmen shift cargo between ship and dock with the weary efficiency of people who have done this far too many times.')
addScenery('eastern_barrel', 'eastern_dock', 'barrel', ['barrels'], 'A solid wooden barrel sits among the unloaded cargo. It is nailed shut and looks far too heavy to carry without acquiring a lifelong back complaint.')
addScenery('eastern_crates', 'eastern_dock', 'crates', ['crate', 'boxes', 'box'], 'Large wooden crates are stacked on the dock, probably containing trade goods, supplies or something less interesting than you hope.')
addScenery('eastern_nets', 'eastern_dock', 'nets', ['net', 'netting'], 'Heavy cargo netting lies bundled beside the crates. It has done nothing to deserve being stolen.')
addScenery('eastern_rope', 'eastern_dock', 'rope', ['coil', 'coil of rope'], 'The thickest coil of rope you have ever seen sits on the dock. Attempting to carry it would turn the adventure into a hernia simulator.')
addScenery('eastern_hatch', 'eastern_dock', 'ship opening', ['hatch', 'doorway', 'opening'], 'An opening in the ship leads into a darker cargo area. You are staying on the dock, partly because of the crewman and partly because this is not Ship Quest.')
addScenery('eastern_lantern', 'eastern_dock', 'lantern', ['lamp'], 'A lantern glows in the darker interior of the ship, illuminating more stacked cargo.')
addScenery('eastern_sea', 'eastern_dock', 'sea', ['water', 'ocean', 'bay'], 'The clear waters of Golden Bay shimmer beyond the dock.')
addScenery('eastern_gulls', 'eastern_dock', 'seagulls', ['seagull', 'birds', 'bird'], 'Seagulls glide and squabble overhead, conducting the traditional seaside argument about absolutely nothing.')
addScenery('eastern_clouds', 'eastern_dock', 'clouds', ['cloud', 'sky'], 'White clouds drift across a bright blue sky. For once, the weather has not been designed as a puzzle.')

addScenery('main_banner', 'main_dock', 'Kamalot banner', ['banner', 'flag', 'sign'], 'A red-and-yellow Kamalot banner marks the route towards the castle and its forthcoming festivities. The exact heraldry is still subject to royal branding approval.')
addScenery('main_castle', 'main_dock', 'castle', ['Kamalot', 'Castle Kamalot'], 'Only the distant upper parts of Castle Kamalot are visible above the woodland. It is considerably farther away than Sir Arrogant made it sound.')
addScenery('main_trees', 'main_dock', 'trees', ['tree', 'woodland', 'forest'], 'Trees line the inland path and hide most of the castle approach.')
addScenery('main_shore', 'main_dock', 'shoreline', ['shore', 'sand', 'grass'], 'The dock meets a sandy, grassy shoreline before the path begins inland.')
addScenery('main_water', 'main_dock', 'water', ['sea', 'bay'], 'The calm water of Golden Bay laps around the dock supports.')
addScenery('main_gulls', 'main_dock', 'birds', ['bird', 'seagulls', 'seagull'], 'A few gulls circle above the bay, presumably judging everyone arriving for the games.')

addScenery('western_water', 'western_dock', 'water', ['sea', 'bay'], 'Gentle waves knock rhythmically against the support pillars.')
addScenery('western_gulls', 'western_dock', 'seagulls', ['seagull', 'birds'], 'Seagulls ride the air above the western end of the pier.')

addScenery('southern_gate_arch', 'southern_gate', 'gate', ['portcullis', 'gateway', 'castle gate'], 'The great southern gateway stands open, funnelling a steady flow of people into Castle Kamalot.')
addScenery('southern_guard', 'southern_gate', 'castle guard', ['guard', "King's Guard", 'kings guard', 'Biff'], 'A large King\'s Guard in armour and a bright plume watches the entrance. He has the confident expression of a man who has never been troubled by a second thought.')
addScenery('southern_beggar', 'southern_gate', 'beggar', [], 'A rather fragrant beggar sits off to one side of the gate, accompanied by a small but enthusiastic cloud of flies.')
addScenery('southern_flies', 'southern_gate', 'flies', ['fly'], 'The flies appear considerably more committed to the beggar than most people are to their careers.')
addScenery('southern_foliage', 'southern_gate', 'foliage', ['bushes', 'bush', 'trees'], 'Dense foliage crowds both sides of the castle wall. Sneaking into it would attract the guard\'s attention and raise the difficult question of what exactly you thought you were doing.')
addScenery('southern_castle_view', 'southern_gate', 'castle interior', ['courtyard', 'inside castle'], 'Through the gate you can see a lively castle courtyard full of visitors and preparations for the games.')

addScenery('tourist_booth', 'tourist_information', 'tourist information booth', ['booth', 'kiosk', 'tourist information'], 'A cheerful information booth exists to explain Kamalot to visitors who have somehow arrived without reading the manual.')
addScenery('tourist_leaflets', 'tourist_information', 'leaflets', ['leaflet', 'pamphlets'], 'Leaflets advertise local attractions and contain useful warnings in print small enough to encourage adventure.')
addScenery('tourist_cart', 'tourist_information', 'cart', ['wooden cart', 'abandoned cart'], 'An abandoned wooden cart waits beside the booth. It looks uncomfortable enough to become important after a night in the tavern.')

addScenery('fountain', 'castle_fountain', 'fountain', ['water fountain', 'statue'], 'The white-limestone fountain surrounds a heroic knight statue. The machinery looks elaborate, delicate and extremely vulnerable to someone with a bucket of fish.')
addScenery('fountain_coins', 'castle_fountain', 'coins', ['coin', 'gold coins'], 'Coins glitter enticingly beneath the water while the nearby guard demonstrates an impressive commitment to watching you look at them.')
addScenery('fountain_guard', 'castle_fountain', 'guard', ["King's Guard"], 'The fountain guard watches the water with the intensity of a man protecting the kingdom\'s strategic coin reserve.')

addScenery('camphor_tree', 'commemorative_tree', 'tree', ['camphor tree', 'commemorative tree'], 'The commemorative tree is rare camphor wood, planted in honour of the battle against Dragon Lord Fire-Ra.')
addScenery('tree_plaque', 'commemorative_tree', 'plaque', ['memorial', 'sign'], 'The plaque tells of Sir SoInSo defeating Dragon Lord Fire-Ra and losing an arm in the process. A branch from this tree was later used for his prosthetic arm.')

addScenery('keep_door', 'main_keep_entrance', 'door', ['doors', 'keep entrance'], 'A vast arched wooden door guards the Main Keep. It is built to impress visitors and inconvenience deliveries.')
addScenery('keep_guard', 'main_keep_entrance', 'guard', ["King's Guard"], 'The guard stands beside the keep entrance, professionally preventing unauthorised wandering.')
addScenery('knight_bed', 'knights_room', 'bed', ['four-poster bed'], 'A large bed occupies much of the chamber. It has the unmistakable air of furniture involved in future embarrassment.')
addScenery('knight_table', 'knights_room', 'table', [], 'A sturdy table waits for knightly equipment, food deliveries and anything else Sir Arrogant cannot be bothered holding himself.')

addScenery('eastern_gate_guard', 'eastern_gate_inside', 'guard', ["King's Guard"], 'A guard watches the eastern passage and the steady traffic around the keep.')
addScenery('kfc_sign', 'kfc_4u_outside', 'KFC sign', ['sign', 'fried chicken sign'], 'The Kamalot Fried Chicken sign promises fried chicken with the confidence of an establishment currently short of chicken.')
addScenery('fouru_sign', 'kfc_4u_outside', '4U sign', ['4U', 'shop sign'], 'The neighbouring 4U premises appears capable of changing business model faster than most people change socks.')
addScenery('kfc_server', 'kfc_inside', 'server', ['staff', 'counter staff'], 'The server stands behind the counter with the patience of someone about to explain why a fried chicken shop has no chicken.')
addScenery('bean_station', 'kfc_inside', 'Fiery Fava Beans station', ['beans', 'sample station', 'fava beans'], 'A trial station advertises Fiery Fava Beans. The word Fiery is doing more work than you would initially assume.')
addScenery('stan', 'four_u_inside', 'Stan', ['salesman', 'shop assistant'], 'Stan beams with the predatory warmth of a man who can transform any stock shortage into a financing opportunity.')
addScenery('western_gate_guard', 'western_gate_inside', 'guard', ["King's Guard"], 'The western gate guard watches the forest road and seems particularly interested in whether travellers possess anything that makes a loud ringing noise.')

addScenery('tavern_sign', 'dragons_maw_outside', 'tavern sign', ['sign', 'dragon sign'], 'The sign depicts a dragon\'s head with its jaws open wide. Subtle branding was evidently not available when the tavern was founded.')
addScenery('tavern_fire', 'dragons_maw_inside', 'fire', ['fireplace', 'hearth'], 'A warm fire crackles in the hearth, drawing patrons, dogs and poor decisions towards it.')
addScenery('sir_soinso', 'dragons_maw_inside', 'old knight', ['Sir SoInSo', 'knight'], 'An old knight drinks with impressive focus. One of his arms is a wooden prosthetic with a history considerably more heroic than his current posture.')
addScenery('scraps', 'dragons_maw_inside', 'Scraps', ['dog'], 'Scraps the dog lounges near the fire, keeping one eye open for anything wooden and portable.')
addScenery('tavern_barrels', 'dragons_maw_inside', 'barrels', ['barrel'], 'Drink barrels line the tavern wall. Opening one yourself would be considered theft, poor etiquette and probably bad cellar management.')

addScenery('market_stalls', 'market', 'market stalls', ['stalls', 'fruit', 'meat'], 'Bright market stalls sell fruit, meat and goods from around the kingdom.')
addScenery('herb_merchant', 'market', 'herbs and spices merchant', ['merchant', 'herb merchant', 'spice merchant'], 'The merchant presides over coloured jars of herbs and spices and looks ready to turn a recipe crisis into a commercial opportunity.')
addScenery('market_crates', 'market', 'crates', ['crate', 'barrels', 'barrel'], 'Crates and barrels clutter the back of the market and partly obscure the narrow route into the alleyway.')

addScenery('alley_rats', 'alleyway', 'rats', ['rat'], 'Rats scurry through the alley with the confidence of residents rather than pests.')
addScenery('kitchen_door', 'alleyway', 'kitchen door', ['door'], 'A working door leads towards the Castle Kitchen. It looks exactly like the sort of door an impatient chef might slam in somebody\'s face.')
addScenery('dead_end_crates', 'alleyway_dead_end', 'crates', ['crate', 'boxes'], 'The crates are stacked beneath the kitchen window with suspicious adventure-game convenience.')
addScenery('kitchen_window', 'alleyway_dead_end', 'window', ['kitchen window'], 'The window gives a view into the frantic Castle Kitchen and the ingredients piled near it.')
addScenery('window_onions', 'alleyway_dead_end', 'onions', ['onion', 'bowl of onions'], 'A bowl of onions sits near the window. They look less fresh the longer you inspect them, which is rarely encouraging.')

addScenery('chef', 'castle_kitchen', 'chef', ['cook'], 'The large stout chef wears a white hat and apron and moves around the kitchen with the energy of a man whose ingredients have personally betrayed him.')
addScenery('kitchen_onions', 'castle_kitchen', 'onions', ['onion'], 'The onions are in dreadful condition and appear to have developed their own small ecosystem.')
addScenery('fresh_chicken', 'castle_kitchen', 'fresh chicken', ['chicken'], 'Fresh chicken sits on the preparation table, currently neither fried nor yours.')
addScenery('blunt_knife', 'castle_kitchen', 'knife', ['blunt knife', 'kitchen knife'], 'A kitchen knife lies nearby. Its edge has all the cutting power of a strongly worded letter.')

addScenery('forest_gate_wall', 'western_gate_outside', 'castle wall', ['wall', 'castle'], 'The western castle wall rises behind you, providing a reassuringly solid boundary between civilisation and the troll-infested forest.')
addScenery('forest_path_trees', 'forest_path', 'trees', ['forest', 'woodland'], 'Dense trees close around the path, filtering the sunlight into shifting patches.')
addScenery('crossroads_deep_forest', 'forest_crossroads', 'western path', ['west path', 'deep forest'], 'The western path leads into Chapter Two. Narrative union rules prohibit you from crossing that picket line yet.')
addScenery('clearing_trolls', 'forest_clearing', 'trolls', ['troll'], 'This clearing is where two trolls will eventually make the poor decision to terrorise somebody carrying plot significance.')
addScenery('clearing_figure', 'forest_clearing', 'hooded figure', ['figure', 'person'], 'A hooded figure belongs to a later story state here. For now, consider the clearing prepared for dramatic intervention.')

addScenery('mill_wheel', 'old_mill_outside', 'waterwheel', ['wheel', 'water wheel'], 'The great wooden waterwheel powers the mill when the river is actually behaving like a river.')
addScenery('emmett', 'old_mill_inside', 'Old Man Emmett', ['Emmett', 'old man', 'miller'], 'Old Man Emmett has the energetic, slightly alarming air of someone for whom flour production is only one experimental accident away from science fiction.')
addScenery('mill_stone', 'old_mill_inside', 'mill stone', ['grinding stone', 'stone'], 'The mill stone is built for grinding grain. It could probably put an edge on something blunt if somebody were inclined to test that theory.')
addScenery('flour_sacks', 'old_mill_inside', 'flour sacks', ['sack', 'flour'], 'Heavy sacks and flour dust occupy much of the mill. Your clothes feel cleaner merely by comparison.')
addScenery('cogs', 'cog_house', 'cogs', ['cog', 'gears', 'machinery'], 'Massive wooden cogs interlock across the chamber. They look exceptionally capable of converting carelessness into a cautionary tale.')
addScenery('cog_lever', 'cog_house', 'lever', ['handle'], 'A lever controls whether the mechanism is engaged. This is useful information in a room full of machinery capable of eating sleeves.')

addScenery('magpie', 'forest_tree', 'magpie', ['bird'], 'A magpie watches for shiny objects with the moral philosophy of a tiny feathered burglar.')
addScenery('tree_nest', 'tree_top', 'nest', ['magpie nest'], 'The magpie nest sits at the end of the branch. In the appropriate story state it contains a brooch and a gold coin.')
addScenery('tree_brooch', 'tree_top', 'brooch', ['jewel-encrusted brooch'], 'A jewel-encrusted brooch belongs in the nest once the magpie has done its part in the story.')
addScenery('tree_gold', 'tree_top', 'gold coin', ['coin'], 'A gold coin glints among the nest material in the later puzzle state.')

addScenery('waterfall_water', 'waterfall', 'waterfall', ['falls', 'water'], 'Water descends the rock face. Its flow changes dramatically during Chapter One depending on a troll-shaped plumbing problem upstream.')
addScenery('waterfall_hole', 'waterfall', 'rounded opening', ['hole', 'opening', 'vent exit'], 'A rounded opening high in the rocks is the eventual exit from the dungeon beneath the castle.')
addScenery('cliff_vines', 'cliffs', 'vines', ['vine'], 'Strong vines hang from the wet cliff face. They are useful, inconveniently positioned and attached far better than you would like.')
addScenery('plateau_view', 'plateau', 'view', ['forest', 'castle'], 'From the plateau you can see across the waterfall, forest and distant country around Kamalot.')
addScenery('troll_chieftain', 'top_of_waterfall', 'troll chieftain', ['troll', 'Gorgul Thunderfist'], 'A troll chieftain is destined to become lodged in the river here, proving that even natural disasters can have names.')

addScenery('cell_straw', 'dungeon_cell_1', 'straw bed', ['straw', 'bed', 'hay'], 'A thin layer of straw constitutes the dungeon\'s premium sleeping accommodation.')
addScenery('cell_water', 'dungeon_cell_1', 'dripping water', ['water', 'drip'], 'Water drips steadily down the stonework, providing ambience and eventually something useful for dampening cloth.')
addScenery('cell_vent', 'dungeon_cell_1', 'vent', ['bars', 'barred vent'], 'A small barred vent leads upward. The bars look sturdy until you start thinking about improvised leverage.')
addScenery('cell_torch', 'dungeon_cell_1', 'torch', ['flaming torch'], 'A torch provides the sort of portable light source you may wish to retain before entering anything described as a vent shaft.')
addScenery('cell_stonework', 'dungeon_cell_1', 'loose stonework', ['stones', 'wall', 'loose stones'], 'The western wall contains suspiciously loose stonework. It looks considerably less permanent than the prison architect intended.')

addScenery('cell2_rags', 'dungeon_cell_2', 'rags', ['clothes', 'old clothing'], 'Old clothing rags lie abandoned in the cell. They are disgusting, which in adventure-game terms makes them almost certainly useful.')
addScenery('cell2_skeleton', 'dungeon_cell_2', 'skeleton', ['bones', 'prisoner'], 'A chained skeleton provides a silent but extremely persuasive review of the accommodation.')
addScenery('cell2_femur', 'dungeon_cell_2', 'femur bone', ['femur', 'bone'], 'A sturdy femur bone lies among the remains. Somewhere, an improvised tool is waiting to happen.')
addScenery('cell2_rat', 'dungeon_cell_2', 'rat', ['rat hole', 'hole'], 'A rat regards you briefly before remembering an urgent appointment inside its hole.')

addScenery('vent_cobwebs_start', 'inside_vent_shaft', 'cobwebs', ['webs', 'web'], 'Cobwebs cling to the damp stone. Whatever made them is either small, absent or waiting for a later room to become much less reassuring.')
addScenery('vent_cobwebs', 'vent_shaft', 'cobwebs', ['webs', 'web'], 'The webs are thicker here, and the unseen movement in the darkness is doing nothing for morale.')
addScenery('cavern_spider', 'large_cavern', 'cave spider', ['spider', 'large spider'], 'The cave spider is enormous, patient and clearly convinced that the cavern is a restaurant with table service.')
addScenery('cavern_web', 'large_cavern', 'spider web', ['web', 'webs'], 'Thick strands cross parts of the cavern. Touching them later will be an exceptionally efficient way to announce yourself as lunch.')
addScenery('cavern_rungs', 'large_cavern', 'iron rungs', ['rungs', 'ladder'], 'Iron rungs fixed into the stone lead up the vertical shaft towards daylight and rushing water.')
addScenery('exit_water', 'vent_shaft_exit', 'rushing water', ['water', 'waterfall'], 'Fast water covers the opening. Beyond it lies the forest waterfall and, eventually, freedom from underground architecture.')
