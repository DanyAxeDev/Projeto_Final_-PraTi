import React from "react";
import { Link } from "react-router";

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
    <main className="min-h-screen bg-sand">
      {/* TÍTULO CENTRAL (sem a barra clara de Logo) */}
      <header className="mx-auto max-w-[1100px] px-6">
        <div className="py-8 text-center">
          <h1 className="font-tilt text-brown text-3xl md:text-4xl">Cuidados e dicas</h1>
        </div>

        {/* FAIXA MARROM */}
        <div className="rounded-md bg-brown px-6 py-6 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
            {/* Texto à esquerda */}
            <div className="flex-1">
              <h2 className="font-tilt text-2xl">Hábitos saudáveis para seu cachorro</h2>
              <p className="mt-1 text-white/80">Subtítulo da matéria</p>
              <div className="mt-4 space-y-1 text-sm text-white/80">
                <p>Por Nome Autor</p>
                <p>Data desconhecida</p>
              </div>
              <div className="mt-4 flex items-center gap-4 text-white/90">
                {/* ícones placeholders */}
                <span className="inline-flex h-5 w-5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3.9 12a5 5 0 0 1 1.46-3.54l2.1-2.1a5 5 0 0 1 7.07 7.07l-.7.7a1 1 0 0 1-1.42-1.42l.7-.7a3 3 0 1 0-4.24-4.24l-2.1 2.1A3 3 0 1 0 9 13a1 1 0 0 1 0 2 5 5 0 0 1-5.1-3z"/><path d="M20.1 12a5 5 0 0 1-1.46 3.54l-2.1 2.1a5 5 0 0 1-7.07-7.07l.7-.7a1 1 0 1 1 1.42 1.42l-.7.7a3 3 0 1 0 4.24 4.24l2.1-2.1A3 3 0 1 0 15 11a1 1 0 0 1 0-2 5 5 0 0 1 5.1 3z"/></svg>
                </span>
                <span className="inline-flex h-5 w-5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z"/></svg>
                </span>
              </div>
            </div>

            {/* Imagem à direita */}
            <div className="md:w-[360px]">
              <div className="overflow-hidden rounded-md border-4 border-white/40">
                <img
                  src="/images/dog-hero.jpg"
                  alt="Cachorro sorrindo"
                  className="h-[180px] w-full object-cover md:h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* GRID principal */}
      <div className="mx-auto mt-6 max-w-[1100px] px-6 pb-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Esquerda */}
        <section className="lg:col-span-8">
          <article className="rounded-md border border-border bg-white px-6 py-5 font-raleway text-sm text-foreground/80">
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

          <article className="mt-4 rounded-md border border-border bg-white px-6 py-5 font-raleway text-sm text-foreground/80">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit...
            </p>
          </article>
        </section>

        {/* Sidebar: itens clicáveis */}
        <aside className="lg:col-span-4">
          <div className="rounded-md border border-border bg-white">
            <div className="px-5 py-4">
              <h3 className="font-tilt text-brown text-xl">Outras dicas</h3>
            </div>

            <ul className="font-raleway text-sm text-foreground/85">
              {outrasDicas.map((item, i) => (
                <li key={item.slug} className={i < outrasDicas.length - 1 ? "border-b border-border" : ""}>
                  <Link
                    to={`/cuidados-e-dicas/${item.slug}`}
                    className="block px-5 py-3 hover:bg-sand/70 focus:outline-none focus:ring-2 focus:ring-blue/40 rounded-sm"
                    aria-label={`Abrir matéria: ${item.titulo}`}
                  >
                    {item.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
