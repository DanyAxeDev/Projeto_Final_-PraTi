import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LoggedInLayout from "./layouts/LoggedInLayout"
import LandingPage from "./pages/landing-page/LandingPage"
import HistoryPage from "./pages/adoption-page/HistoryPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import CuidadosEDicasPage from "./pages/cuidados-e-dicas/cuidadosEDicasPage"
import PetProfilePage from "./pages/pet-profile/PetProfilePage";
import Home from "./pages/home/Home"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com Header (branca) */}
        <Route element={<PublicLayout />}>
          <Route path="/historias-de-adocao" element={<HistoryPage />} />
          <Route path="/cuidados-e-dicas" element={<CuidadosEDicasPage />} />
          <Route path="/sobre" /* Elemento */ />
        </Route>

        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        {/* Rotas privadas (usuário logado) */}
        <Route element={<LoggedInLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pet-profile" element={<PetProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}