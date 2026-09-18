import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import { useProgress } from '../store/useProgress'
import { todayStr } from '../lib/gamification'
import { useDailyReminder } from '../lib/pwa'

export default function AppShell() {
  const perDay = useProgress((s) => s.perDay)
  const dailyGoal = useProgress((s) => s.dailyGoal)
  useDailyReminder((perDay[todayStr()] ?? 0) >= dailyGoal)

  return (
    <div className="min-h-screen relative">
      <div className="app-bg" />
      <div className="app-grid" />
      <TopBar />
      <main className="max-w-3xl mx-auto px-4 pb-24 pt-4">
        <Outlet />
      </main>
    </div>
  )
}
