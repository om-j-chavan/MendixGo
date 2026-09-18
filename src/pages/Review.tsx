import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, RotateCcw, PartyPopper } from 'lucide-react'
import { COURSES, exerciseId } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { isDue, type Grade } from '../lib/srs'

interface DueCard { exId: string; q: string; answer: string; hint?: string; color: string; course: string }

export default function Review() {
  const srs = useProgress((s) => s.srs)
  const gradeCard = useProgress((s) => s.gradeCard)

  // snapshot the due queue once when the page mounts (grading mutates srs)
  const [queue] = useState<DueCard[]>(() => {
    const out: DueCard[] = []
    for (const c of COURSES) {
      for (const u of c.units) {
        for (const l of u.lessons) {
          l.exercises.forEach((e, idx) => {
            if (e.kind !== 'reveal') return
            const exId = exerciseId(c.id, u.id, l.id, idx)
            if (isDue(srs[exId])) out.push({ exId, q: e.q, answer: e.answer, hint: e.hint, color: c.color, course: c.title })
          })
        }
      }
    }
    return shuffle(out)
  })

  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(0)
  const card = queue[i]

  function rate(g: Grade) {
    gradeCard(card.exId, g)
    setDone((d) => d + 1)
    setRevealed(false)
    setI((n) => n + 1)
  }

  if (queue.length === 0) {
    return (
      <Empty title="Nothing due right now" body="You’re all caught up on spaced repetition. Finish more lessons to build the review deck." />
    )
  }
  if (!card) {
    return (
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 text-center" style={{ boxShadow: '0 0 40px rgba(34,211,238,.2)' }}>
          <PartyPopper className="mx-auto text-neon-cyan" size={40} />
          <div className="font-display font-black text-2xl mt-3">Review done!</div>
          <p className="text-ink/60 mt-1">You reviewed {done} card{done > 1 ? 's' : ''}. They’ll come back at the right time.</p>
          <Link to="/" className="btn-primary mt-6 inline-flex">Back home</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="text-ink/60 hover:text-ink text-sm inline-flex items-center gap-1.5"><ArrowLeft size={16} /> Home</Link>
        <div className="flex-1 h-2.5 rounded-full bg-black/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${(i / queue.length) * 100}%`, background: 'linear-gradient(90deg,#1cb0f6,#58cc02)' }} />
        </div>
        <span className="text-xs text-ink/50 tabular-nums">{i}/{queue.length}</span>
      </div>

      <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-5" style={{ boxShadow: `0 0 26px ${card.color}22` }}>
        <div className="chip mb-3" style={{ background: `${card.color}18`, color: card.color, border: `1px solid ${card.color}44` }}>{card.course}</div>
        <h2 className="font-display font-bold text-xl mb-3">{card.q}</h2>
        {card.hint && !revealed && <div className="text-sm text-ink/45 mb-4">💡 {card.hint}</div>}
        {!revealed ? (
          <button className="btn-primary w-full !py-3" onClick={() => setRevealed(true)}><Eye size={17} /> Show answer</button>
        ) : (
          <>
            <div className="glass p-4 text-[15px] leading-relaxed text-ink/85 whitespace-pre-line mb-4" style={{ border: `1px solid ${card.color}44` }}>{card.answer}</div>
            <div className="text-center text-xs text-ink/45 mb-2">How well did you know it?</div>
            <div className="grid grid-cols-4 gap-2">
              <Rate label="Again" color="#ef4444" onClick={() => rate('again')} />
              <Rate label="Hard" color="#f59e0b" onClick={() => rate('hard')} />
              <Rate label="Good" color="#1cb0f6" onClick={() => rate('good')} />
              <Rate label="Easy" color="#58cc02" onClick={() => rate('easy')} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

function Rate({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-xl py-2.5 text-sm font-semibold transition-all" style={{ border: `2px solid ${color}66`, background: `${color}18`, color }}>{label}</button>
}
function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="text-ink/60 hover:text-ink text-sm inline-flex items-center gap-1.5 mb-4"><ArrowLeft size={16} /> Home</Link>
      <div className="glass p-8 text-center">
        <RotateCcw className="mx-auto text-ink/40" size={36} />
        <div className="font-display font-bold text-xl mt-3">{title}</div>
        <p className="text-ink/55 mt-1">{body}</p>
      </div>
    </div>
  )
}
function shuffle<T>(a: T[]): T[] { const b = a.slice(); for (let k = b.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1));[b[k], b[j]] = [b[j], b[k]] } return b }
