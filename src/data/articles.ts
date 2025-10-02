export interface Article {
    slug: string;
    title: string;     
    subtitle: string;
    image: string;
    date: string;
    paragraphs: string[];
}
  
const articles: Article[] = [
  {
    slug: "alimentacao-saudavel-caes-gatos",
    title: "Alimentação saudável para cães e gatos",
    subtitle: "A base para uma vida longa, com energia e bem-estar",
    image: "/imgs/articles/alimentacao.png",
    date: "01/10/2025",
    paragraphs: [
      "A saúde do seu pet começa no potinho: o que ele come diariamente influencia no crescimento, na imunidade, na pelagem e até no comportamento. Por isso, construir uma rotina alimentar equilibrada é um dos cuidados mais importantes para cães e gatos.",
      "As rações de boa qualidade são formuladas por especialistas para atender necessidades por fase da vida (filhote, adulto e sênior), porte e condições clínicas (controle de peso, suporte renal etc.). Escolher uma ração adequada costuma ser suficiente para garantir nutrição completa.",
      "Alguns tutores gostam de complementar com alimentos naturais. Isso é possível, mas com moderação e orientação veterinária. Frutas como maçã sem sementes, banana, melancia e mamão, e legumes como cenoura e abobrinha cozidos sem tempero, funcionam como petiscos saudáveis.",
      "Evite restos de comida temperada, frituras e ultraprocessados. O organismo dos animais é diferente do nosso e certos ingredientes sobrecarregam fígado e pâncreas, além de desequilibrar a dieta.",
      "Atenção aos vilões: chocolate, cebola, alho, uva e café são tóxicos para cães e gatos. Mesmo em pequenas quantidades, podem causar intoxicações graves.",
      "Água fresca e limpa deve estar sempre disponível. A hidratação é essencial para rins e trato urinário — especialmente para gatos, que tendem a beber menos água.",
      "Se considerar dietas caseiras como rotina, faça com apoio profissional. O veterinário nutrólogo monta um plano balanceado com porções, suplementos e modo de preparo.",
      "No fim, o segredo é o equilíbrio: dieta apropriada à fase de vida e às necessidades específicas é investimento direto em qualidade de vida e longevidade."
    ]
  },
  {
    slug: "como-preparar-casa-novo-pet",
    title: "Como preparar sua casa para receber um novo pet",
    subtitle: "Guia prático para acolher com amor, segurança e tranquilidade",
    image: "/imgs/articles/preparar-casa.png",
    date: "25/09/2025",
    paragraphs: [
      "A chegada de um novo animalzinho é pura alegria — e um pouco de organização faz tudo fluir melhor. Preparar o ambiente com antecedência reduz o estresse do pet e facilita a adaptação.",
      "Defina um cantinho de referência: caminha confortável, tigela de água, comedouro e alguns brinquedos. Esse espaço oferece segurança e previsibilidade nos primeiros dias.",
      "Revise a casa com olhar de segurança: guarde produtos de limpeza, proteja fios, remova objetos pequenos que possam ser engolidos e verifique plantas potencialmente tóxicas.",
      "Se houver área externa, confira portões, muros e frestas por onde o animal poderia escapar. Ajustes simples evitam sustos.",
      "Para gatos, posicione a caixa de areia em local tranquilo e separado da área de alimentação. Arranhadores e pontos de escalada aliviam o estresse e direcionam comportamentos naturais.",
      "Nos primeiros dias, mantenha rotina calma: reduza barulhos e evite muitas visitas. Deixe o pet explorar no próprio ritmo, reforçando com carinho e recompensas.",
      "Tenha itens básicos à mão: guia/peitoral (cães), tapetes higiênicos, saquinhos para passeio e contato de um veterinário de confiança.",
      "Com paciência e ambiente preparado, o pet entende rapidamente que aquele é o seu lar — e a relação começa do melhor jeito."
    ]
  },
  {
    slug: "adaptacao-pets-apartamentos",
    title: "Adaptação de pets em apartamentos",
    subtitle: "Bem-estar e segurança mesmo em espaços menores",
    image: "/imgs/articles/apartamento.png",
    date: "20/09/2025",
    paragraphs: [
      "Criar pets em apartamento é totalmente viável — e muito prazeroso — quando a rotina e o ambiente suprem necessidades físicas e mentais.",
      "Cães precisam de passeios diários. Caminhadas regulares controlam o peso, reduzem ansiedade e proporcionam estímulos olfativos essenciais. Horários previsíveis ajudam no comportamento.",
      "Gatos não precisam sair, mas enriquecimento ambiental é indispensável: arranhadores, brinquedos interativos, prateleiras e tocas mantêm o felino ativo e mentalmente estimulado.",
      "Segurança é prioridade: instale telas de proteção em janelas e sacadas. Impulsos naturais de caça e equilíbrio podem causar acidentes — prevenção é o caminho mais seguro.",
      "Gerencie ruídos: alguns animais são sensíveis a barulhos. Um “refúgio” silencioso e sons ambientes suaves ajudam em momentos de estresse.",
      "Organize a rotina: horários de alimentação, higiene e brincadeiras dão previsibilidade e ajudam na adaptação, especialmente a recém-chegados.",
      "Gaste energia antes de períodos de silêncio e noturnos, ofereça brinquedos mastigáveis ou de enriquecimento para reduzir latidos por tédio.",
      "Com pequenas adaptações e constância, a vida em apartamento é confortável, segura e divertida para tutores e animais."
    ]
  },
  {
    slug: "habitos-saudaveis-cachorro",
    title: "Hábitos saudáveis para seu cachorro",
    subtitle: "Rotina simples que aumenta a qualidade e a expectativa de vida",
    image: "/imgs/articles/habitos.png",
    date: "06/07/2025",
    paragraphs: [
      "Cuidar bem de um cachorro vai além de amor e água no pote: envolve rotina, prevenção e estímulos diários. Pequenos hábitos consistentes têm impacto enorme no bem-estar.",
      "A base é a alimentação: escolha ração de qualidade adequada à idade e ao porte, evitando excessos de petiscos. Controle de porções previne sobrepeso e problemas articulares.",
      "Hidratação constante é fundamental. Ofereça água limpa e fresca ao longo do dia, especialmente em dias quentes ou após atividades físicas.",
      "Exercícios diários queimam energia e melhoram o humor. Caminhadas, brincadeiras de busca, jogos de farejar e brinquedos de enriquecimento mental mantêm corpo e mente ativos.",
      "Higiene também é saúde: escovação de pelos, cuidados com orelhas, banhos na frequência indicada e higiene bucal regular reduzem riscos de dermatites e doenças dentárias.",
      "Previna em vez de remediar: mantenha calendário de vacinas e vermifugação em dia, faça check-ups e observe mudanças de apetite, comportamento e mobilidade.",
      "Socialização positiva com pessoas e outros cães torna o animal mais confiante. Reforço positivo acelera aprendizados e fortalece o vínculo.",
      "Com rotina simples e consistente, você ganha um parceiro mais calmo, saudável e feliz — e muitos anos de boas memórias."
    ]
  },
  {
    slug: "mitos-verdades-pets",
    title: "Mitos e verdades sobre pets",
    subtitle: "O que a ciência e a prática mostram no cuidado diário",
    image: "/imgs/articles/mitos.png",
    date: "18/06/2025",
    paragraphs: [
      "No dia a dia com pets, surgem muitas crenças populares. Separar mito de verdade evita erros e melhora o cuidado.",
      "“Gato não gosta de carinho” é mito. Eles gostam de afeto, mas preferem contato nos seus termos. Observe sinais de conforto e respeite quando se afastam.",
      "“Todo cachorro precisa de banho semanal” não é regra. A frequência depende de raça, tipo de pelagem, clima e estilo de vida. Banho em excesso pode ressecar a pele.",
      "“Ração faz mal” é mito. Rações de qualidade são balanceadas. O problema geralmente é quantidade inadequada ou produto de baixa qualidade.",
      "“Pets idosos não aprendem” também é mito. Aprendem, sim — com paciência, treinos curtos e reforço positivo.",
      "“Animais não sentem frio ou calor como nós” é falso. Eles sofrem com extremos e precisam de abrigo, hidratação e ambiente adequado.",
      "Quando em dúvida, busque fontes confiáveis e orientação veterinária. Informação correta é aliada de um convívio mais harmonioso.",
      "Ao derrubar mitos, abrimos espaço para rotinas mais leves, saudáveis e alinhadas às necessidades reais dos nossos companheiros."
    ]
  },
  {
    slug: "dicas-adocao-pets",
    title: "Dicas de adoção",
    subtitle: "Passos práticos para adotar com responsabilidade e carinho",
    image: "/imgs/articles/adocao.png",
    date: "01/06/2025",
    paragraphs: [
      "Adotar um pet transforma vidas — a sua e a dele. Mas é uma decisão que pede responsabilidade, planejamento e paciência para a adaptação.",
      "Antes de tudo, avalie sua rotina: tempo para passeios, brincadeiras e cuidados, além do orçamento para alimentação, higiene e veterinário. Pets são compromisso de longo prazo.",
      "Procure ONGs e abrigos, converse com voluntários e descreva seu estilo de vida. Eles indicam perfis que combinam com você — filhotes exigem mais energia; adultos tendem a ser mais previsíveis.",
      "No processo, verifique histórico de saúde, vacinação e castração. Pergunte sobre comportamento, medos e preferências. Quanto mais informações, melhor a adaptação.",
      "Prepare a casa: caminha, água, comida, caixas de areia (para gatos), arranhadores, brinquedos e identificação com contato são essenciais.",
      "Tenha paciência: alguns animais vêm de experiências difíceis e precisam de tempo para confiar. Reforço positivo, rotina previsível e carinho constante aceleram o processo.",
      "Faça a primeira consulta com veterinário de confiança. O check-up inicial ajuda a montar plano de alimentação, prevenção e ajustes comportamentais.",
      "Adotar é abrir o coração, as recompensas vêm em forma de companhia fiel, histórias compartilhadas e muito amor incondicional."
    ]
  }
];

export default articles;