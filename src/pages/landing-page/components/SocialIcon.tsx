import { Link } from "react-router"
import type { ReactNode } from "react"

type SocialIconProps = {
  icon: ReactNode,
  url: string
}

function SocialIcon({ icon, url }: SocialIconProps) {
  return (
    <Link 
    to={url} 
    className="text-2xl text-brown hover:text-darkbrown transition-all duration-300 p-1"
    >
      {icon}
    </Link>
  )
}

export default SocialIcon
