import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { hashPassword, makeId } from '../lib/hash'
import { setActiveUser } from './session'

export interface Account {
  id: string
  name: string
  email: string
  passHash: string
  createdAt: number
}

interface AuthState {
  users: Record<string, Account>
  currentUserId: string | null
  error: string | null
  busy: boolean
  hydrated: boolean
  signup: (name: string, email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

const EMAIL_RE = /^\S+@\S+\.\S+$/

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: {},
      currentUserId: null,
      error: null,
      busy: false,
      hydrated: false,

      signup: async (name, email, password) => {
        const n = name.trim()
        const e = email.trim().toLowerCase()
        if (!n) return (set({ error: 'Please enter your name' }), false)
        if (!EMAIL_RE.test(e)) return (set({ error: 'Please enter a valid email address' }), false)
        if (password.length < 1) return (set({ error: 'Password must be at least 1 character' }), false)
        if (Object.values(get().users).some((u) => u.email === e))
          return (set({ error: 'An account with this email already exists' }), false)

        set({ busy: true, error: null })
        const id = makeId()
        const passHash = await hashPassword(password, id)
        const user: Account = { id, name: n, email: e, passHash, createdAt: Date.now() }
        set((s) => ({ users: { ...s.users, [id]: user }, currentUserId: id, busy: false, error: null }))
        setActiveUser(id)
        return true
      },

      login: async (email, password) => {
        const e = email.trim().toLowerCase()
        const user = Object.values(get().users).find((u) => u.email === e)
        if (!user) return (set({ error: 'No account found with that email' }), false)
        set({ busy: true, error: null })
        const passHash = await hashPassword(password, user.id)
        if (passHash !== user.passHash) {
          set({ busy: false, error: 'Incorrect password' })
          return false
        }
        set({ currentUserId: user.id, busy: false, error: null })
        setActiveUser(user.id)
        return true
      },

      logout: () => {
        set({ currentUserId: null, error: null })
        setActiveUser(null)
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'mendixgo-auth-v1',
      partialize: (s) => ({ users: s.users, currentUserId: s.currentUserId }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true
          setActiveUser(state.currentUserId ?? null)
        }
      },
    },
  ),
)

export function useCurrentUser(): Account | null {
  return useAuth((s) => (s.currentUserId ? s.users[s.currentUserId] ?? null : null))
}
