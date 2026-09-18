import type { Badge } from '../types'
import { COURSES, courseLessonCount, courseSequence } from '../data/courses'

export const XP_LESSON = 20 // base XP for finishing a lesson

/* ----------------------------- dates / streak ----------------------------- */
export function todayStr(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
export function daysAgoStr(n: number): string {
  return todayStr(new Date(Date.now() - n * 86_400_000))
}

export interface Streak {
  count: number
  last: string | null
}

export function nextStreak(prev: Streak, today = todayStr()): Streak {
  if (prev.last === today) return prev
  if (prev.last === daysAgoStr(1)) return { count: prev.count + 1, last: today }
  return { count: 1, last: today }
}

/** true if the streak is still alive (studied today or yesterday). */
export function streakAlive(s: Streak, today = todayStr()): boolean {
  if (!s.last) return false
  return s.last === today || s.last === daysAgoStr(1)
}

/* --------------------------------- levels --------------------------------- */
export interface LevelInfo {
  level: number
  intoLevel: number
  needForNext: number
  pct: number
}
export function levelInfo(xp: number): LevelInfo {
  let level = 1
  let remaining = Math.max(0, Math.floor(xp))
  let need = 100
  while (remaining >= need) {
    remaining -= need
    level += 1
    need = Math.round(need * 1.25)
  }
  return { level, intoLevel: remaining, needForNext: need, pct: remaining / need }
}
export function rankTitle(level: number): string {
  if (level >= 20) return 'Mendix Legend'
  if (level >= 15) return 'Grandmaster'
  if (level >= 11) return 'Architect'
  if (level >= 8) return 'Expert'
  if (level >= 5) return 'Engineer'
  if (level >= 3) return 'Builder'
  return 'Apprentice'
}

/* --------------------------------- snapshot ------------------------------- */
export interface ProgressSnapshot {
  xp: number
  streak: Streak
  /** completed lessons, keyed by lessonKey (course:unit:lesson) */
  doneLessons: Record<string, true>
  badges: Record<string, true>
  /** lessons completed per calendar day, for the daily-goal ring */
  perDay: Record<string, number>
  dailyGoal: number
}

export interface Stats {
  doneCount: number
  perCoursePct: Record<string, number>
  interviewDone: boolean
  cortexDone: boolean
  intermediateDone: boolean
  level: number
  streak: number
  todayCount: number
}

export function courseDoneCount(courseId: string, doneLessons: Record<string, true>): number {
  const course = COURSES.find((c) => c.id === courseId)
  if (!course) return 0
  return courseSequence(course).filter((l) => doneLessons[l.key]).length
}

export function computeStats(s: ProgressSnapshot): Stats {
  const doneCount = Object.keys(s.doneLessons).length
  const perCoursePct: Record<string, number> = {}
  for (const c of COURSES) {
    const total = courseLessonCount(c)
    perCoursePct[c.id] = total ? courseDoneCount(c.id, s.doneLessons) / total : 0
  }
  return {
    doneCount,
    perCoursePct,
    interviewDone: (perCoursePct['interview'] ?? 0) >= 0.999,
    cortexDone: (perCoursePct['cortex'] ?? 0) >= 0.999,
    intermediateDone: (perCoursePct['intermediate'] ?? 0) >= 0.999,
    level: levelInfo(s.xp).level,
    streak: s.streak.count,
    todayCount: s.perDay[todayStr()] ?? 0,
  }
}

/* --------------------------------- badges --------------------------------- */
interface BadgeDef extends Badge {
  earned: (st: Stats) => boolean
}

export const BADGES: BadgeDef[] = [
  { id: 'first-step', name: 'First Step', desc: 'Finish your first lesson', icon: '👣', accent: 'cyan', earned: (s) => s.doneCount >= 1 },
  { id: 'ten', name: 'Getting Going', desc: 'Finish 10 lessons', icon: '📘', accent: 'blue', earned: (s) => s.doneCount >= 10 },
  { id: 'thirty', name: 'Committed', desc: 'Finish 30 lessons', icon: '🎓', accent: 'purple', earned: (s) => s.doneCount >= 30 },
  { id: 'hundred', name: 'Century', desc: 'Finish 100 lessons', icon: '💯', accent: 'pink', earned: (s) => s.doneCount >= 100 },
  { id: 'flame-3', name: 'Warming Up', desc: '3-day streak', icon: '🔥', accent: 'amber', earned: (s) => s.streak >= 3 },
  { id: 'flame-7', name: 'On Fire', desc: '7-day streak', icon: '🔥', accent: 'pink', earned: (s) => s.streak >= 7 },
  { id: 'flame-30', name: 'Unstoppable', desc: '30-day streak', icon: '⚡', accent: 'magenta', earned: (s) => s.streak >= 30 },
  { id: 'flame-46', name: 'Duolingo Energy', desc: '46-day streak (you know the one)', icon: '🦉', accent: 'lime', earned: (s) => s.streak >= 46 },
  { id: 'level-5', name: 'Engineer', desc: 'Reach level 5', icon: '⭐', accent: 'cyan', earned: (s) => s.level >= 5 },
  { id: 'level-10', name: 'Architect', desc: 'Reach level 10', icon: '🌟', accent: 'purple', earned: (s) => s.level >= 10 },
  { id: 'interview-ready', name: 'Interview Ready', desc: 'Finish the Interview Prep course', icon: '🎯', accent: 'lime', earned: (s) => s.interviewDone },
  { id: 'cortex-built', name: 'Cortex Built', desc: 'Finish the Cortex course', icon: '🧠', accent: 'cyan', earned: (s) => s.cortexDone },
  { id: 'exam-ready', name: 'Exam Ready', desc: 'Finish the Intermediate Exam Prep course', icon: '📜', accent: 'purple', earned: (s) => s.intermediateDone },
  { id: 'goal-hit', name: 'Daily Goal', desc: 'Hit your daily goal', icon: '✅', accent: 'green', earned: (s) => s.todayCount >= 1 },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b])) as Record<string, BadgeDef>

export function newlyEarnedBadges(s: ProgressSnapshot): Badge[] {
  const st = computeStats(s)
  return BADGES.filter((b) => b.earned(st) && !s.badges[b.id]).map(({ earned, ...rest }) => rest)
}
