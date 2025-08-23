import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LoggedInLayout from "./layouts/LoggedInLayout"
import LandingPage from "./pages/landing-page/LandingPage"
import LoginPage from "./pages/login/LoginPage"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com Header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas (usuário logado) */}
        <Route element={<LoggedInLayout />}>
          <Route path="/home" />
        </Route>
      </Routes>
    </Router>
  )
}