// Tracks which account is "active" so the progress store can namespace its
// localStorage per user (multi-tenant isolation). Kept dependency-free to avoid
// circular imports between useAuth and useProgress.

let activeUserId = 'guest'
type Listener = () => void
const listeners = new Set<Listener>()

export function getActiveUserId(): string {
  return activeUserId
}

export function setActiveUser(id: string | null): void {
  const next = id ?? 'guest'
  if (next === activeUserId) return
  activeUserId = next
  listeners.forEach((l) => l())
}

export function onSessionChange(l: Listener): () => void {
  listeners.add(l)
  return () => listeners.delete(l)
}
