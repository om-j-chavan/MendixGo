import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Trophy } from 'lucide-react'
import { useAuth, useCurrentUser } from '../store/useAuth'
import { useProgress } from '../store/useProgress'
import { levelInfo, streakAlive } from '../lib/gamification'

export default function TopBar() {
  const nav = useNavigate()
  const user = useCurrentUser()
  const logout = useAuth((s) => s.logout)
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const lvl = levelInfo(xp)
  const alive = streakAlive(streak)

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/90 border-b border-black/10">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-display font-black text-lg">
          <span className="text-xl">⚡</span> Mendix<span className="text-duo-green">Go</span>
        </Link>
        <div className="flex-1" />

        {/* streak */}
        <div className="chip" title={`${streak.count}-day streak`} style={{ background: alive ? 'rgba(245,158,11,.14)' : '#f5f5f5', border: `1px solid ${alive ? 'rgba(245,158,11,.4)' : '#e8e8e8'}`, color: alive ? '#f59e0b' : '#9fb0d0' }}>
          <span>{alive ? '🔥' : '🕯️'}</span> <span className="tabular-nums font-bold">{streak.count}</span>
        </div>

        {/* level / xp */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="chip" style={{ background: 'rgba(163,230,53,.12)', border: '1px solid rgba(163,230,53,.35)', color: '#58cc02' }}>
            Lv {lvl.level}
          </div>
          <div className="w-20 h-2 rounded-full bg-black/10 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${Math.round(lvl.pct * 100)}%`, background: 'linear-gradient(90deg,#58cc02,#1cb0f6)' }} />
          </div>
        </div>

        <Link to="/achievements" className="btn-ghost !px-2.5 !py-2" title="Achievements"><Trophy size={16} /></Link>

        {user && (
          <button className="btn-ghost !px-2.5 !py-2" title={`${user.name} — sign out`} onClick={() => { logout(); nav('/login', { replace: true }) }}>
            <span className="grid place-items-center rounded-full w-6 h-6 text-[11px] font-bold" style={{ background: 'rgba(163,230,53,.2)', color: '#58cc02' }}>{user.name.slice(0, 1).toUpperCase()}</span>
            <LogOut size={14} className="ml-1" />
          </button>
        )}
      </div>
    </header>
  )
}
