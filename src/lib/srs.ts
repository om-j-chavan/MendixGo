/**
 * Lightweight SM-2 spaced repetition for reveal-style Q&A cards.
 * One card per exercise id. `due` is a YYYY-MM-DD string; a card is due when
 * today >= due. Grades come from the learner self-rating after seeing the answer.
 */
export type Grade = 'again' | 'hard' | 'good' | 'easy'

export interface SrsCard {
  ef: number // ease factor
  reps: number // successful reps in a row
  interval: number // days
  due: string // YYYY-MM-DD
  lapses: number
}

function dstr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function addDays(from: string, n: number): string {
  const [y, m, d] = from.split('-').map(Number)
  return dstr(new Date(y, m - 1, d + n))
}
export function todayISO(): string {
  return dstr(new Date())
}

export function newCard(today = todayISO()): SrsCard {
  return { ef: 2.5, reps: 0, interval: 0, due: today, lapses: 0 }
}

export function review(card: SrsCard, grade: Grade, today = todayISO()): SrsCard {
  let { ef, reps, interval, lapses } = card
  if (grade === 'again') {
    reps = 0
    interval = 0 // see it again this session / tomorrow
    lapses += 1
    ef = Math.max(1.3, ef - 0.2)
    return { ef, reps, interval, lapses, due: addDays(today, 1) }
  }
  // correct-ish grades
  if (grade === 'hard') ef = Math.max(1.3, ef - 0.15)
  else if (grade === 'easy') ef = ef + 0.15
  reps += 1
  if (reps === 1) interval = grade === 'easy' ? 2 : 1
  else if (reps === 2) interval = grade === 'easy' ? 5 : 3
  else interval = Math.max(1, Math.round(interval * ef * (grade === 'hard' ? 0.8 : grade === 'easy' ? 1.3 : 1)))
  return { ef, reps, interval, lapses, due: addDays(today, interval) }
}

export function isDue(card: SrsCard | undefined, today = todayISO()): boolean {
  if (!card) return false
  return card.due <= today
}
