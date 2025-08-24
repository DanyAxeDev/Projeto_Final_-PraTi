import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LoggedInLayout from "./layouts/LoggedInLayout"
import LandingPage from "./pages/landing-page/LandingPage"
<<<<<<< HEAD
import HistoryPage from "./pages/adoption-page/HistoryPage"

=======
import LoginPage from "./pages/login/LoginPage"
>>>>>>> e5dd7bd3441a1ca2b04c8afbd86c9f0e70813acb

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com Header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/adoption-page" element={<HistoryPage />} />
          
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