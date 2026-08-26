'use strict'

// Squire Quest audio engine.
// Ambient beds are generated as full 60-second AudioBuffers and only loop when
// the entire buffer has completed. This avoids the previous tiny placeholder
// MP3s repeatedly restarting every few seconds.

let sqAudioContext = null
let sqAmbienceSource = null
let sqAmbienceGain = null
let sqAmbienceKind = null
let sqOpeningFanfareTimer = null
const sqAmbienceBuffers = {}

function sqEnsureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  if (!sqAudioContext) sqAudioContext = new AudioContextClass()
  if (sqAudioContext.state === 'suspended') {
    const promise = sqAudioContext.resume()
    if (promise && typeof promise.catch === 'function') promise.catch(function () {})
  }
  return sqAudioContext
}

function sqPrng(seed) {
  let state = seed >>> 0
  return function () {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

function sqBuildAmbienceBuffer(kind) {
  if (sqAmbienceBuffers[kind]) return sqAmbienceBuffers[kind]
  const ctx = sqEnsureAudioContext()
  if (!ctx) return null

  const sampleRate = ctx.sampleRate || 44100
  const seconds = 60
  const length = sampleRate * seconds
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)
  const random = sqPrng(kind === 'ocean' ? 91373 : kind === 'fountain' ? 44191 : 77129)

  let low = 0
  let mid = 0
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate
    const noise = random() * 2 - 1

    if (kind === 'ocean') {
      low += 0.018 * (noise - low)
      const swell = 0.46 + 0.22 * Math.sin(time * Math.PI * 2 / 8.6) + 0.10 * Math.sin(time * Math.PI * 2 / 4.3 + 1.4)
      const foam = noise * (0.035 + 0.025 * Math.max(0, Math.sin(time * Math.PI * 2 / 5.7)))
      data[i] = low * swell * 0.72 + foam
    }
    else if (kind === 'fountain') {
      low += 0.08 * (noise - low)
      mid += 0.015 * (noise - mid)
      const splash = (low - mid) * 0.8
      const pulse = 0.72 + 0.08 * Math.sin(time * Math.PI * 2 / 2.7) + 0.05 * Math.sin(time * Math.PI * 2 / 5.1)
      data[i] = (noise * 0.16 + splash * 0.55) * pulse
    }
    else {
      low += 0.035 * (noise - low)
      mid += 0.006 * (noise - mid)
      let value = (low - mid) * 0.42
      value += 0.022 * Math.sin(time * Math.PI * 2 * 118) * (0.45 + 0.55 * Math.sin(time * Math.PI * 2 / 3.9))

      // Soft wooden clops / stall knocks at deterministic intervals.
      const beat = time % 3.65
      if (beat < 0.075) value += Math.sin(beat * Math.PI * 2 * 155) * Math.exp(-beat * 44) * 0.15
      const beat2 = (time + 1.18) % 5.2
      if (beat2 < 0.06) value += Math.sin(beat2 * Math.PI * 2 * 205) * Math.exp(-beat2 * 52) * 0.10
      data[i] = value + noise * 0.025
    }
  }

  // Blend the end into the start so the 60-second boundary is quiet and smooth.
  const fadeLength = Math.min(Math.floor(sampleRate * 2.5), Math.floor(length / 4))
  for (let i = 0; i < fadeLength; i++) {
    const mix = i / fadeLength
    const startIndex = i
    const endIndex = length - fadeLength + i
    const startValue = data[startIndex]
    const endValue = data[endIndex]
    data[startIndex] = startValue * (1 - mix) + endValue * mix
    data[endIndex] = endValue * mix + startValue * (1 - mix)
  }

  let peak = 0.0001
  for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(data[i]))
  const normalise = 0.78 / peak
  for (let i = 0; i < length; i++) data[i] *= normalise

  sqAmbienceBuffers[kind] = buffer
  return buffer
}

function sqStopAmbience() {
  if (sqAmbienceSource) {
    try { sqAmbienceSource.stop() } catch (err) {}
    try { sqAmbienceSource.disconnect() } catch (err) {}
  }
  if (sqAmbienceGain) {
    try { sqAmbienceGain.disconnect() } catch (err) {}
  }
  sqAmbienceSource = null
  sqAmbienceGain = null
  sqAmbienceKind = null
}

