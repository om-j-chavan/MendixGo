// Tiny WebAudio blip engine — optional, off by default.
let ctx: AudioContext | null = null

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gain: number) {
  const c = ac()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime + start)
  g.gain.setValueAtTime(0.0001, c.currentTime + start)
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + start + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(c.currentTime + start)
  osc.stop(c.currentTime + start + dur + 0.02)
}

export type Sfx = 'click' | 'correct' | 'wrong' | 'complete' | 'levelup' | 'badge'

export function play(sfx: Sfx, enabled: boolean) {
  if (!enabled) return
  try {
    const c = ac()
    if (c && c.state === 'suspended') c.resume()
    switch (sfx) {
      case 'click':
        tone(440, 0, 0.08, 'square', 0.04)
        break
      case 'correct':
        tone(660, 0, 0.09, 'triangle', 0.08)
        tone(880, 0.08, 0.12, 'triangle', 0.08)
        break
      case 'wrong':
        tone(200, 0, 0.16, 'sawtooth', 0.05)
        tone(150, 0.08, 0.18, 'sawtooth', 0.05)
        break
      case 'complete':
        tone(523, 0, 0.1, 'triangle', 0.07)
        tone(659, 0.09, 0.1, 'triangle', 0.07)
        tone(784, 0.18, 0.16, 'triangle', 0.07)
        break
      case 'levelup':
        tone(523, 0, 0.1, 'square', 0.06)
        tone(659, 0.1, 0.1, 'square', 0.06)
        tone(784, 0.2, 0.1, 'square', 0.06)
        tone(1046, 0.3, 0.25, 'square', 0.07)
        break
      case 'badge':
        tone(880, 0, 0.09, 'triangle', 0.07)
        tone(1174, 0.1, 0.2, 'triangle', 0.07)
        break
    }
  } catch {
    /* ignore audio errors */
  }
}
