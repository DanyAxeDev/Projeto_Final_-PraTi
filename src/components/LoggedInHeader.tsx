import { useState } from "react"
import { Link } from "react-router"
import { FaUser } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import HeaderMenu from "./HeaderMenu"

function LoggedInHeader() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-white">
            <div className="flex justify-between items-center max-w-[1100px] mx-auto py-7 px-8 relative">
                <Link to="/home">
                    <span>Logo</span>
                </Link>

                <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex gap-2 items-center hover:bg-lightgray p-1 rounded-md transition-colors duration-300 cursor-pointer"
                >
                    <div className="bg-blue size-10 flex justify-center items-center rounded-full text-xl text-brown">
                        <FaUser />
                    </div>
                    
                    <IoIosArrowDown className="text-xl" />
                </button>

                <HeaderMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </header>
    )
}

export default LoggedInHeader
