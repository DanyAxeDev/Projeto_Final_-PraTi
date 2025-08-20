import { Link } from "react-router"
import type { ReactNode } from "react"

type SocialIconProps = {
  icon: ReactNode,
  url: string
}

function SocialIcon({ icon, url }: SocialIconProps) {
  return (
    <Link to={url} className="text-2xl">
      {icon}
    </Link>
  )
}

export default SocialIcon
