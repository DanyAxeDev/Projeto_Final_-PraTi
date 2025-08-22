import { Link } from "react-router";
import RoundButton from "@/components/RoundButton"
import AdoptionStorySection from "./components/AdoptionStorySection"
import SocialIcon from "./components/SocialIcon"
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

function LandingPage() {
  return (
    <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-8 h-full py-12 px-8">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-6xl max-w-[790px]">
          Conectando o fio azul entre pets e seus humanos
        </h1>
        <p className="text-2xl font-semibold mt-2">
          Textinho explicando sobre a plataforma e tudo mais de pelo menos duas linhas pra ficar mais bonitinho.
        </p>
        <Link to="#" className="text-lg font-semibold hover:underline">
          Saiba mais
        </Link>

        <div className="flex gap-9 mt-8">
          <RoundButton text="Cadastre-se" />
         <Link to="/login">
            <RoundButton text="Entrar" />
          </Link>
        </div>
      </section>

      <section className="flex justify-between">
        <AdoptionStorySection />

        <div className="flex items-center gap-4">
          <SocialIcon icon={<RiInstagramFill />} url="" />
          <SocialIcon icon={<FaFacebookSquare />} url="" />
          <SocialIcon icon={<FaSquareXTwitter />} url="" />
        </div>
      </section>      
    </section> 
  )
}

export default LandingPage
