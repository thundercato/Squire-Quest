'use strict'

function updateRoomImage() {
  const image = document.querySelector('#room-image')
  const art = document.querySelector('#room-art')
  if (!image || !art || typeof currentLocation === 'undefined') return

  if (!currentLocation.roomImage) {
    image.hidden = true
    image.removeAttribute('src')
    image.alt = ''
    art.hidden = true
    return
  }

  art.hidden = false
  image.hidden = false
  image.src = currentLocation.roomImage
  image.alt = currentLocation.roomImageAlt || currentLocation.alias || currentLocation.name
}
