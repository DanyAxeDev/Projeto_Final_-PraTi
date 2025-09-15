import { IoPaw } from "react-icons/io5"

function Loader() {
  return (
    <div 
    aria-label="Carregando informações..."
    className="mx-auto h-screen flex flex-col justify-center items-center"
    >
      <IoPaw aria-hidden="true" className="text-brown text-7xl animate-pulse sm:text-8xl" />
    </div>
  )
}

export default Loader
