import { useState } from 'react'
import { Download, Bell, BellOff, Smartphone } from 'lucide-react'
import { useInstallPrompt, reminderPrefs, setReminder, requestNotifPermission, notifySupported } from '../lib/pwa'

export default function PwaCard() {
  const { canInstall, installed, promptInstall } = useInstallPrompt()
  const initial = reminderPrefs()
  const [on, setOn] = useState(initial.on)
  const [time, setTime] = useState(initial.time)
  const [msg, setMsg] = useState<string | null>(null)

  async function toggle() {
    if (!on) {
      const ok = await requestNotifPermission()
      if (!ok) { setMsg('Notifications are blocked in your browser settings.'); return }
      setReminder(true, time); setOn(true); setMsg('Daily reminder on. Keep MendixGo installed for best results.')
    } else {
      setReminder(false, time); setOn(false); setMsg(null)
    }
  }
  function changeTime(t: string) { setTime(t); setReminder(on, t) }

  if (installed && !notifySupported()) return null

  return (
    <div className="glass p-4">
      <div className="flex items-center gap-3">
        <div className="grid place-items-center rounded-xl w-10 h-10 shrink-0" style={{ background: 'rgba(163,230,53,.12)', border: '1px solid rgba(163,230,53,.35)' }}><Smartphone size={18} className="text-duo-green" /></div>
        <div className="flex-1">
          <div className="font-semibold text-sm">Make it a habit</div>
          <div className="text-ink/50 text-xs">Install the app and get a daily nudge.</div>
        </div>
        {canInstall && (
          <button className="btn-primary !py-2 !px-3 text-sm" onClick={promptInstall}><Download size={15} /> Install</button>
        )}
        {installed && <span className="chip bg-neon-lime/15 text-duo-green border border-neon-lime/30 text-xs">Installed ✓</span>}
      </div>

      {notifySupported() && (
        <div className="mt-3 flex items-center gap-3 border-t border-black/8 pt-3">
          <button className="btn-ghost !py-2 text-sm" onClick={toggle}>
            {on ? <><Bell size={15} className="text-duo-green" /> Reminder on</> : <><BellOff size={15} /> Daily reminder</>}
          </button>
          {on && <input type="time" value={time} onChange={(e) => changeTime(e.target.value)} className="auth-input !py-1.5 !px-2 text-sm w-auto" />}
        </div>
      )}
      {msg && <div className="text-xs text-ink/55 mt-2">{msg}</div>}
    </div>
  )
}
