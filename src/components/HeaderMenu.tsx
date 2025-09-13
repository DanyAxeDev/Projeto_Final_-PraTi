import type { Dispatch, SetStateAction } from "react"
import MenuLink from "./MenuLink"
import RoundButtonDanger from "./RoundButtonDanger"
import { TbCirclePlus } from "react-icons/tb"
import { FaCat } from "react-icons/fa"
import { MdFavorite } from "react-icons/md"
import { IoIosSettings } from "react-icons/io"

type HeaderMenuProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function HeaderMenu({ isOpen, setIsOpen }: HeaderMenuProps) {
  return (
    <nav 
    onClick={() => setIsOpen(false)} 
    className={`w-[240px] py-8 bg-white absolute right-4 shadow-md z-20 transition-all duration-200 ${isOpen ? "top-20 opacity-100 visible" : "top-[-300px] opacity-0 invisible"} sm:right-8`}
    >
        <ul className="flex flex-col gap-2">
            <MenuLink 
            icon={<TbCirclePlus className="text-blue text-2xl" />} 
            text="Adicionar um pet" 
            url="/cadastro-de-pet" 
            />
            <MenuLink 
            icon={<FaCat className="text-blue text-2xl" />} 
            text="Meus pets" 
            url="/meus-pets" 
            />
            <MenuLink 
            icon={<MdFavorite className="text-blue text-2xl" />} 
            text="Favoritos"
            url="/favoritos" 
            />
            <MenuLink 
            icon={<IoIosSettings className="text-blue text-2xl" />} 
            text="Minha conta" 
            url="" 
            />
            <li className="p-3">
                <RoundButtonDanger text="Sair" />
            </li>
        </ul>
    </nav>
  )
}

export default HeaderMenu
