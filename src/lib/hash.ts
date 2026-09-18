// Lightweight password hashing for the local, client-side account system.
// NOTE: this is a personal learning app with no server; accounts and their
// (salted, SHA-256 hashed) passwords live only in this browser. It is not a
// substitute for real server-side authentication.

export async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}::${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  // fallback
  return 'u_' + Math.abs(Date.now() ^ (Math.floor(performance.now() * 1000))).toString(36)
}
