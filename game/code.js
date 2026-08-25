'use strict'

let squireQuestUiInitialised = false
let travelContinueHandler = null
let roomAmbienceUnlocked = false
let roomAmbienceAudio = null
let roomAmbienceTrack = null
let roomAmbienceTimer = null

const ROOM_AMBIENCE = {
  eastern_dock: 'assets/audio/ocean-ambience.mp3',
  main_dock: 'assets/audio/ocean-ambience.mp3',
  western_dock: 'assets/audio/ocean-ambience.mp3',

  southern_gate: 'assets/audio/medieval-marketplace.mp3',
  tourist_information: 'assets/audio/medieval-marketplace.mp3',
  castle_fountain: 'assets/audio/castle-fountain-loop.mp3',
  commemorative_tree: 'assets/audio/medieval-marketplace.mp3',
  main_keep_entrance: 'assets/audio/medieval-marketplace.mp3',
  eastern_gate_inside: 'assets/audio/medieval-marketplace.mp3',
  kfc_4u_outside: 'assets/audio/medieval-marketplace.mp3',
  western_gate_inside: 'assets/audio/medieval-marketplace.mp3',
  market: 'assets/audio/medieval-marketplace.mp3',
}

function getRoomDisplayName() {
  if (typeof currentLocation === 'undefined' || !currentLocation) return ''
  return currentLocation.alias || currentLocation.name || ''
}

function getFreshAssetUrl(path) {
  if (typeof squireQuestFreshUrl === 'function') return squireQuestFreshUrl(path)
  return path
}

function fountainIsRunning() {
  return !(typeof sq !== 'undefined' && sq && sq.fountainBroken)
}

function stopRoomAmbience() {
  try {
    if (!roomAmbienceAudio) return
    roomAmbienceAudio.pause()
    roomAmbienceAudio.removeAttribute('src')
    roomAmbienceAudio.load()
  }
  catch (err) {
    console.warn('Squire Quest ambience stop failed safely:', err)
  }
  roomAmbienceTrack = null
}

function updateRoomAmbience() {
  try {
    if (!roomAmbienceUnlocked || typeof currentLocation === 'undefined' || !currentLocation) return

    let nextTrack = ROOM_AMBIENCE[currentLocation.name] || null
    if (currentLocation.name === 'castle_fountain' && !fountainIsRunning()) nextTrack = null

    if (!nextTrack) {
      stopRoomAmbience()
      return
    }

    if (!roomAmbienceAudio) {
      roomAmbienceAudio = new window.Audio()
      roomAmbienceAudio.loop = true
      roomAmbienceAudio.preload = 'auto'
      roomAmbienceAudio.volume = currentLocation.name === 'castle_fountain' ? 0.32 : 0.18
    }

    roomAmbienceAudio.volume = currentLocation.name === 'castle_fountain' ? 0.32 : 0.18

    if (roomAmbienceTrack === nextTrack && !roomAmbienceAudio.paused) return

    if (roomAmbienceTrack !== nextTrack) {
      roomAmbienceAudio.pause()
      roomAmbienceAudio.src = getFreshAssetUrl(nextTrack)
      roomAmbienceTrack = nextTrack
    }

    const playPromise = roomAmbienceAudio.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function (err) {
        console.warn('Squire Quest ambience playback was blocked or unavailable:', err)
      })
    }
  }
  catch (err) {
    // Audio must never be able to break parser movement or gameplay.
    console.warn('Squire Quest ambience failed safely:', err)
    stopRoomAmbience()
  }
}

function scheduleRoomAmbienceUpdate() {
  if (roomAmbienceTimer) window.clearTimeout(roomAmbienceTimer)
  roomAmbienceTimer = window.setTimeout(function () {
    roomAmbienceTimer = null
    updateRoomAmbience()
  }, 0)
}

function unlockRoomAmbience() {
  if (!roomAmbienceUnlocked) roomAmbienceUnlocked = true
  scheduleRoomAmbienceUpdate()
}

function showBlankRoomFrame(image, art) {
  art.hidden = false
  art.classList.add('is-placeholder')
  image.hidden = true
  image.removeAttribute('src')
  image.removeAttribute('data-room-image')
  image.alt = ''
  image.onload = null
  image.onerror = null
  image.classList.remove('is-fading')
}

