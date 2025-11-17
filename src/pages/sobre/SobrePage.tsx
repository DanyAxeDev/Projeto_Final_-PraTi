import ValueCard from "./components/ValueCard";
import NumberInfoItem from "./components/NumberInfoitem";
import handAndPaw from "@/assets/imgs/sobre-img-1.jpg";
import adoptMeDog from "@/assets/imgs/sobre-img-2.jpg";
import responsabilidade from "@/assets/icons/responsabilidade.png";
import amor from "@/assets/icons/amor.png";
import honestidade from "@/assets/icons/honestidade.png";

function SobrePage() {
  return (
    <section className="flex flex-col gap-10 min-h-screen font-raleway font-medium pb-20">

      {/* HERO — faixa marrom sem moldura / padding: 80px 32px */}
      <section className="bg-brown text-sand">
        <article className="flex flex-col-reverse gap-10 mx-auto max-w-[1100px] py-20 px-4 sm:px-8 md:flex-row lg:gap-16">
          {/* coluna esquerda: imagem com max 300x400 */}
          <div className="w-full max-w-full h-[420px] rounded-[5px] overflow-clip md:max-w-[300px] md:min-w-[300px] md:h-[400px]">
            <img
              src={handAndPaw}
              alt="Mão e pata de cachorro em contato"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* coluna direita: texto */}
          <div className="flex flex-col gap-4">
            <h1 className="font-tilt text-5xl mb-2">
              Sobre o PetConect
            </h1>
            <p>
              O PetConect aproxima animais que precisam de um lar de pessoas dispostas a adotar com responsabilidade. Nós utilizamos filtros baseados nas características desejadas em um novo amigo pelo adotante para realizar um "match perfeito" entre a pessoa e o pet. Também proporcionamos a possibilidade de o tutor atual do pet escolher o candidato mais apropriado para adotá-lo. Unimos ONGs, protetores e adotantes em um processo simples, humano, seguro e gratuito.
            </p>
            <p>
              Pensamos sempre no bem-estar e segurança do pet em primeiro lugar, sendo essa a motivação principal do projeto. Aqui você encontra histórias, orientações e um fluxo de adoção transparente do início ao pós-adoção.
            </p>
          </div>
        </article>
      </section>

      {/* VALORES — padding: 80px 32px */}
      <section>
        <div className="flex flex-col gap-4 mx-auto max-w-[1100px] py-20 px-4 sm:px-8">
          <h2 className="text-center font-bold text-3xl text-brown mb-4">
            Nós acreditamos em
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">
            <ValueCard 
            img={responsabilidade} 
            title="Responsabilidade" 
            text="Acompanhamos cada etapa para garantir o bem-estar do animal e a segurança do adotante." 
            />
            
            <ValueCard 
            img={amor} 
            title="Amor" 
            text="Vínculos duradouros baseados em cuidado, paciência e compromisso." 
            />

            <ValueCard 
            img={honestidade} 
            title="Honestidade" 
            text="Requisitamos informações verdadeiras para um processo transparente e justo." 
            />
          </div>
        </div>
      </section>

      {/* PROCESSO DE ADOÇÃO — faixa marrom / padding: 80px 32px */}
      <section className="bg-brown text-sand">
        <article className="flex flex-col gap-10 mx-auto max-w-[1100px] py-20 px-4 sm:px-8 md:flex-row lg:gap-16">
          {/* texto à esquerda */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="font-bold text-3xl mb-2">
              O processo de adoção
            </h2>
            <div className="flex flex-col gap-4 md:max-w-[600px]">
              <p>
              Adotar é um gesto de amor. Você escolhe o pet que mais tocar seu coração e preenche um formulário simples que será enviado para a pessoa ou ONG responsável por ele. Se você for escolhido, marcamos um encontro (on-line ou presencial) para confirmar que o lar está pronto para recebê-lo. Depois, assinamos um termo de responsabilidade com os cuidados básicos e combinamos a chegada. Pronto: seu novo amigo vai para casa com segurança e muito carinho.
              </p>
              <p>
                <strong>
                  Observação: a adoção é gratuita, mas podem existir custos de transporte, conforme o caso.
                </strong>
              </p>
            </div>
          </div>

          {/* imagem à direita com max 300x400 */}
          <div className="w-full max-w-full h-[420px] rounded-[5px] overflow-clip md:max-w-[300px] md:h-[400px]">
            <img
              src={adoptMeDog}
              alt="Cachorro com plaquinha Adote-me"
              className="w-full h-full object-cover sm:object-top md:object-cover"
              loading="lazy"
            />
          </div>
        </article>
      </section>

      {/* NOSSOS NÚMEROS — padding: 80px 32px */}
      <section>
        <div className="flex flex-col gap-4 mx-auto max-w-[1100px] py-20 px-4 sm:px-8">
          <h2 className="text-center font-bold text-3xl text-brown mb-4">
            Nossos números
          </h2>

          <section className="flex justify-center flex-wrap gap-10 bg-white rounded-[5px] py-8 px-10 w-full max-w-[790px] mx-auto md:justify-between md:px-16">
            <NumberInfoItem number="60+" info="Pets adotados" />
            <NumberInfoItem number="100+" info="Pets cadastrados" />
            <NumberInfoItem number="6" info="Estados do Brasil participantes" />
          </section>
        </div>
      </section>

      {/* REQUISITOS — padding: 80px 32px */}
      <section className="bg-brown text-sand">
        <article className="mx-auto max-w-[1100px] py-20 px-4 sm:px-8">
          {/* título principal */}
          <h2 className="font-bold text-3xl mb-4">Requisitos</h2>

          {/* listas lado a lado */}
          <div className="flex justify-between gap-10 flex-wrap">
            <section>
              <h3 className="text-2xl font-bold mb-2 text-blue">Para adotar</h3>
              <ul className="space-y-1">
                <li className="before:content-['•_']">Ser maior de 18 anos.</li>
                <li className="before:content-['•_']">Ter condição de cuidar e manter o pet.</li>
                <li className="before:content-['•_']">Possuir ambiente adequado para o pet.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-2 text-blue">Para doar</h3>
              <ul className="space-y-1">
                <li className="before:content-['•_']">Ser maior de 18 anos.</li>
                <li className="before:content-['•_']">Possuir comprovantes de vacinação e castração do pet.</li>
                <li className="before:content-['•_']">Prover todas as informações necessárias sobre o pet.</li>
              </ul>
            </section>
          </div>
        </article>
      </section>
    </section>
  ); 
}

export default SobrePage;