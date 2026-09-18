import { useEffect, useRef, useState } from 'react'

/* ------------------------------- install ------------------------------- */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: BeforeInstallPromptEvent | null = null
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferred = e as BeforeInstallPromptEvent
})

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(!!deferred)
  useEffect(() => {
    const onAvail = () => setCanInstall(true)
    const onInstalled = () => { deferred = null; setCanInstall(false) }
    window.addEventListener('beforeinstallprompt', onAvail)
    window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('beforeinstallprompt', onAvail); window.removeEventListener('appinstalled', onInstalled) }
  }, [])
  async function promptInstall() {
    if (!deferred) return false
    await deferred.prompt()
    const { outcome } = await deferred.userChoice
    if (outcome === 'accepted') { deferred = null; setCanInstall(false) }
    return outcome === 'accepted'
  }
  const installed = window.matchMedia?.('(display-mode: standalone)').matches
  return { canInstall: canInstall && !installed, installed, promptInstall }
}

/* ---------------------------- notifications ---------------------------- */
const R_ON = 'mendixgo-reminder-on'
const R_TIME = 'mendixgo-reminder-time'
const R_LAST = 'mendixgo-reminder-last' // yyyy-mm-dd we last notified

export function reminderPrefs() {
  return {
    on: localStorage.getItem(R_ON) === '1',
    time: localStorage.getItem(R_TIME) || '19:00',
  }
}
export function setReminder(on: boolean, time: string) {
  localStorage.setItem(R_ON, on ? '1' : '0')
  localStorage.setItem(R_TIME, time)
}
export async function requestNotifPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const p = await Notification.requestPermission()
  return p === 'granted'
}
export function notifySupported() {
  return 'Notification' in window
}
function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function fire() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  try {
    new Notification('MendixGo — keep your streak 🔥', {
      body: "You haven't hit today's goal yet. A quick lesson keeps the streak alive!",
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'mendixgo-daily',
    })
    localStorage.setItem(R_LAST, today())
  } catch { /* ignore */ }
}

/**
 * In-app daily reminder: while MendixGo is open (a tab or the installed PWA),
 * fire a local notification at the chosen time if the goal isn't met yet and we
 * haven't already reminded today. (Full closed-app push is a future server phase.)
 */
export function useDailyReminder(goalMet: boolean) {
  const timer = useRef<number | null>(null)
  useEffect(() => {
    function check() {
      const { on, time } = reminderPrefs()
      if (!on || goalMet) return
      if (localStorage.getItem(R_LAST) === today()) return
      const [h, m] = time.split(':').map(Number)
      const now = new Date()
      if (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m)) fire()
    }
    check()
    timer.current = window.setInterval(check, 60_000)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [goalMet])
}
