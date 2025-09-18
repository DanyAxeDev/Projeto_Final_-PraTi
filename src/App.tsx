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
import FavoritesPage from "./pages/favorites/FavoritesPage"
import MyPetsPage from "./pages/my-pets/MyPetsPage"
import PetRegisterPage from "./pages/pet-register/PetRegisterPage"
import MyAccountPage from "./pages/my-account/MyAccountPage"
import TeamPage from "./pages/teams/TeamPage"

import { Toaster } from "sonner"

export default function App() {
  return (
    <Router>
      {/* Componente para utilizar notificações toast */}
      <Toaster position="top-right" richColors />
      
      <Routes>
        {/* Rotas públicas com Header (branca) */}
        <Route element={<PublicLayout />}>
          <Route path="/historias-de-adocao" element={<HistoryPage />} />
          <Route path="/cuidados-e-dicas" element={<CuidadosEDicasPage />} />
          <Route path="/sobre" /* Elemento */ />
          <Route path="/nosso-time" element={<TeamPage/>} />
        </Route>

        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        {/* Rotas privadas (usuário logado) */}
        <Route element={<LoggedInLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pet/:id" element={<PetProfilePage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/meus-pets" element={<MyPetsPage />} />
          <Route path="/cadastro-de-pet" element={<PetRegisterPage />} />
          <Route path="/minha-conta" element={<MyAccountPage />} />
        </Route>
      </Routes>
    </Router>
  )
}