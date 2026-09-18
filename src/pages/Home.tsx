import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, ChevronRight, RotateCcw, Minus, Plus } from 'lucide-react'
import { COURSES, courseLessonCount } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { useCurrentUser } from '../store/useAuth'
import { courseDoneCount, streakAlive, todayStr } from '../lib/gamification'
import { isDue } from '../lib/srs'
import ProgressRing from '../components/ProgressRing'
import PwaCard from '../components/PwaCard'

export default function Home() {
  const user = useCurrentUser()
  const doneLessons = useProgress((s) => s.doneLessons)
  const streak = useProgress((s) => s.streak)
  const perDay = useProgress((s) => s.perDay)
  const dailyGoal = useProgress((s) => s.dailyGoal)
  const srs = useProgress((s) => s.srs)
  const setDailyGoal = useProgress((s) => s.setDailyGoal)

  const today = perDay[todayStr()] ?? 0
  const goalPct = Math.min(1, today / dailyGoal)
  const dueCount = Object.values(srs).filter((c) => isDue(c)).length
  const alive = streakAlive(streak)

  return (
    <div className="space-y-6">
      {/* hero: streak + daily goal */}
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass p-5" style={{ boxShadow: '0 0 30px rgba(245,158,11,.14)' }}>
        <div className="flex items-center gap-4">
          <div className="relative grid place-items-center">
            <ProgressRing pct={goalPct} size={78} stroke={8} color="#58cc02" />
            <div className="absolute text-center">
              <div className="font-display font-black text-lg tabular-nums">{today}/{dailyGoal}</div>
              <div className="text-[9px] text-ink/50 uppercase tracking-wide">today</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-ink/60 text-sm">{greeting()}, {user?.name?.split(' ')[0] ?? 'there'}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <Flame size={22} className={alive ? 'text-neon-amber' : 'text-ink/30'} fill={alive ? '#f59e0b' : 'transparent'} />
              <span className="font-display font-black text-2xl tabular-nums">{streak.count}</span>
              <span className="text-ink/60">day streak</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="text-ink/45">Daily goal</span>
              <button className="btn-ghost !p-1" onClick={() => setDailyGoal(dailyGoal - 1)}><Minus size={13} /></button>
              <span className="tabular-nums font-semibold w-4 text-center">{dailyGoal}</span>
              <button className="btn-ghost !p-1" onClick={() => setDailyGoal(dailyGoal + 1)}><Plus size={13} /></button>
            </div>
          </div>
        </div>
        {today >= dailyGoal && dailyGoal > 0 && (
          <div className="mt-3 text-sm text-duo-green">✅ Daily goal hit — streak secured. Anything more is bonus XP.</div>
        )}
      </motion.section>

      {/* review due */}
      {dueCount > 0 && (
        <Link to="/review" className="glass card-hover p-4 flex items-center gap-3" style={{ boxShadow: '0 0 22px rgba(34,211,238,.16)' }}>
          <div className="grid place-items-center rounded-xl w-11 h-11 text-xl" style={{ background: 'rgba(34,211,238,.14)', border: '1px solid rgba(34,211,238,.4)' }}><RotateCcw size={20} className="text-neon-cyan" /></div>
          <div className="flex-1">
            <div className="font-semibold">Review is ready</div>
            <div className="text-ink/55 text-sm">{dueCount} card{dueCount > 1 ? 's' : ''} due for spaced repetition</div>
          </div>
          <ChevronRight className="text-ink/40" />
        </Link>
      )}

      {/* courses */}
      <div>
        <h2 className="font-display font-bold text-ink/80 mb-3 px-1">Courses</h2>
        <div className="space-y-3">
          {COURSES.map((c, i) => {
            const total = courseLessonCount(c)
            const done = courseDoneCount(c.id, doneLessons)
            const pct = total ? done / total : 0
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={`/course/${c.id}`} className="glass card-hover p-4 flex items-center gap-4" style={{ boxShadow: `0 0 24px ${c.color}22` }}>
                  <div className="grid place-items-center rounded-2xl w-14 h-14 text-3xl shrink-0" style={{ background: '#f7f7f7', border: `1px solid ${c.color}66` }}>{c.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-lg" style={{ color: c.color }}>{c.title}</div>
                    <div className="text-ink/55 text-sm truncate">{c.subtitle}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-black/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.round(pct * 100)}%`, background: c.color }} />
                      </div>
                      <span className="text-xs text-ink/50 tabular-nums shrink-0">{done}/{total}</span>
                    </div>
                  </div>
                  <ChevronRight className="text-ink/40 shrink-0" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      <PwaCard />
    </div>
  )
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
