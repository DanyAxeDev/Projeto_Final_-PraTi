import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LoggedInLayout from "./layouts/LoggedInLayout"
import LandingPage from "./pages/landing-page/LandingPage"
import HistoryPage from "./pages/adoption-page/HistoryPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import CuidadosEDicasPage from "./pages/cuidados-e-dicas/cuidadosEDicasPage"
import PetProfilePage, { type Pet } from "./pages/pet-profile/PetProfilePage";

// Exemplo de dados de um pet 
const ticoData: Pet = {
  name: "Tico",
  species: "Cachorro",
  gender: "Macho",
  age: "3 anos",
  size: "Médio porte",
  location: "Rio de Janeiro",
  isGoodWithPets: true,
  isGoodWithKids: true,
  about: "Este é um texto dinâmico sobre o Tico...",
  // URLs das imagens
  mainImageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Tico",
  thumbnailUrls: [
    "https://placehold.co/200x200/E2E8F0/4A5568?text=Foto+1",
    "https://placehold.co/200x200/CBD5E0/4A5568?text=Foto+2",
    "https://placehold.co/200x200/BEE3F8/4A5568?text=Foto+3",
  ]
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas com Header (branca) */}
        <Route element={<PublicLayout />}>
          <Route path="/adoption-page" element={<HistoryPage />} />
          <Route path="/cuidados-e-dicas" element={<CuidadosEDicasPage />} />
        </Route>

        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 


        {/* Rotas privadas (usuário logado) */}
        <Route element={<LoggedInLayout />}>
          <Route path="/home" />
          <Route path="/pet-profile" element={<PetProfilePage pet={ticoData} />} />
        </Route>
      </Routes>
    </Router>
  )
}