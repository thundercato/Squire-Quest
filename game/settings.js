'use strict'

settings.title = 'Squire Quest I: The Dragon Slayer'
settings.author = 'Adam and Colin of GAC Software Inc.'
settings.version = '0.1.0'
settings.panes = 'none'
settings.compassPane = false
settings.statusPane = false
settings.inventoryPane = []
settings.roomTemplate = [
  '#{cap:{hereName}}',
  '{terse:{hereDesc}}',
  '{objectsHere:You can see {objects} here.}',
  '{exitsHere:You can go {exits}.}',
]
settings.afterEnter = function () {
  if (typeof updateRoomImage === 'function') updateRoomImage()
}
