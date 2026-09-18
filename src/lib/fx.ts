import confetti from 'canvas-confetti'

export function burst() {
  confetti({
    particleCount: 120,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#22d3ee', '#a855f7', '#ec4899', '#a3e635', '#3b82f6'],
    scalar: 1.05,
  })
}

export function bigCelebrate() {
  const end = Date.now() + 900
  const colors = ['#22d3ee', '#a855f7', '#ec4899', '#a3e635', '#f59e0b']
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export function pop(x: number, y: number) {
  confetti({
    particleCount: 40,
    spread: 55,
    startVelocity: 28,
    origin: { x, y },
    colors: ['#22d3ee', '#a855f7', '#ec4899'],
    scalar: 0.9,
  })
}
