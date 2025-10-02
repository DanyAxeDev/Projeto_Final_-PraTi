import { Link, useParams, Navigate } from "react-router";
import HeadingWithLine from "@/components/HeadingWithLine";
import { FaShare } from "react-icons/fa";
import { IoDownload } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa"
import articles from "@/data/articles";

export default function CuidadosEDicasPage() {
  const { slug } = useParams();

  // Navega para o primeiro artigo se acessarmos a página sem um slug
  if (!slug) return <Navigate to={`/cuidados-e-dicas/${articles[0].slug}`} />

  const destaque = articles.find(a => a.slug === slug);
  const outrasDicas = articles.filter(a => a.slug !== slug);

  // Fallback se não encontrar
  if (!destaque) {
    return (
      <section className="max-w-[1100px] mx-auto flex flex-col gap-6 h-full py-12 px-4 font-raleway sm:px-8">
        <HeadingWithLine text="Cuidados e dicas" />
        <div className="rounded-md border border-border bg-white p-6">
          <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
          <p className="mt-2 font-medium">
            O conteúdo que você tentou acessar não existe ou foi movido.
          </p>
          <Link
            to="/cuidados-e-dicas"
            className="flex items-center gap-2 mt-6 font-semibold text-brown hover:underline underline-offset-4"
          >
            <FaArrowLeft aria-hidden="true" /> Voltar para Cuidados e dicas
          </Link>
        </div>
      </section>
    );
  }

  if (destaque)
  return (
    <section className="max-w-[1100px] mx-auto flex flex-col justify-between items-center gap-8 h-full py-12 px-4 font-raleway sm:px-8">
      {/* TÍTULO CENTRAL */}
      <HeadingWithLine text="Cuidados e dicas" />

      {/* FAIXA MARROM */}
      <header className="rounded-md bg-brown px-6 py-12 text-sand w-full font-medium mt-2">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          {/* Texto à esquerda */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-raleway font-bold text-3xl">
                {destaque.title}
              </h2>
              <p className="mt-1 font-semibold">{destaque.subtitle}</p>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p className="font-semibold">Por Redação</p>
              <p>{destaque.date}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button className="text-xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300" title="Compartilhar">
                <FaShare />
              </button>
              <button className="text-2xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300" title="Baixar">
                <IoDownload />
              </button>
            </div>
          </div>

          {/* Imagem à direita */}
          <div className="md:w-[360px]">
            <div className="overflow-hidden rounded-md">
              <img
                src={destaque.image}
                alt={destaque.title}
                className="h-[180px] w-full object-cover md:h-[200px]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* GRID principal */}
      <section className="mx-auto mt-2 pb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Esquerda */}
        <article className="lg:col-span-8 rounded-md border border-border bg-white px-6 py-8 font-medium text-foreground/80">
          {destaque.paragraphs.map((paragraph, i) => {
            return (
              <p key={i} className="mb-4">{paragraph}</p>
            )
          })}
        </article>

        {/* Sidebar: itens clicáveis */}
        <aside className="lg:col-span-4">
          <div className="rounded-md border border-border bg-white">
            <div className="px-5 py-4">
              <h3 className="text-2xl font-bold text-brown">Outras dicas</h3>
            </div>

            <ul className="text-foreground/85">
              {outrasDicas.map((item, i) => (
                <li
                  key={item.slug}
                  className={i < outrasDicas.length - 1 ? "border-b border-border" : ""}
                >
                  <Link
                    to={`/cuidados-e-dicas/${item.slug}`}
                    className="font-semibold text-lg text-brown block px-5 py-3 hover:bg-lightgray focus:outline-none focus:ring-2 focus:ring-blue/40 rounded-sm transition-colors duration-300"
                    aria-label={`Abrir matéria: ${item.title}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </section>
  );
}
