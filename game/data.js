'use strict'

createItem('me', PLAYER(), {
  loc: 'eastern_dock',
  examine: 'A loyal squire with a heroic future, assuming you can survive the first afternoon.',
})

createRoom('eastern_dock', {
  alias: 'Eastern Dock',
  roomImage: 'assets/images/rooms/eastern-dock-initial.png',
  roomImageAlt: 'The Eastern Dock with the enormous arrival ship moored alongside.',
  desc: 'You stand on the eastern end of an old creaky wooden dock. The huge ship that brought you to Kamalot is still moored alongside, most of its bulk towering beyond your view. Crew bustle around the lowered gangplank while an officious crewman with a clipboard guards the way back aboard. Open sea stretches beyond the dock. The Main Dock lies to the WEST.',
  west: new Exit('main_dock'),
})

createRoom('main_dock', {
  alias: 'Main Dock',
  roomImage: 'assets/images/rooms/main-dock.png',
  roomImageAlt: 'The central dock, with a woodland path leading inland towards distant Castle Kamalot.',
  desc: 'The middle of the broad wooden dock stretches EAST and WEST across the calm waters of Golden Bay. To the NORTH the timber gives way to shore and a well-worn path disappears into woodland. Far beyond the trees, the upper reaches of Castle Kamalot hint at the distance still to travel.',
  east: new Exit('eastern_dock'),
  west: new Exit('western_dock'),
  north: new Exit('southern_gate'),
})

createRoom('western_dock', {
  alias: 'Western Dock',
  roomImage: 'assets/images/rooms/western-dock.png',
  roomImageAlt: 'The quiet western end of the dock before the fisherman arrives.',
  desc: 'This is the quieter western end of the dock. Gentle waves lap against the sturdy support pillars in a rhythm that almost makes you forget Sir Arrogant has given you something to do. Almost. The Main Dock lies to the EAST.',
  east: new Exit('main_dock'),
})

createRoom('southern_gate', {
  alias: 'The Southern Gate',
  roomImage: 'assets/images/rooms/southern-gate.png',
  roomImageAlt: 'The busy Southern Gate of Castle Kamalot, decorated for the forthcoming games.',
  desc: 'The Southern Gate of Castle Kamalot stands open to the NORTH, alive with visitors, workers and tournament preparations. Banners and bunting hang around the entrance. A King\'s Guard watches the traffic while a beggar sits off to one side. Beyond the gateway you can glimpse the busy castle grounds and what looks like a small tourist information kiosk. The woodland path leads SOUTH towards the docks.',
  south: new Exit('main_dock'),
  north: new Exit('town_sq_s'),
  beforeEnter: function (exit) {
    if (exit && exit.origin && exit.origin.name === 'main_dock') {
      msg('You follow the well-worn path through the woodland. Some twenty minutes later, the walls of Castle Kamalot finally loom ahead.')
    }
  },
})

createRoom('town_sq_s', {
  alias: 'The Town Square (South)',
  desc: 'A market full of fine wares (and some not so fine) from around the globe surrounds you.',
  south: new Exit('southern_gate'),
})

createItem('arrival_ship', {
  alias: 'ship',
  synonyms: ['boat', 'vessel'],
  loc: 'eastern_dock',
  scenery: true,
  examine: 'The enormous arrival ship is moored alongside the dock, with most of it extending beyond your view.',
})

createItem('gangplank', {
  loc: 'eastern_dock',
  scenery: true,
  examine: 'A stout wooden gangplank links the dock to the ship. The clipboard-wielding crewman is making sure you do not use it.',
})

createItem('crewman', {
  alias: 'crewman',
  synonyms: ['sailor', 'clipboard man'],
  loc: 'eastern_dock',
  scenery: true,
  examine: 'An officious crewman clutches an inventory list with the solemnity of a royal decree.',
})

createItem('eastern_cargo', {
  alias: 'cargo',
  synonyms: ['crates', 'barrels', 'nets', 'rope'],
  loc: 'eastern_dock',
  scenery: true,
  examine: 'Crates, barrels, netting and a formidable coil of rope wait on the dock while the crew work through the cargo.',
})

createItem('main_path', {
  alias: 'path',
  synonyms: ['track', 'woodland path'],
  loc: 'main_dock',
  scenery: true,
  examine: 'A well-worn dirt path leads north through the trees towards Castle Kamalot.',
})

createItem('distant_castle', {
  alias: 'castle',
  synonyms: ['Kamalot', 'Castle Kamalot'],
  loc: 'main_dock',
  scenery: true,
  examine: 'Only the distant upper parts of Castle Kamalot are visible above the woodland. It is considerably farther away than Sir Arrogant made it sound.',
})

createItem('games_banner', {
  alias: 'banner',
  synonyms: ['sign', 'tournament banner'],
  loc: 'main_dock',
  scenery: true,
  examine: 'A tournament banner makes it clear that something important, noisy and probably expensive is about to happen at the castle.',
})

createItem('gate', {
  alias: 'gate',
  synonyms: ['portcullis', 'gateway'],
  loc: 'southern_gate',
  scenery: true,
  examine: 'The great southern gateway stands open, funnelling a steady flow of people into Castle Kamalot.',
})

createItem('biff', {
  alias: 'Biff',
  synonyms: ['guard', "King's Guard", 'kings guard'],
  loc: 'southern_gate',
  scenery: true,
  examine: 'Biff is a large King\'s Guard in armour with a bright plume and the confident expression of a man who has never been troubled by a second thought.',
})

createItem('beggar', {
  loc: 'southern_gate',
  scenery: true,
  examine: 'A rather fragrant beggar sits off to one side of the gate, accompanied by a small but enthusiastic cloud of flies.',
})

createItem('tourist_information', {
  alias: 'tourist information kiosk',
  synonyms: ['kiosk', 'booth', 'tourist information'],
  loc: 'southern_gate',
  scenery: true,
  examine: 'Through the gate you can just make out a small tourist information kiosk among the activity to the NORTH.',
})
