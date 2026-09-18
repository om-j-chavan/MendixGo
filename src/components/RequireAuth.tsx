import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const authed = useAuth((s) => !!s.currentUserId)
  const loc = useLocation()
  if (!authed) return <Navigate to="/login" state={{ from: loc.pathname }} replace />
  return <>{children}</>
}
