// src/pages/cuidados-e-dicas/ArtigoPage.tsx
import React from "react";
import { useParams, Link } from "react-router";

export default function ArtigoPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="font-tilt text-brown text-3xl">Matéria: {slug}</h1>
      <p className="mt-3 font-raleway text-foreground/80">
        Conteúdo da matéria aqui…
      </p>
      <Link to="/cuidados-e-dicas" className="mt-6 inline-block text-blue underline underline-offset-4">
        ← Voltar para Cuidados e dicas
      </Link>
    </main>
  );
}
