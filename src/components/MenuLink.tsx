import type { ReactNode } from "react"
import { Link } from "react-router"

type MenuLinkProps = {
    icon: ReactNode,
    text: string,
    url: string

}

function MenuLink({ icon, text, url }: MenuLinkProps) {
  return (
    <li>
        <Link 
        to={url}
        className="flex items-center gap-3 p-3 hover:bg-lightgray transition-colors duration-300 font-raleway font-medium"
        >
            {icon} {text}
        </Link>
    </li>
  )
}

export default MenuLink
