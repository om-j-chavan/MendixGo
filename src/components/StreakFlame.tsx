import { useProgress } from '../store/useProgress'
import { streakAlive } from '../lib/gamification'

export default function StreakFlame({ compact = false }: { compact?: boolean }) {
  const streak = useProgress((s) => s.streak)
  const alive = streakAlive(streak)
  const count = streak.count
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border"
      style={{
        borderColor: alive && count > 0 ? 'rgba(245,158,11,.5)' : '#e8e8e8',
        background: alive && count > 0 ? 'rgba(245,158,11,.12)' : '#f7f7f7',
        boxShadow: alive && count > 0 ? '0 0 18px rgba(245,158,11,.35)' : 'none',
      }}
      title={
        count > 0
          ? alive
            ? `You're on a ${count}-day streak — keep it alive!`
            : `Your ${count}-day streak lapsed. Study today to start again!`
          : 'Study today to start a streak!'
      }
    >
      <span
        className={alive && count > 0 ? 'text-lg animate-flamewiggle' : 'text-lg grayscale opacity-50'}
        style={{ display: 'inline-block' }}
      >
        🔥
      </span>
      <span className="font-display font-bold tabular-nums" style={{ color: alive && count > 0 ? '#f59e0b' : '#94a3b8' }}>
        {count}
      </span>
      {!compact && <span className="text-xs text-ink/50 font-semibold">day{count === 1 ? '' : 's'}</span>}
    </div>
  )
}
