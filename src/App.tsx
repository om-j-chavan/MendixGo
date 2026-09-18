import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import AppShell from './components/AppShell'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Review from './pages/Review'
import Achievements from './pages/Achievements'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />

      <Route element={<RequireAuth><AppShell /></RequireAuth>}>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/review" element={<Review />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>

      {/* full-screen lesson runner (outside the shell) */}
      <Route path="/lesson/:courseId/:unitId/:lessonId" element={<RequireAuth><Lesson /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
