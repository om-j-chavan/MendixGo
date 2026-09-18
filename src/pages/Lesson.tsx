import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, Check, ArrowRight, RotateCcw, Flame, Eye } from 'lucide-react'
import { findLesson, exerciseId, COURSE_BY_ID, type Exercise } from '../data/courses'
import { useProgress, type ActionResult } from '../store/useProgress'
import type { Grade } from '../lib/srs'
import { bigCelebrate, burst } from '../lib/fx'
import { play } from '../lib/sound'
import { rankTitle } from '../lib/gamification'

const HEARTS = 5

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[a[k], a[j]] = [a[j], a[k]]
  }
  return a
}
type Sel = { side: 't' | 'd'; idx: number }

export default function Lesson() {
  const { courseId, unitId, lessonId } = useParams()
  const nav = useNavigate()
  const flat = findLesson(courseId ?? '', unitId ?? '', lessonId ?? '')
  const complete = useProgress((s) => s.completeLesson)
  const gradeCard = useProgress((s) => s.gradeCard)
  const sound = useProgress((s) => s.sound ?? false)

  const exercises = flat?.lesson.exercises ?? []
  const color = COURSE_BY_ID[courseId ?? '']?.color ?? '#58cc02'

  const [i, setI] = useState(0)
  const [hearts, setHearts] = useState(HEARTS)
  const [phase, setPhase] = useState<'run' | 'done' | 'dead'>('run')
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [result, setResult] = useState<ActionResult | null>(null)

  // per-exercise state
  const [selChoice, setSelChoice] = useState<number | null>(null)
  const [selMulti, setSelMulti] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [ok, setOk] = useState(false)
  const [matched, setMatched] = useState<number[]>([])
  const [sel, setSel] = useState<Sel | null>(null)
  const [wrong, setWrong] = useState<Sel[]>([])
  const [revealed, setRevealed] = useState(false)
  const [orderPick, setOrderPick] = useState<number[]>([]) // indices into shuffled order

  const ex = exercises[i]
  const defsOrder = useMemo(() => (ex?.kind === 'match' ? shuffle(ex.pairs.map((_, k) => k)) : []), [i, ex])
  const orderShuffled = useMemo(() => (ex?.kind === 'order' ? shuffle(ex.items.map((_, k) => k)) : []), [i, ex])

  useEffect(() => {
    setSelChoice(null); setSelMulti([]); setChecked(false); setOk(false)
    setMatched([]); setSel(null); setWrong([]); setRevealed(false); setOrderPick([])
  }, [i])

  if (!flat || exercises.length === 0) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="app-bg" /><div className="app-grid" />
        <div className="glass p-8 text-center">
          <p className="text-ink/70">This lesson has no content yet.</p>
          <button className="btn-primary mt-4" onClick={() => nav(-1)}>Go back</button>
        </div>
      </div>
    )
  }

  function restart() {
    setI(0); setHearts(HEARTS); setCombo(0); setBestCombo(0); setCorrect(0); setResult(null); setPhase('run')
  }
  function finish() {
    const res = complete(courseId!, unitId!, lessonId!, correct, exercises.length)
    setResult(res); bigCelebrate(); play('complete', sound); setPhase('done')
  }
  function markGood() { setCorrect((c) => c + 1); setCombo((c) => { const n = c + 1; setBestCombo((b) => Math.max(b, n)); return n }); play('correct', sound); burst() }
  function markBad() { setHearts((h) => h - 1); setCombo(0); play('wrong', sound) }

  function check() {
    let good = false
    if (ex.kind === 'choice') good = selChoice === ex.correct
    else if (ex.kind === 'multi') good = selMulti.length === ex.correct.length && selMulti.every((x) => ex.correct.includes(x))
    else if (ex.kind === 'order') good = orderPick.length === ex.items.length && orderPick.every((origIdx, pos) => origIdx === pos)
    setChecked(true); setOk(good)
    if (good) markGood(); else markBad()
  }
  function rateReveal(grade: Grade) {
    gradeCard(exerciseId(courseId!, unitId!, lessonId!, i), grade)
    setChecked(true); setOk(grade !== 'again')
    if (grade !== 'again') markGood(); // reveal never costs hearts; "again" just doesn't add combo
    else { setCombo(0) }
    setTimeout(cont, 0)
  }
  function cont() {
    if (hearts <= 0) { setPhase('dead'); play('wrong', sound); return }
    if (i + 1 < exercises.length) setI(i + 1)
    else finish()
  }

  // match interaction
  function tap(side: 't' | 'd', pairIdx: number) {
    if (checked || wrong.length || matched.includes(pairIdx)) return
    if (!sel) { setSel({ side, idx: pairIdx }); return }
    if (sel.side === side) { setSel({ side, idx: pairIdx }); return }
    if (sel.idx === pairIdx) {
      const nm = [...matched, pairIdx]
      setMatched(nm); setSel(null); play('correct', sound)
      if (ex.kind === 'match' && nm.length === ex.pairs.length) { setChecked(true); setOk(true); markGood() }
    } else {
      setWrong([sel, { side, idx: pairIdx }]); play('wrong', sound)
      setTimeout(() => { setWrong([]); setSel(null) }, 450)
    }
  }

  const canCheck = ex.kind === 'choice' ? selChoice !== null
    : ex.kind === 'multi' ? selMulti.length > 0
    : ex.kind === 'order' ? orderPick.length === ex.items.length
    : false
  const progress = ((i + (checked ? 1 : 0)) / exercises.length) * 100

  /* -------- DONE / DEAD -------- */
  if (phase === 'done' && result) {
    const leveled = result.leveledTo > result.leveledFrom
    return (
      <Shell>
        <div className="flex-1 grid place-items-center px-4">
          <motion.div className="glass p-8 text-center max-w-sm w-full" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ boxShadow: `0 0 44px ${color}44` }}>
            <div className="text-6xl mb-2 animate-floaty">🎉</div>
            <div className="font-display tracking-[0.3em] text-sm" style={{ color }}>LESSON COMPLETE</div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <Stat label="Accuracy" value={`${Math.round((correct / exercises.length) * 100)}%`} color={color} />
              <Stat label="Best combo" value={`${bestCombo}×`} color="#f59e0b" />
              <Stat label="XP" value={`+${result.xpGained}`} color="#1cb0f6" />
            </div>
            {leveled && <div className="mt-4 text-neon-purple font-semibold">⭐ Level up! You’re now a {rankTitle(result.leveledTo)}</div>}
            {result.newBadges.length > 0 && <div className="mt-3 text-sm text-ink/70">🏅 New badge: {result.newBadges.map((b) => b.name).join(', ')}</div>}
            <div className="flex gap-3 mt-6">
              <button className="btn-ghost flex-1" onClick={restart}><RotateCcw size={16} /> Again</button>
              <button className="btn-primary flex-1" onClick={() => nav(`/course/${courseId}`)}>Continue <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        </div>
      </Shell>
    )
  }
  if (phase === 'dead') {
    return (
      <Shell>
        <div className="flex-1 grid place-items-center px-4">
          <motion.div className="glass p-8 text-center max-w-sm w-full" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ boxShadow: '0 0 40px rgba(239,68,68,.3)' }}>
            <div className="text-6xl mb-2">💔</div>
            <div className="font-display tracking-[0.3em] text-sm text-neon-red">OUT OF HEARTS</div>
            <p className="text-ink/65 mt-3">So close! Give it another go — you’ve got this.</p>
            <div className="flex gap-3 mt-6">
              <button className="btn-ghost flex-1" onClick={() => nav(`/course/${courseId}`)}>Quit</button>
              <button className="btn-primary flex-1" onClick={restart}><RotateCcw size={16} /> Retry</button>
            </div>
          </motion.div>
        </div>
      </Shell>
    )
  }

  /* -------- RUN -------- */
  return (
    <Shell>
      <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto w-full">
        <button className="text-ink/50 hover:text-ink shrink-0" onClick={() => { if (i === 0 && !checked ? true : window.confirm('Quit this lesson? Progress in it will be lost.')) nav(`/course/${courseId}`) }} title="Quit"><X size={22} /></button>
        <div className="flex-1 h-3 rounded-full bg-black/10 overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${color},#1cb0f6)` }} animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: HEARTS }, (_, h) => <Heart key={h} size={18} className={h < hearts ? 'text-neon-red' : 'text-ink/15'} fill={h < hearts ? '#ef4444' : 'transparent'} />)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-44">
          <div className="flex items-center gap-2 mb-4">
            <span className="chip" style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}>{flat.unit.icon} {flat.unit.title}</span>
            {combo >= 2 && <span className="chip bg-neon-amber/15 text-neon-amber border border-neon-amber/30"><Flame size={12} /> {combo}× combo</span>}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
              {(ex.kind === 'choice' || ex.kind === 'multi') && (
                <>
                  <h2 className="font-display font-bold text-xl mb-1">{ex.q}</h2>
                  {ex.kind === 'multi' && <div className="text-xs text-neon-amber mb-3">Select all that apply</div>}
                  <div className="space-y-2.5 mt-3">
                    {ex.options.map((opt, oi) => {
                      const chosen = ex.kind === 'choice' ? selChoice === oi : selMulti.includes(oi)
                      const isCorrect = checked && (ex.kind === 'choice' ? oi === ex.correct : ex.correct.includes(oi))
                      const isWrongPick = checked && chosen && !isCorrect
                      let border = '#e5e5e5', bg = '#fafafa'
                      if (isCorrect) { border = '#58cc02'; bg = 'rgba(163,230,53,.14)' }
                      else if (isWrongPick) { border = '#ef4444'; bg = 'rgba(239,68,68,.14)' }
                      else if (chosen) { border = color; bg = `${color}18` }
                      return (
                        <button key={oi} disabled={checked}
                          onClick={() => { if (ex.kind === 'choice') setSelChoice(oi); else setSelMulti((m) => (m.includes(oi) ? m.filter((x) => x !== oi) : [...m, oi])) }}
                          className="w-full text-left rounded-2xl px-4 py-3.5 flex items-center gap-3 transition-all disabled:cursor-default" style={{ border: `2px solid ${border}`, background: bg }}>
                          <span className="grid place-items-center rounded-lg w-7 h-7 shrink-0 font-display font-bold text-sm" style={{ background: '#f2f2f2', color: isCorrect ? '#58cc02' : isWrongPick ? '#ef4444' : chosen ? color : '#9fb0d0' }}>
                            {isCorrect ? <Check size={15} /> : isWrongPick ? <X size={15} /> : String.fromCharCode(65 + oi)}
                          </span>
                          <span className="text-[15px] text-ink/85">{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {ex.kind === 'match' && (
                <>
                  <h2 className="font-display font-bold text-xl mb-4">{ex.prompt}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2.5">
                      {ex.pairs.map((p, pi) => <MatchChip key={pi} label={p.term} color={color} state={matched.includes(pi) ? 'done' : wrong.some((w) => w.side === 't' && w.idx === pi) ? 'wrong' : sel?.side === 't' && sel.idx === pi ? 'sel' : 'idle'} onClick={() => tap('t', pi)} />)}
                    </div>
                    <div className="space-y-2.5">
                      {defsOrder.map((pi) => <MatchChip key={pi} label={ex.pairs[pi].def} color={color} state={matched.includes(pi) ? 'done' : wrong.some((w) => w.side === 'd' && w.idx === pi) ? 'wrong' : sel?.side === 'd' && sel.idx === pi ? 'sel' : 'idle'} onClick={() => tap('d', pi)} />)}
                    </div>
                  </div>
                </>
              )}

              {ex.kind === 'order' && (
                <>
                  <h2 className="font-display font-bold text-xl mb-1">{ex.q}</h2>
                  <div className="text-xs text-ink/45 mb-3">Tap the steps in the correct order</div>
                  <div className="space-y-2 mb-4 min-h-[3rem]">
                    {orderPick.map((origIdx, pos) => {
                      const right = checked ? origIdx === pos : null
                      return (
                        <div key={pos} className="rounded-xl px-3 py-2.5 flex items-center gap-3 text-sm" style={{ border: `2px solid ${right === true ? '#58cc02' : right === false ? '#ef4444' : color}`, background: right === true ? 'rgba(163,230,53,.12)' : right === false ? 'rgba(239,68,68,.12)' : `${color}14` }}>
                          <span className="font-display font-bold" style={{ color }}>{pos + 1}</span>
                          <span className="text-ink/85">{ex.items[origIdx]}</span>
                        </div>
                      )
                    })}
                  </div>
                  {!checked && (
                    <div className="space-y-2">
                      {orderShuffled.filter((oi) => !orderPick.includes(oi)).map((oi) => (
                        <button key={oi} onClick={() => setOrderPick((p) => [...p, oi])} className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-ink/80 transition-all" style={{ border: '2px solid #e5e5e5', background: '#fafafa' }}>
                          {ex.items[oi]}
                        </button>
                      ))}
                      {orderPick.length > 0 && <button className="btn-ghost text-xs" onClick={() => setOrderPick([])}>Reset order</button>}
                    </div>
                  )}
                </>
              )}

              {ex.kind === 'reveal' && (
                <>
                  <div className="chip mb-3" style={{ background: `${color}18`, color, border: `1px solid ${color}44` }}>Interview question</div>
                  <h2 className="font-display font-bold text-xl mb-3">{ex.q}</h2>
                  {ex.hint && !revealed && <div className="text-sm text-ink/45 mb-4">💡 {ex.hint}</div>}
                  {!revealed ? (
                    <button className="btn-primary w-full !py-3" onClick={() => setRevealed(true)}><Eye size={17} /> Show model answer</button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 text-[15px] leading-relaxed text-ink/85 whitespace-pre-line" style={{ border: `1px solid ${color}44` }}>
                      {ex.answer}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* bottom bar */}
      <div className="fixed bottom-0 inset-x-0 border-t border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {ex.kind === 'reveal' ? (
            revealed ? (
              <div>
                <div className="text-center text-xs text-ink/45 mb-2">How well did you know it?</div>
                <div className="grid grid-cols-4 gap-2">
                  <RateBtn label="Again" color="#ef4444" onClick={() => rateReveal('again')} />
                  <RateBtn label="Hard" color="#f59e0b" onClick={() => rateReveal('hard')} />
                  <RateBtn label="Good" color="#1cb0f6" onClick={() => rateReveal('good')} />
                  <RateBtn label="Easy" color="#58cc02" onClick={() => rateReveal('easy')} />
                </div>
              </div>
            ) : <div className="text-center text-sm text-ink/45">Recall it in your head, then reveal the answer</div>
          ) : !checked ? (
            ex.kind !== 'match' ? (
              <button className="btn-primary w-full text-base !py-3 disabled:opacity-40 disabled:cursor-not-allowed" disabled={!canCheck} onClick={check}>Check</button>
            ) : <div className="text-center text-sm text-ink/45">Tap a term, then its matching meaning</div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2 font-display font-bold" style={{ color: ok ? '#58cc02' : '#f59e0b' }}>
                {ok ? <><Check size={18} /> {combo >= 3 ? 'On fire!' : 'Correct!'}</> : <><X size={18} /> Not quite</>}
              </div>
              {(ex.kind === 'choice' || ex.kind === 'multi' || ex.kind === 'order') && <div className="text-sm text-ink/70 mb-3">{ex.why}</div>}
              <button className="btn-primary w-full text-base !py-3" onClick={cont}>Continue <ArrowRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen flex flex-col relative"><div className="app-bg" /><div className="app-grid" />{children}</div>
}
function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return <div className="glass p-2.5"><div className="font-display font-black text-xl" style={{ color }}>{value}</div><div className="text-[10px] text-ink/50 uppercase tracking-wide">{label}</div></div>
}
function RateBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-xl py-2.5 text-sm font-semibold transition-all" style={{ border: `2px solid ${color}66`, background: `${color}18`, color }}>{label}</button>
}
function MatchChip({ label, state, color, onClick }: { label: string; state: 'idle' | 'sel' | 'done' | 'wrong'; color: string; onClick: () => void }) {
  let border = '#e5e5e5', bg = '#f7f7f7', text = '#4b4b4b'
  if (state === 'sel') { border = color; bg = `${color}22` }
  else if (state === 'done') { border = '#58cc02'; bg = 'rgba(163,230,53,.14)'; text = 'rgba(163,230,53,.6)' }
  else if (state === 'wrong') { border = '#ef4444'; bg = 'rgba(239,68,68,.16)' }
  return <button onClick={onClick} disabled={state === 'done'} className="w-full rounded-xl px-3 py-3 text-sm text-left transition-all disabled:cursor-default" style={{ border: `2px solid ${border}`, background: bg, color: text }}>{label}</button>
}
