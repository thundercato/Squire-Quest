'use strict'

const squireQuestRoomArtwork = {
  eastern_dock:['eastern-dock-initial.png','The Eastern Dock with the enormous arrival ship moored alongside.'],
  main_dock:['main-dock.png','The central dock with the woodland route inland towards Castle Kamalot.'],
  western_dock:['western-dock.png','The quiet western end of the dock before the fisherman arrives.'],
  southern_gate:['southern-gate.png','The busy Southern Gate of Castle Kamalot.'],
  tourist_information:['tourist-information.png','The tourist information area just inside the Southern Gate.'],
  castle_fountain:['castle-fountain.png','Castle Kamalot fountain and its surrounding courtyard.'],
  commemorative_tree:['commemorative-tree.png','The commemorative camphor tree beside the castle wall.'],
  main_keep_entrance:['main-keep-entrance.png','The guarded entrance to Castle Kamalot Main Keep.'],
  knights_room:['knights-room.png','A private chamber in the Main Keep.'],
  eastern_gate_inside:['eastern-gate-inside.png','The Eastern Gate viewed from inside Castle Kamalot.'],
  kfc_4u_outside:['kfc-4u-outside.png','Kamalot Fried Chicken and the neighbouring 4U shopfront.'],
  kfc_inside:['kfc-inside.png','The interior of Kamalot Fried Chicken.'],
  four_u_inside:['four-u-inside.png','The adaptable 4U shop interior.'],
  western_gate_inside:['western-gate-inside.png','The Western Gate viewed from inside Castle Kamalot.'],
  dragons_maw_outside:['dragons-maw-outside.png','The ancient Dragon\'s Maw tavern from outside.'],
  dragons_maw_inside:['dragons-maw-inside.png','The smoky medieval interior of the Dragon\'s Maw.'],
  market:['market.png','The bustling Castle Kamalot market.'],
  alleyway:['alleyway.png','The narrow alley behind the market.'],
  alleyway_dead_end:['alleyway-dead-end.png','The alley dead end beneath the Castle Kitchen window.'],
  castle_kitchen:['castle-kitchen.png','The busy Castle Kitchen.'],
  western_gate_outside:['western-gate-outside.png','The Western Gate from the forest side of the castle wall.'],
  forest_path:['forest-path.png','The forest path leading west from Castle Kamalot.'],
  forest_crossroads:['forest-crossroads.png','The forest crossroads.'],
  forest_clearing:['forest-clearing.png','A broad clearing deep in the forest.'],
}
Object.keys(squireQuestRoomArtwork).forEach(function(roomName){
  if(!w[roomName]) return
  const art=squireQuestRoomArtwork[roomName]
  w[roomName].roomImage='assets/images/rooms/'+art[0]
  w[roomName].roomImageAlt=art[1]
})
