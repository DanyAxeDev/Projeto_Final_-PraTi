import { NavLink, Link } from "react-router"

function PublicHeader() {
  return (
    <header className="bg-gray-200">
      <nav className="max-w-[1100px] mx-auto flex justify-between w-full gap-8 p-8">
        <Link to="/">
          <span>Logo</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="size-8 bg-gray-300 rounded-lg"></div>
          <NavLink to="#">
            Cuidados e dicas
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default PublicHeader
