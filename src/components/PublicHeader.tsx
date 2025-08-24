import { NavLink, Link } from "react-router"

function PublicHeader() {
  return (
    <header className="bg-transparent absolute w-full">
      <nav className="max-w-[1100px] mx-auto flex justify-between items-center w-full gap-8 p-8">
        <Link to="/">
          <span>Logo</span>
        </Link>

        <div className="flex items-center gap-5 font-raleway font-medium">
          <NavLink 
          to="#"
          className="hover:text-brown transition-colors duration-300"
          >
            Sobre
          </NavLink>
          <NavLink 
          to="#"
          className="hover:text-brown transition-colors duration-300"
          >
            Cuidados e dicas
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default PublicHeader
