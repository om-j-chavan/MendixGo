import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Star, Play } from 'lucide-react'
import { COURSE_BY_ID, courseSequence } from '../data/courses'
import { useProgress } from '../store/useProgress'

export default function Course() {
  const { courseId } = useParams()
  const nav = useNavigate()
  const course = COURSE_BY_ID[courseId ?? '']
  const doneLessons = useProgress((s) => s.doneLessons)

  if (!course) return <Navigate to="/" replace />

  const seq = courseSequence(course)
  const pos: Record<string, number> = {}
  seq.forEach((l, i) => (pos[l.key] = i))
  const done = seq.filter((l) => doneLessons[l.key]).length
  const isUnlocked = (key: string) => { const p = pos[key]; return p === 0 || !!doneLessons[seq[p - 1].key] }
  const current = seq.find((l) => isUnlocked(l.key) && !doneLessons[l.key])

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-ink/60 hover:text-ink text-sm mb-4"><ArrowLeft size={16} /> Home</Link>

      <header className="glass p-5 mb-6 relative overflow-hidden" style={{ boxShadow: `0 0 30px ${course.color}22` }}>
        <div className="absolute -right-8 -top-10 w-52 h-52 rounded-full blur-3xl" style={{ background: `radial-gradient(circle,${course.color}44,transparent 70%)` }} />
        <div className="relative flex items-center gap-4">
          <div className="text-4xl grid place-items-center rounded-2xl w-16 h-16 shrink-0" style={{ background: '#f7f7f7', border: `1px solid ${course.color}88` }}>{course.icon}</div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-black text-2xl" style={{ color: course.color }}>{course.title}</h1>
            <p className="text-ink/60 text-sm">{course.blurb}</p>
            <div className="mt-1 text-sm text-ink/55 tabular-nums">{done}/{seq.length} lessons</div>
          </div>
          {current && (
            <button className="btn-primary shrink-0 hidden sm:inline-flex" onClick={() => nav(`/lesson/${course.id}/${current.unitId}/${current.lessonId}`)}>
              <Play size={16} /> Continue
            </button>
          )}
        </div>
      </header>

      <div className="space-y-8">
        {course.units.map((unit) => (
          <section key={unit.id}>
            <div className="flex items-center gap-2 mb-3 justify-center text-center">
              <span className="text-xl">{unit.icon}</span>
              <h2 className="font-display font-bold" style={{ color: course.color }}>{unit.title}</h2>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute top-4 bottom-4 w-1 rounded-full bg-black/[0.06]" />
              {unit.lessons.map((lesson, i) => {
                const key = `${course.id}:${unit.id}:${lesson.id}`
                const isDone = !!doneLessons[key]
                const unlocked = isUnlocked(key)
                const isCurrent = current?.key === key
                const offset = [0, 44, 60, 44, 0, -44, -60, -44][i % 8]
                return (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                    disabled={!unlocked}
                    onClick={() => unlocked && nav(`/lesson/${course.id}/${unit.id}/${lesson.id}`)}
                    className="relative z-10 my-2 grid place-items-center rounded-full disabled:cursor-not-allowed group"
                    style={{
                      transform: `translateX(${offset}px)`, width: 64, height: 64,
                      background: isDone ? course.color : isCurrent ? '#ffffff' : '#f5f5f5',
                      border: `3px solid ${unlocked ? course.color : '#e5e5e5'}`,
                      boxShadow: isCurrent ? `0 0 24px ${course.color}88` : isDone ? `0 0 14px ${course.color}55` : 'none',
                      color: isDone ? '#05050c' : unlocked ? course.color : '#6b7280',
                    }}
                    title={lesson.title}
                  >
                    {isDone ? <Star size={26} fill="currentColor" /> : unlocked ? (isCurrent ? <Play size={24} /> : <span className="font-display font-black text-lg">{i + 1}</span>) : <Lock size={20} />}
                    {isCurrent && <span className="absolute -top-7 text-[10px] font-display font-bold px-2 py-0.5 rounded-full whitespace-nowrap animate-pulseGlow" style={{ background: course.color, color: '#05050c' }}>START</span>}
                    <span className="absolute -bottom-5 text-[10px] text-ink/40 whitespace-nowrap max-w-[120px] truncate">{lesson.title}</span>
                  </motion.button>
                )
              })}
            </div>
          </section>
        ))}
        <div className="text-center text-ink/40 text-sm pt-2">🏁 {seq.length} lessons in this course — keep the streak alive!</div>
      </div>
    </div>
  )
}
