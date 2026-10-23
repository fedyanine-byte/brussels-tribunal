import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PresenterPage from './pages/PresenterPage'
import JoinPage from './pages/JoinPage'
import TeamPage from './pages/TeamPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<HomePage />} />
      <Route path="/presenter"  element={<PresenterPage />} />
      <Route path="/join"       element={<JoinPage />} />
      <Route path="/team/:code/:teamId" element={<TeamPage />} />
      <Route path="*"           element={<Navigate to="/" replace />} />
    </Routes>
  )
}
