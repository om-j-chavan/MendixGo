import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Badge } from '../types'
import { getActiveUserId, onSessionChange } from './session'
import {
  XP_LESSON,
  levelInfo,
  nextStreak,
  newlyEarnedBadges,
  todayStr,
  type ProgressSnapshot,
  type Streak,
} from '../lib/gamification'
import { newCard, review, type Grade, type SrsCard } from '../lib/srs'

export interface ActionResult {
  xpGained: number
  leveledFrom: number
  leveledTo: number
  newBadges: Badge[]
  firstTime: boolean
}

interface ProgressState extends ProgressSnapshot {
  srs: Record<string, SrsCard>
  sound: boolean
  hydrated: boolean

  completeLesson: (courseId: string, unitId: string, lessonId: string, correct: number, total: number) => ActionResult
  gradeCard: (exId: string, grade: Grade) => void
  setDailyGoal: (n: number) => void
  toggleSound: () => void
  resetProgress: () => void
}

const EMPTY: ProgressSnapshot & { srs: Record<string, SrsCard>; sound: boolean } = {
  xp: 0,
  streak: { count: 0, last: null } as Streak,
  doneLessons: {},
  badges: {},
  perDay: {},
  dailyGoal: 1,
  srs: {},
  sound: true,
}

function snap(s: ProgressState): ProgressSnapshot {
  return { xp: s.xp, streak: s.streak, doneLessons: s.doneLessons, badges: s.badges, perDay: s.perDay, dailyGoal: s.dailyGoal }
}

const KEY = 'mendixgo-progress-v1'
const nsKey = () => `${KEY}::${getActiveUserId()}`
const namespacedStorage = {
  getItem: () => localStorage.getItem(nsKey()),
  setItem: (_n: string, v: string) => localStorage.setItem(nsKey(), v),
  removeItem: () => localStorage.removeItem(nsKey()),
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...EMPTY,
      hydrated: false,

      completeLesson: (courseId, unitId, lessonId, correct, total) => {
        const s = get()
        const key = `${courseId}:${unitId}:${lessonId}`
        const from = levelInfo(s.xp).level
        const firstTime = !s.doneLessons[key]
        // XP: full base + accuracy bonus first time; small XP on replay
        const accuracyBonus = total > 0 ? Math.round((correct / total) * 10) : 0
        const xpGained = firstTime ? XP_LESSON + accuracyBonus : 5
        const xp = s.xp + xpGained
        const doneLessons = firstTime ? { ...s.doneLessons, [key]: true as const } : s.doneLessons
        const streak = nextStreak(s.streak)
        const today = todayStr()
        const perDay = { ...s.perDay, [today]: (s.perDay[today] ?? 0) + 1 }
        const draft: ProgressSnapshot = { xp, streak, doneLessons, badges: s.badges, perDay, dailyGoal: s.dailyGoal }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, doneLessons, streak, perDay, badges })
        return { xpGained, leveledFrom: from, leveledTo: to, newBadges, firstTime }
      },

      gradeCard: (exId, grade) => {
        const s = get()
        const prev = s.srs[exId] ?? newCard()
        set({ srs: { ...s.srs, [exId]: review(prev, grade) } })
      },

      setDailyGoal: (n) => set({ dailyGoal: Math.max(1, Math.min(10, Math.round(n))) }),

      toggleSound: () => set((s) => ({ sound: !s.sound })),

      resetProgress: () => set({ ...EMPTY, hydrated: true }),
    }),
    {
      name: KEY,
      storage: createJSONStorage(() => namespacedStorage),
      partialize: (s) => ({
        xp: s.xp,
        streak: s.streak,
        doneLessons: s.doneLessons,
        badges: s.badges,
        perDay: s.perDay,
        dailyGoal: s.dailyGoal,
        srs: s.srs,
        sound: s.sound,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true
      },
    },
  ),
)

// Load the correct account's namespace when the signed-in user changes.
onSessionChange(() => {
  const hasSaved = localStorage.getItem(nsKey()) != null
  if (hasSaved) void useProgress.persist.rehydrate()
  else useProgress.setState({ ...EMPTY, hydrated: true })
})

// keep the snapshot helper referenced (used by future selectors/tests)
export { snap as progressSnapshot }
