// src/pages/sobre/SobrePage.tsx
import React from "react";
import {
  PawPrint,
  HeartHandshake,
  ShieldCheck,
  Users,
  Home,
  Smile,
} from "lucide-react";

// caminhos sugeridos (pasta public/)
const heroImg = "/src/assets/sobre/pata-mao.jpg";
const processImg = "/src/assets/sobre/cachorro-adotar.jpg";

export default function SobrePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">

      {/* HERO — faixa marrom sem moldura / padding: 80px 32px */}
      <section className="bg-brown text-stone-50">
        <div className="mx-auto max-w-6xl py-20 px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4">
          {/* coluna esquerda: imagem com max 300x400 */}
          <figure className="order-1 md:order-1 justify-self-start">
            <img
              src={heroImg}
              alt="Mão e pata de cachorro em contato"
              className="w-full h-auto max-w-[300px] max-h-[400px] object-cover rounded-2xl"
              loading="lazy"
            />
          </figure>

          {/* coluna direita: texto */}
          <div className="order-2 md:order-2">
            <h1 className="text-[clamp(48px,4.2vw,56px)] font-bold leading-[1.1]">
              Sobre o <span className="text-emerald-300">PetConect</span>
            </h1>
            <p className="mt-4 leading-relaxed text-stone-100/90">
              O PetConect aproxima animais que precisam de um lar de pessoas
              dispostas a adotar com responsabilidade. Unimos ONGs, protetores e
              adotantes em um processo simples, humano e seguro.
            </p>
            <p className="mt-4 leading-relaxed text-stone-100/90">
              Aqui você encontra histórias, orientações e um fluxo de adoção
              transparente do início ao pós-adoção.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES — padding: 80px 32px */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl py-20 px-8">
          <h2 className="text-center text-xl md:text-3xl font-semibold mb-8 text-brown">
            Nós acreditamos em
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-stone-200 p-3">
                <PawPrint className="size-6" />
              </div>
              <h3 className="font-semibold mb-2">Responsabilidade</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Acompanhamos cada etapa para garantir o bem-estar do animal e a
                segurança do adotante.
              </p>
            </article>

            <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-stone-200 p-3">
                <HeartHandshake className="size-6" />
              </div>
              <h3 className="font-semibold mb-2">Amor</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Vínculos duradouros baseados em cuidado, paciência e compromisso.
              </p>
            </article>

            <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-stone-200 p-3">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="font-semibold mb-2">Honestidade</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Parcerias com ONGs e protetores verificados para um processo justo.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PROCESSO DE ADOÇÃO — faixa marrom / padding: 80px 32px */}
      <section className="bg-brown text-stone-50">
        <div className="mx-auto max-w-6xl py-20 px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* texto à esquerda */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              O processo de adoção
            </h2>
            <p className="leading-relaxed text-stone-100/90">
            Adotar é um gesto de amor. Você escolhe o pet que mais tocar seu coração,
            preenche um cadastro simples e entra em contato com a ONG.
            Se tudo combinar, marcamos um encontro (on-line ou presencial) para confirmar que o lar está
            pronto para recebê-lo. Depois, assinamos um termo de responsabilidade com os cuidados básicos
            e combinamos a chegada. Pronto: seu novo amigo vai para casa com segurança e muito carinho.
            Observação: a adoção é gratuita, mas podem existir custos de vacina, castração ou transporte, conforme o caso.
            </p>
          </div>

          {/* imagem à direita com max 300x400 */}
          <figure className="justify-self-end">
            <img
              src={processImg}
              alt="Cachorro com plaquinha Adote-me"
              className="w-full h-auto max-w-[300px] max-h-[400px] object-cover rounded-2xl"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* NOSSOS NÚMEROS — padding: 80px 32px */}
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl py-20 px-8">
          <h2 className="text-center text-xl md:text-3xl font-semibold mb-8 text-brown">
            Nossos números
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-2 flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <div className="text-2xl font-bold text-[#7abccd]">60+</div>
              <div className="text-2xl text-stone-600 text-2xl">Pets adotados</div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-2 flex items-center justify-center">
                <Home className="size-6" />
              </div>
              <div className="text-2xl font-bold text-[#7abccd]">100+</div>
              <div className="text-2xl text-stone-600">Pets cadastrados</div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-2 flex items-center justify-center">
                <Smile className="size-6" />
              </div>
              <div className="text-2xl font-bold text-[#7abccd]">8</div>
              <div className="text-2xl text-stone-600"> Estados do Brasil participantes
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brown text-stone-50">
  <div className="mx-auto max-w-6xl py-20 px-8">
    
    
    {/* título principal */}
    <h1 className="text-3xl font-semibold mb-6">Requisitos</h1>


    {/* títulos lado a lado */}
    <div className="grid grid-cols-2">
      <h3 className="text-2xl font-semibold mb-2 text-[#7abccd]">Para adotar</h3>
      <h3 className="text-2xl font-semibold mb-2 text-[#7abccd]">Para doar</h3>
    </div>

    {/* listas lado a lado */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ul className="space-y-1 text-stone-100/90">
        <li>• Ser maior de 18 anos.</li>
        <li>• Ter condição de cuidar e manter o pet.</li>
        <li>• Possuir ambiente adequado para o pet.</li>
      </ul>
      <ul className="space-y-1 text-stone-100/90">
        <li>• Ser maior de 18 anos.</li>
        <li>• Possuir comprovantes de vacinação e castração do pet.</li>
        <li>• Prover todas as informações necessárias sobre o pet.</li>
      </ul>
    </div>
  </div>
</footer>

</main> )
; 
}
