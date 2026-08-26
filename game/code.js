'use strict'

let squireQuestUiInitialised = false
let travelContinueHandler = null
let roomAmbienceUnlocked = false
let roomAmbienceTimer = null
let openingSequenceState = 'gac'

const ROOM_AMBIENCE = {
  eastern_dock: 'ocean',
  main_dock: 'ocean',
  western_dock: 'ocean',

  southern_gate: 'market',
  tourist_information: 'market',
  castle_fountain: 'fountain',
  commemorative_tree: 'market',
  main_keep_entrance: 'market',
  eastern_gate_inside: 'market',
  kfc_4u_outside: 'market',
  western_gate_inside: 'market',
  market: 'market',
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
  if (typeof sqStopAmbience === 'function') sqStopAmbience()
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

    if (typeof sqPlayAmbience === 'function') {
      const volume = nextTrack === 'fountain' ? 0.28 : nextTrack === 'ocean' ? 0.16 : 0.14
      sqPlayAmbience(nextTrack, volume)
    }
  }
  catch (err) {
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

function showTitleOpeningScreen() {
  const gac = document.querySelector('#gac-screen')
  const opening = document.querySelector('#opening-screen')
  if (!opening || openingSequenceState === 'title') return

  openingSequenceState = 'title'
  if (gac) {
    gac.classList.add('is-leaving')
    window.setTimeout(function () {
      gac.hidden = true
      gac.classList.remove('is-leaving')
    }, 420)
  }

  opening.hidden = false
  opening.classList.remove('is-leaving')
  window.requestAnimationFrame(function () {
    opening.classList.add('is-arriving')
    window.setTimeout(function () { opening.classList.remove('is-arriving') }, 520)
  })
}

function beginGacOpeningSequence() {
  if (openingSequenceState !== 'gac') return
  openingSequenceState = 'fanfare'
  const gac = document.querySelector('#gac-screen')
  if (gac) {
    const hint = gac.querySelector('.continue-hint')
    if (hint) hint.textContent = 'GAC Software presents…'
    gac.classList.add('is-playing')
  }

  if (typeof sqPlayOpeningFanfare === 'function') {
    sqPlayOpeningFanfare(showTitleOpeningScreen)
  }
  else {
    window.setTimeout(showTitleOpeningScreen, 2200)
  }
}

function dismissOpeningScreen() {
  const opening = document.querySelector('#opening-screen')
  if (!opening || opening.hidden || opening.classList.contains('is-leaving') || openingSequenceState !== 'title') return

  openingSequenceState = 'game'
  unlockRoomAmbience()
  opening.classList.add('is-leaving')
  window.setTimeout(function () {
    opening.hidden = true
    opening.classList.remove('is-leaving')
    setParserInputEnabled(true)
    scrollStoryToBottom()
  }, 420)
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

  const gac = document.querySelector('#gac-screen')
  const opening = document.querySelector('#opening-screen')
  const travel = document.querySelector('#travel-screen')
  const output = document.querySelector('#output')
  const fontControls = document.querySelector('#font-size-controls')

  setParserInputEnabled(false)
  setStoryFontSize('normal')

  // The GAC card owns the first user gesture. Room ambience must not start under
  // the opening fanfare.
  if (gac) gac.addEventListener('click', beginGacOpeningSequence)
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
    const allowed = event.key === 'Enter' || event.key === ' ' || event.key === 'Escape'
    if (!allowed) return

    if (travel && !travel.hidden) {
      event.preventDefault()
      dismissTravelInterlude()
      return
    }

    if (gac && !gac.hidden && (openingSequenceState === 'gac' || openingSequenceState === 'fanfare')) {
      event.preventDefault()
      if (openingSequenceState === 'gac') beginGacOpeningSequence()
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
      scheduleRoomAmbienceUpdate()
    })
    observer.observe(output, { childList: true, subtree: true })
  }
}
