import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LoggedInLayout from "./layouts/LoggedInLayout"
import LandingPage from "./pages/landing-page/LandingPage"
import HistoryPage from "./pages/adoption-page/HistoryPage"
import LoginPage from "./pages/login/LoginPage"
import CuidadosEDicasPage from "./pages/cuidados-e-dicas/cuidadosEDicasPage"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com Header (branca) */}
        <Route element={<PublicLayout />}>
          <Route path="/adoption-page" element={<HistoryPage />} />
          <Route path="/cuidados-e-dicas" element={<CuidadosEDicasPage/>} />
          
        </Route>

        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas (usuário logado) */}
        <Route element={<LoggedInLayout />}>
          <Route path="/home" />
        </Route>
      </Routes>
    </Router>
  )
}