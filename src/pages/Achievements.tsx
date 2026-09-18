import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { BADGES } from '../lib/gamification'
import { useProgress } from '../store/useProgress'

const GLOW: Record<string, string> = {
  cyan: '#1cb0f6', blue: '#3b82f6', purple: '#a855f7', pink: '#ec4899',
  magenta: '#d946ef', lime: '#58cc02', green: '#22c55e', amber: '#f59e0b', red: '#ef4444',
}

export default function Achievements() {
  const owned = useProgress((s) => s.badges)
  const earnedCount = BADGES.filter((b) => owned[b.id]).length

  return (
    <div>
      <Link to="/" className="text-ink/60 hover:text-ink text-sm inline-flex items-center gap-1.5 mb-4"><ArrowLeft size={16} /> Home</Link>
      <header className="glass p-5 mb-6">
        <h1 className="font-display font-black text-2xl">🏆 Achievements</h1>
        <p className="text-ink/55 text-sm mt-1">{earnedCount} of {BADGES.length} unlocked</p>
        <div className="mt-3 h-2 rounded-full bg-black/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${(earnedCount / BADGES.length) * 100}%`, background: 'linear-gradient(90deg,#58cc02,#f59e0b)' }} />
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BADGES.map((b, i) => {
          const has = !!owned[b.id]
          const glow = GLOW[b.accent] ?? '#1cb0f6'
          return (
            <motion.div key={b.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
              className="glass p-4 text-center" style={{ boxShadow: has ? `0 0 22px ${glow}44` : 'none', opacity: has ? 1 : 0.5, border: has ? `1px solid ${glow}66` : '1px solid #eee' }}>
              <div className="text-4xl mb-1" style={{ filter: has ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
              <div className="font-display font-bold text-sm" style={{ color: has ? glow : '#9fb0d0' }}>{b.name}</div>
              <div className="text-[11px] text-ink/50 mt-0.5">{b.desc}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