function updateRoomPresentation() {
  const image = document.querySelector('#room-image')
  const art = document.querySelector('#room-art')
  const title = document.querySelector('#room-title')
  if (!image || !art || !title || typeof currentLocation === 'undefined') return

  title.textContent = getRoomDisplayName()

  // Keep browser audio APIs outside QuestJS's synchronous movement stack. A media
  // decoding/autoplay failure must never turn a valid direction into a game error.
  scheduleRoomAmbienceUpdate()

  if (!currentLocation.roomImage) {
    showBlankRoomFrame(image, art)
    return
  }

  art.hidden = false
  art.classList.remove('is-placeholder')
  image.hidden = false

  const nextAsset = currentLocation.roomImage
  const nextSrc = getFreshAssetUrl(nextAsset)
  const nextAlt = currentLocation.roomImageAlt || getRoomDisplayName()

  if (image.getAttribute('data-room-image') === nextAsset) {
    image.alt = nextAlt
    image.classList.remove('is-fading')
    return
  }

  image.classList.add('is-fading')
  window.setTimeout(function () {
    image.onload = function () {
      art.classList.remove('is-placeholder')
      image.hidden = false
      image.classList.remove('is-fading')
      image.onload = null
      image.onerror = null
    }
    image.onerror = function () {
      showBlankRoomFrame(image, art)
    }
    image.src = nextSrc
    image.setAttribute('data-room-image', nextAsset)
    image.alt = nextAlt
    if (image.complete && image.naturalWidth > 0) {
      art.classList.remove('is-placeholder')
      image.classList.remove('is-fading')
    }
  }, 300)
}

function scrollStoryToBottom() {
  const output = document.querySelector('#output')
  if (!output) return
  output.scrollTop = output.scrollHeight
}

function setParserInputEnabled(enabled) {
  const textbox = document.querySelector('#textbox')
  if (!textbox) return
  textbox.disabled = !enabled
  if (enabled) textbox.focus()
}

function setStoryFontSize(size) {
  const allowed = ['small', 'normal', 'large']
  const selected = allowed.includes(size) ? size : 'normal'
  document.body.setAttribute('data-story-font', selected)

  document.querySelectorAll('#font-size-controls button').forEach(function (button) {
    button.setAttribute('aria-pressed', button.getAttribute('data-font-size') === selected ? 'true' : 'false')
  })

  window.requestAnimationFrame(scrollStoryToBottom)
}

function dismissOpeningScreen() {
  const opening = document.querySelector('#opening-screen')
  if (!opening || opening.hidden || opening.classList.contains('is-leaving')) return

  unlockRoomAmbience()
  opening.classList.add('is-leaving')
  window.setTimeout(function () {
    opening.hidden = true
    opening.classList.remove('is-leaving')
    setParserInputEnabled(true)
    scrollStoryToBottom()
  }, 340)
}

function showTravelInterlude(text) {
  const screen = document.querySelector('#travel-screen')
  const textEl = document.querySelector('#travel-text')
  if (!screen || !textEl) return

  textEl.textContent = text
  screen.classList.remove('is-leaving')
  screen.hidden = false
  setParserInputEnabled(false)
}

function dismissTravelInterlude() {
  const screen = document.querySelector('#travel-screen')
  if (!screen || screen.hidden || screen.classList.contains('is-leaving')) return

  screen.classList.add('is-leaving')
  window.setTimeout(function () {
    screen.hidden = true
    screen.classList.remove('is-leaving')
    updateRoomPresentation()
    setParserInputEnabled(true)
    scrollStoryToBottom()
  }, 340)
}

function setupSquireQuestUI() {
  if (squireQuestUiInitialised) return
  squireQuestUiInitialised = true

  const opening = document.querySelector('#opening-screen')
  const travel = document.querySelector('#travel-screen')
  const output = document.querySelector('#output')
  const fontControls = document.querySelector('#font-size-controls')

  setParserInputEnabled(false)
  setStoryFontSize('normal')

  document.addEventListener('pointerdown', unlockRoomAmbience, { once: true })

  if (opening) opening.addEventListener('click', dismissOpeningScreen)
  if (travel) travel.addEventListener('click', dismissTravelInterlude)

  if (fontControls) {
    fontControls.addEventListener('click', function (event) {
      const button = event.target.closest('button[data-font-size]')
      if (!button) return
      setStoryFontSize(button.getAttribute('data-font-size'))
    })
  }

  document.addEventListener('keydown', function (event) {
    unlockRoomAmbience()

    const allowed = event.key === 'Enter' || event.key === ' ' || event.key === 'Escape'
    if (!allowed) return

    if (travel && !travel.hidden) {
      event.preventDefault()
      dismissTravelInterlude()
      return
    }

    if (opening && !opening.hidden) {
      event.preventDefault()
      dismissOpeningScreen()
    }
  })

  if (output && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function () {
      window.requestAnimationFrame(scrollStoryToBottom)
      // Also catches in-room state changes, for example the fountain being broken.
      scheduleRoomAmbienceUpdate()
    })
    observer.observe(output, { childList: true, subtree: true })
  }
}
