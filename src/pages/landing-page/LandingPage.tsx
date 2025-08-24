import { useNavigate } from "react-router"
import RoundButton from "@/components/RoundButton"
import AdoptionStorySection from "./components/AdoptionStorySection"
import SocialIcon from "./components/SocialIcon"
import { RiInstagramFill } from "react-icons/ri"
import { FaFacebookSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div 
    style={{ backgroundImage: "url('/backgrounds/landing-page-bg-desktop.png')" }}
    className="h-screen bg-cover bg-bottom"
    >
      <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-8 h-full py-12 px-8 font-raleway">
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-tilt text-brown text-6xl max-w-[790px]">
            Conectando o fio <span className="text-blue">azul</span> entre pets e seus humanos
          </h1>
          <p className="text-2xl font-semibold mt-2 max-w-[900px]">
            Textinho explicando sobre a plataforma e tudo mais de pelo menos duas linhas pra ficar mais bonitinho.
          </p>

          <div className="flex gap-9 mt-8">
            <RoundButton 
            text="Cadastre-se" 
            color="blue" 
            onClick={() => navigate("")} 
            />
            <RoundButton 
            text="Entrar" 
            color="brown" 
            onClick={() => navigate("/login")} 
            />
          </div>
        </section>

        <section className="flex justify-between">
          <AdoptionStorySection />

          <div className="flex items-center gap-3">
            <SocialIcon icon={<RiInstagramFill />} url="" />
            <SocialIcon icon={<FaFacebookSquare />} url="" />
            <SocialIcon icon={<FaSquareXTwitter />} url="" />
          </div>
        </section>      
      </section> 
    </div>
  )
}

export default LandingPage