function sqPlayAmbience(kind, volume) {
  const ctx = sqEnsureAudioContext()
  if (!ctx) return
  if (sqAmbienceKind === kind && sqAmbienceSource) return

  sqStopAmbience()
  const buffer = sqBuildAmbienceBuffer(kind)
  if (!buffer) return

  const source = ctx.createBufferSource()
  const gain = ctx.createGain()
  source.buffer = buffer
  source.loop = true
  source.loopStart = 0
  source.loopEnd = buffer.duration
  gain.gain.value = typeof volume === 'number' ? volume : 0.18
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)

  sqAmbienceSource = source
  sqAmbienceGain = gain
  sqAmbienceKind = kind
}

function sqStopOpeningFanfare() {
  if (sqOpeningFanfareTimer) window.clearTimeout(sqOpeningFanfareTimer)
  sqOpeningFanfareTimer = null
}

function sqPlayOpeningFanfare(onEnded) {
  const ctx = sqEnsureAudioContext()
  if (!ctx) {
    if (typeof onEnded === 'function') onEnded()
    return
  }

  sqStopAmbience()
  sqStopOpeningFanfare()

  const start = ctx.currentTime + 0.03
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, start)
  master.gain.exponentialRampToValueAtTime(0.34, start + 0.12)
  master.gain.setValueAtTime(0.34, start + 7.55)
  master.gain.exponentialRampToValueAtTime(0.0001, start + 8.15)
  master.connect(ctx.destination)

  const progression = [
    { at: 0.00, length: 1.65, notes: [130.81, 164.81, 196.00, 261.63] },
    { at: 1.55, length: 1.55, notes: [174.61, 220.00, 261.63, 349.23] },
    { at: 3.05, length: 1.55, notes: [196.00, 246.94, 293.66, 392.00] },
    { at: 4.55, length: 3.35, notes: [130.81, 164.81, 196.00, 261.63, 392.00] },
  ]

  progression.forEach(function (chord) {
    chord.notes.forEach(function (frequency, index) {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.type = index === 0 ? 'triangle' : 'sawtooth'
      oscillator.frequency.setValueAtTime(frequency, start + chord.at)
      oscillator.detune.value = (index - 2) * 2.5
      gain.gain.setValueAtTime(0.0001, start + chord.at)
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.13 : 0.055, start + chord.at + 0.06)
      gain.gain.setValueAtTime(index === 0 ? 0.13 : 0.055, start + chord.at + Math.max(0.12, chord.length - 0.22))
      gain.gain.exponentialRampToValueAtTime(0.0001, start + chord.at + chord.length)
      oscillator.connect(gain)
      gain.connect(master)
      oscillator.start(start + chord.at)
      oscillator.stop(start + chord.at + chord.length + 0.05)
    })
  })

  // A short heraldic top line.
  const melody = [
    [0.08, 523.25, 0.38], [0.50, 659.25, 0.38], [0.92, 783.99, 0.62],
    [1.65, 698.46, 0.38], [2.08, 783.99, 0.38], [2.52, 1046.50, 0.62],
    [3.18, 783.99, 0.38], [3.60, 987.77, 0.38], [4.05, 1174.66, 0.65],
    [4.82, 1046.50, 0.50], [5.40, 987.77, 0.42], [5.90, 783.99, 0.42], [6.42, 1046.50, 1.26]
  ]
  melody.forEach(function (note) {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'square'
    oscillator.frequency.value = note[1]
    gain.gain.setValueAtTime(0.0001, start + note[0])
    gain.gain.exponentialRampToValueAtTime(0.035, start + note[0] + 0.025)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + note[0] + note[2])
    oscillator.connect(gain)
    gain.connect(master)
    oscillator.start(start + note[0])
    oscillator.stop(start + note[0] + note[2] + 0.03)
  })

  sqOpeningFanfareTimer = window.setTimeout(function () {
    sqOpeningFanfareTimer = null
    try { master.disconnect() } catch (err) {}
    if (typeof onEnded === 'function') onEnded()
  }, 8250)
}
