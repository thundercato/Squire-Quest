'use strict'

let squireQuestUiInitialised = false
let travelContinueHandler = null

function getRoomDisplayName() {
  if (typeof currentLocation === 'undefined' || !currentLocation) return ''
  return currentLocation.alias || currentLocation.name || ''
}

function getFreshAssetUrl(path) {
  if (typeof squireQuestFreshUrl === 'function') return squireQuestFreshUrl(path)
  return path
}

function updateRoomPresentation() {
  const image = document.querySelector('#room-image')
  const art = document.querySelector('#room-art')
  const title = document.querySelector('#room-title')
  if (!image || !art || !title || typeof currentLocation === 'undefined') return

  title.textContent = getRoomDisplayName()

  if (!currentLocation.roomImage) {
    image.hidden = true
    image.removeAttribute('src')
    image.removeAttribute('data-room-image')
    image.alt = ''
    art.hidden = true
    return
  }

  art.hidden = false
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
      image.classList.remove('is-fading')
      image.onload = null
    }
    image.src = nextSrc
    image.setAttribute('data-room-image', nextAsset)
    image.alt = nextAlt
    if (image.complete) image.classList.remove('is-fading')
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

    if (opening && !opening.hidden) {
      event.preventDefault()
      dismissOpeningScreen()
    }
  })

  if (output && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function () {
      window.requestAnimationFrame(scrollStoryToBottom)
    })
    observer.observe(output, { childList: true, subtree: true })
  }
}
