import { Link } from "react-router"; 
import Cat from "@/assets/imgs/not-found-cat.png";

export default function NotFoundPage() {
  return (
    <section className="bg-sand min-h-screen flex items-center justify-center p-4 sm:p-8 font-raleway">   
       <main className="container mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 max-w-5xl">
          
          {/* Coluna da Imagem */}
          <div className="flex justify-center">
            <img
              src={Cat}
              alt="Gato confuso indicando que a página não foi encontrada"              
            />
          </div>

          {/* Coluna do Texto */}
          <div className="text-center lg:text-left">
            <h1 className="text-7xl md:text-9xl font-['Tilt_Warp'] font-bold text-blue">
              Ops!
            </h1>
            <p className="mt-4 text-lg font-bold">
              Parece que essa página não existe.
            </p>
            <Link
              to="/"
              className="mt-2 inline-block font-semibold text-brown underline-offset-4 hover:underline"
            >
              Retornar à página inicial
            </Link>
          </div>

        </div>
      </main>
    </section>
  );
}
