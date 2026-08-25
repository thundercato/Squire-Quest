'use strict'

settings.title = 'Squire Quest I: The Dragon Slayer'
settings.author = 'Adam and Colin of GAC Software Inc.'
settings.version = '0.1.6'
settings.panes = 'none'
settings.compassPane = false
settings.statusPane = false
settings.inventoryPane = []
settings.roomTemplate = [
  '{class:room-description:{terse:{hereDesc}}}',
  '{objectsHere:You can see {objects} here.}',
  '{exitsHere:You can go {exits}.}',
]
settings.setup = function () {
  if (typeof setupSquireQuestUI === 'function') setupSquireQuestUI()
}
settings.afterEnter = function () {
  if (typeof updateRoomPresentation === 'function') updateRoomPresentation()
}
