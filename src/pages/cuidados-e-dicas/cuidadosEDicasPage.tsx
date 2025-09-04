import React from "react";
import { Link } from "react-router";
import HeadingWithLine from "@/components/HeadingWithLine";
import { FaShare } from "react-icons/fa"
import { IoDownload } from "react-icons/io5"

const outrasDicas = [
  { titulo: "Mantenha a vacinação em dia", slug: "vacinacao-em-dia" },
  { titulo: "Como manter seu pet ativo morando em apartamento", slug: "pet-ativo-em-apartamento" },
  { titulo: "Como lidar com pulgas", slug: "como-lidar-com-pulgas" },
  { titulo: "Itens essenciais para manter a saúde do pet em casa", slug: "itens-essenciais-em-casa" },
  { titulo: "8 alimentos para incluir na dieta do seu gato", slug: "alimentos-para-gatos" },
  { titulo: "Dicas para a adaptação do pet em um novo lar", slug: "adaptacao-novo-lar" },
  { titulo: "Alimentos perigosos para pets", slug: "alimentos-perigosos" },
];

export default function CuidadosEDicasPage() {
  return (
    <section className="max-w-[1100px] mx-auto flex flex-col justify-between items-center gap-8 h-full py-12 px-8 font-raleway">
      {/* TÍTULO CENTRAL (sem a barra clara de Logo) */}
      <HeadingWithLine text="Cuidados e dicas" />

      {/* FAIXA MARROM */}
      <header className="rounded-md bg-brown px-6 py-12 text-sand w-full font-medium mt-2">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          {/* Texto à esquerda */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-raleway font-bold text-3xl">Hábitos saudáveis para seu cachorro</h2>
              <p className="mt-1 font-semibold">Subtítulo da matéria</p>
            </div>
            
            <div className="mt-4 space-y-1 text-sm">
              <p className="font-semibold">Por Nome Autor</p>
              <p>Data desconhecida</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              {/* ícones placeholders */}
              <button className="text-xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300">
                <FaShare />
              </button>
              <button className="text-2xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300">
                <IoDownload />
              </button>
            </div>
          </div>

          {/* Imagem à direita */}
          <div className="md:w-[360px]">
            <div className="overflow-hidden rounded-md">
              <img
                src="/imgs/dog-hero.jpg"
                alt="Cachorro sorrindo"
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam...
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5">
            <li>Tópico do assunto</li>
            <li>Tópico do assunto</li>
            <li>Tópico do assunto</li>
            <li>Tópico do assunto</li>
            <li>Tópico do assunto</li>
          </ul>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit...
          </p>
        </article>


        {/* Sidebar: itens clicáveis */}
        <aside className="lg:col-span-4">
          <div className="rounded-md border border-border bg-white">
            <div className="px-5 py-4">
              <h3 className="text-2xl font-bold">Outras dicas</h3>
            </div>

            <ul className="text-foreground/85">
              {outrasDicas.map((item, i) => (
                <li key={item.slug} className={i < outrasDicas.length - 1 ? "border-b border-border" : ""}>
                  <Link
                    to={`/cuidados-e-dicas/${item.slug}`}
                    className="font-semibold text-lg text-brown block px-5 py-3 hover:bg-lightgray focus:outline-none focus:ring-2 focus:ring-blue/40 rounded-sm transition-colors duration-300"
                    aria-label={`Abrir matéria: ${item.titulo}`}
                  >
                    {item.titulo}
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
