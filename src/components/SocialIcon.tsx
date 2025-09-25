import { Link } from "react-router"
import type { ReactNode } from "react"

type SocialIconProps = {
  icon: ReactNode,
  url: string,
  color?: string
}

function SocialIcon({ icon, url, color = "brown" }: SocialIconProps) {
  return (
    <Link 
    to={url} 
    className={`${color === "brown" ? "text-brown hover:text-darkbrown focus:text-darkbrown" : "text-white hover:text-brown focus:text-brown"} text-2xl transition-all duration-300 p-1`}
    >
      {icon}
    </Link>
  )
}

export default SocialIcon
