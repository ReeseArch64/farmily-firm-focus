
export type ResourceType = 'curso' | 'playlist' | 'artigo' | 'livro' | 'podcast' | 'video' | 'material' | 'serie' | 'filme' | 'musica';

export interface ExternalResource {
  type: ResourceType;
  title: string;
  url: string;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  bannerImage: string;
  resources: ExternalResource[];
}

export const curriculum: Module[] = [
  {
    id: 'intro-to-family-biz',
    title: 'Fundamentos da Empresa Familiar',
    summary: 'Uma introdução abrangente aos desafios e oportunidades únicos de gerir um negócio onde os laços familiares e profissionais se cruzam. Aprenda sobre o modelo dos Três Círculos e a importância de definir papéis claros.',
    bannerImage: 'https://picsum.photos/seed/family1/800/400',
    resources: [
      { type: 'blog', title: 'O Modelo dos Três Círculos: Entendendo a Dinâmica', url: 'https://hbr.org/1982/07/transferring-power-in-the-family-business' },
      { type: 'book', title: 'Generation to Generation: Life Cycles of the Family Business', url: 'https://www.amazon.com/Generation-Life-Cycles-Family-Business/dp/087584555X' },
      { type: 'playlist', title: 'Introdução à Gestão Familiar', url: 'https://youtube.com/playlist?list=familybiz' }
    ]
  },
  {
    id: 'governance-structures',
    title: 'Estruturas de Governança',
    summary: 'Explore como estabelecer conselhos de família e conselhos de administração eficazes para garantir a longevidade da empresa e a harmonia familiar.',
    bannerImage: 'https://picsum.photos/seed/governance/800/400',
    resources: [
      { type: 'material', title: 'Guia de Melhores Práticas de Governança (IBGC)', url: 'https://www.ibgc.org.br/' },
      { type: 'post', title: 'Como montar o seu primeiro Conselho de Família', url: 'https://example.com/conselho-familia' },
      { type: 'playlist', title: 'Webinars sobre Governança Corporativa', url: 'https://youtube.com/webinars-gov' }
    ]
  },
  {
    id: 'succession-planning',
    title: 'Planejamento de Sucessão',
    summary: 'Prepare a próxima geração para assumir a liderança. Este módulo cobre a identificação de talentos, treinamento e o processo emocional de passar o bastão.',
    bannerImage: 'https://picsum.photos/seed/succession/800/400',
    resources: [
      { type: 'blog', title: '10 Passos para uma Sucessão sem Traumas', url: 'https://example.com/sucessao-10-passos' },
      { type: 'book', title: 'The Succession Solution', url: 'https://example.com/book-succession' },
      { type: 'material', title: 'Checklist de Preparação de Herdeiros', url: 'https://example.com/checklist-herdeiros' }
    ]
  },
  {
    id: 'financial-stewardship',
    title: 'Gestão Financeira e Patrimonial',
    summary: 'Aprenda a separar as finanças da família das finanças da empresa. Foco em sustentabilidade financeira de longo prazo e preservação de patrimônio.',
    bannerImage: 'https://picsum.photos/seed/finance/800/400',
    resources: [
      { type: 'post', title: 'Dividendos vs. Reinvestimento: O Dilema Familiar', url: 'https://example.com/finance-family' },
      { type: 'playlist', title: 'Educação Financeira para Herdeiros', url: 'https://youtube.com/finance-heirs' },
      { type: 'material', title: 'Modelo de Planilha de Gestão de Fluxo de Caixa', url: 'https://example.com/sheet-model' }
    ]
  },
  {
    id: 'conflict-resolution',
    title: 'Resolução de Conflitos',
    summary: 'Técnicas de mediação e comunicação não-violenta aplicadas ao contexto familiar empresarial. Como transformar divergências em oportunidades de crescimento.',
    bannerImage: 'https://picsum.photos/seed/conflict/800/400',
    resources: [
      { type: 'blog', title: 'Mediação de Conflitos em Empresas Familiares', url: 'https://example.com/mediation' },
      { type: 'playlist', title: 'Comunicação Não-Violenta no Trabalho', url: 'https://youtube.com/cnv-business' }
    ]
  },
  {
    id: 'strategic-growth',
    title: 'Crescimento Estratégico e Inovação',
    summary: 'Como manter o espírito empreendedor das gerações fundadoras enquanto profissionaliza a gestão para expansão e inovação constante.',
    bannerImage: 'https://picsum.photos/seed/strategy/800/400',
    resources: [
      { type: 'post', title: 'Intraempreendedorismo Familiar', url: 'https://example.com/intra-family' },
      { type: 'material', title: 'Canvas de Estratégia para Negócios Familiares', url: 'https://example.com/canvas' }
    ]
  }
];
