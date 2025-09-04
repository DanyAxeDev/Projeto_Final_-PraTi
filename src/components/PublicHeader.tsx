import { NavLink, Link } from "react-router"

type PublicHeaderProps = {
  bg?: boolean
}

function PublicHeader({ bg = true }: PublicHeaderProps) {
  return (
    <header className={`${bg ? "bg-white" : "bg-transparent"} absolute w-full`}>
      <nav className="max-w-[1100px] mx-auto flex justify-between items-center w-full gap-8 px-8 py-7">
        <Link to="/">
          <span>Logo</span>
        </Link>

        <div className="flex items-center gap-5 font-raleway font-semibold">
          <NavLink 
          to="/sobre"
          className="hover:text-brown [.active]:text-brown transition-colors duration-300"
          >
            Sobre
          </NavLink>
          <NavLink 
          to="/cuidados-e-dicas"
          className="hover:text-brown [.active]:text-brown transition-colors duration-300"
          >
            Cuidados e dicas
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default PublicHeader
