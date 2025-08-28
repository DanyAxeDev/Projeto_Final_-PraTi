import { Link } from "react-router"
import SocialIcon from "./SocialIcon"
import { RiInstagramFill } from "react-icons/ri"
import { FaFacebookSquare } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

function Footer() {
  return (
    <footer className="bg-blue">
      <section className="max-w-[1100px] mx-auto flex flex-col gap-12 py-12 px-8 text-sand font-raleway font-semibold">
        <section className="flex justify-between">
          <div className="flex flex-col">
            <span>Logo</span>
            <div className="flex items-center gap-3">
              <SocialIcon icon={<RiInstagramFill />} url="" color="sand" />
              <SocialIcon icon={<FaFacebookSquare />} url="" color="sand" />
              <SocialIcon icon={<FaSquareXTwitter />} url="" color="sand" />
            </div>
          </div>
          
          <div className="flex gap-10">
            <section>
              <h4 className="text-xl font-bold mb-1">Entre em contato</h4>
              <ul>
                <li>(00) 0000-0000</li>
                <li>petconect@email.com</li>
                <li>Rua Pet, 123</li>
              </ul>
            </section>
            <section>
              <h4 className="text-xl font-bold mb-1">Geral</h4>
              <ul>
                <li><Link to="#" className="hover:text-white hover:underline">FAQ</Link></li>
                <li><Link to="#" className="hover:text-white hover:underline">Nosso time</Link></li>
              </ul>
            </section>
          </div>
        </section>
        
        <hr className="w-[95%] self-center border-b-1 border-b-sand" />

        <div className="flex justify-between items-center">
          <p>© 2025 PetConect. Todos os direitos reservados.</p>
          <p>Um projeto <Link to="https://www.maisprati.com.br/" className="hover:text-white hover:underline">+praTi</Link>.</p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
