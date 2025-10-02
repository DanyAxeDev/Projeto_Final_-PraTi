import React from "react";
import { useParams, Link } from "react-router";
import HeadingWithLine from "@/components/HeadingWithLine";
import { FaShare } from "react-icons/fa";
import { IoDownload } from "react-icons/io5";
import { artigos } from "../data/artigo";

export default function ArtigoPage() {
  const { slug } = useParams<{ slug: string }>();
  const artigo = artigos.find((a) => a.slug === slug);

  // fallback se não encontrar
  if (!artigo) {
    return (
      <section className="max-w-[1100px] mx-auto flex flex-col gap-6 h-full py-12 px-4 font-raleway sm:px-8">
        <HeadingWithLine text="Cuidados e dicas" />
        <div className="rounded-md border border-border bg-white p-6">
          <h1 className="text-2xl font-bold text-brown">Matéria não encontrada</h1>
          <p className="mt-2 text-foreground/80">
            O conteúdo que você tentou acessar não existe ou foi movido.
          </p>
          <Link
            to="/cuidados-e-dicas"
            className="mt-6 inline-block text-blue underline underline-offset-4"
          >
            ← Voltar para Cuidados e dicas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto flex flex-col justify-between items-center gap-8 h-full py-12 px-4 font-raleway sm:px-8">
      {/* TÍTULO CENTRAL */}
      <HeadingWithLine text="Cuidados e dicas" />

      {/* FAIXA MARROM (cabeçalho do artigo) */}
      <header className="rounded-md bg-brown px-6 py-12 text-sand w-full font-medium mt-2">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          {/* Texto à esquerda */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="font-raleway font-bold text-3xl">{artigo.title}</h1>
              <p className="mt-1 font-semibold">{artigo.subtitle}</p>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p className="font-semibold">Por Redação</p>
              <p>02/10/2025</p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button
                className="text-xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300"
                title="Compartilhar"
              >
                <FaShare />
              </button>
              <button
                className="text-2xl text-blue cursor-pointer p-1 hover:text-darkblue transition-colors duration-300"
                title="Baixar"
              >
                <IoDownload />
              </button>
            </div>
          </div>

          {/* Imagem à direita (opcional) */}
          <div className="md:w-[360px]">
            <div className="overflow-hidden rounded-md">
              <img
                src={artigo.image}
                alt={artigo.title}
                className="h-[180px] w-full object-cover md:h-[200px]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <article className="w-full rounded-md border border-border bg-white px-6 py-5 font-medium text-foreground/80">
        <div className="space-y-4">
          {artigo.paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Navegação */}
        <Link
          to="/cuidados-e-dicas"
          className="mt-6 inline-block text-blue underline underline-offset-4"
        >
          ← Voltar para Cuidados e dicas
        </Link>
      </article>
    </section>
  );
}
