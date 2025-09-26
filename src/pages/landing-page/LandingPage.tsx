import { useNavigate } from "react-router"
import PublicHeader from "@/components/PublicHeader"
import RoundButton from "@/components/RoundButton"
import AdoptionStorySection from "./components/AdoptionStorySection"
import SocialIcon from "../../components/SocialIcon"
import { RiInstagramFill } from "react-icons/ri"
import { FaFacebookSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <PublicHeader bg={false} />
      <main className="bg-sand min-h-screen h-full pt-20">
        <div 
        id="landing-page"
        className="h-screen min-h-full bg-cover bg-bottom bg-no-repeat"
        >
          <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-8 h-full py-12 px-4 font-raleway sm:px-8">
            <section className="flex flex-col items-center gap-6 text-center">
              <h1 className="font-tilt text-brown text-5xl max-w-[790px] sm:text-6xl">
                Conectando o fio <span className="text-blue">azul</span> entre pets e seus humanos
              </h1>
              <p className="text-xl font-semibold mt-2 max-w-[900px] sm:text-[22px]">
                Doe e adote no PetConect, onde facilitamos a conexão entre pessoas e pets que foram feitos um para o outro.
              </p>

              <div className="flex gap-6 mt-8 sm:gap-9">
                <RoundButton 
                text="Cadastre-se" 
                color="blue" 
                onClick={() => navigate("/cadastro")} 
                />
                <RoundButton 
                text="Entrar" 
                color="brown" 
                onClick={() => navigate("/login")} 
                />
              </div>
            </section>

            <section className="flex flex-col items-center justify-between gap-10 sm:flex-row sm:items-end">
              <AdoptionStorySection />

              <div className="flex items-center gap-3">
                <SocialIcon icon={<RiInstagramFill />} url="" />
                <SocialIcon icon={<FaFacebookSquare />} url="" />
                <SocialIcon icon={<FaSquareXTwitter />} url="" />
              </div>
            </section>      
          </section> 
        </div>
      </main>
    </>
  )
}

export default LandingPage
