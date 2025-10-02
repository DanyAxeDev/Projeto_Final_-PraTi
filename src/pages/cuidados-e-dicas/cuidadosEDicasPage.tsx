import { Link } from "react-router";
import HeadingWithLine from "@/components/HeadingWithLine";
import { FaShare } from "react-icons/fa";
import { IoDownload } from "react-icons/io5";
import { artigos } from "./data/artigo";

// seleciona o destaque e monta a lista do sidebar
const destaque =
  artigos.find(a => a.slug === "habitos-saudaveis-cachorro") ?? artigos[0];
const outrasDicas = artigos.filter(a => a.slug !== destaque.slug);

export default function CuidadosEDicasPage() {
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
              <p>01/10/2025</p>
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
        <article className="lg:col-span-8 rounded-md border border-border bg-white px-6 py-5 font-medium text-foreground/80">
          <p>{destaque.paragraphs[0]}</p>
          {destaque.paragraphs[1] && (
            <p className="mt-4">{destaque.paragraphs[1]}</p>
          )}

          {/* (Opcional) Link para ler completo */}
          <Link
            to={`/cuidados-e-dicas/${destaque.slug}`}
            className="mt-4 inline-block text-blue underline underline-offset-4"
            aria-label={`Abrir matéria completa: ${destaque.title}`}
          >
            Ler matéria completa →
          </Link>
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
