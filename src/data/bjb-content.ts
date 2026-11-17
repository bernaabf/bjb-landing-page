export interface ProblemItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  symptom: string;
  impact: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tag: "Sites" | "Automação" | "IA" | "Integração" | "Painéis";
  description: string;
  deliverables: string[];
}

export interface PipelineStage {
  id: string;
  step: string;
  stage: string;
  service: string;
  action: string;
  handoff: string;
  signalLabel: string;
}

export interface MethodStep {
  step: string;
  title: string;
  description: string;
  validationRule: string;
}

export interface SegmentItem {
  id: string;
  title: string;
  context: string;
  exampleNeed: string;
}

export interface TeamMember {
  id: string;
  index: string;
  initials: string;
  name: string;
  badge: string;
  role: string;
  detailLabel: string;
  detailText: string;
}

export const NAV_LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#fluxo", label: "Fluxo" },
  { href: "#metodo", label: "Método" },
  { href: "#publico", label: "Público" },
] as const;

export const PROBLEMS: ProblemItem[] = [
  {
    id: "atendimento",
    index: "01",
    title: "Atendimento sobrecarregado",
    summary:
      "Dúvidas repetitivas e contatos sem acompanhamento consomem o tempo da equipe.",
    symptom: "Perguntas básicas ocupam quem deveria fechar orçamentos.",
    impact: "Demora na primeira resposta e perda de continuidade nas conversas.",
  },
  {
    id: "rotinas",
    index: "02",
    title: "Rotinas manuais",
    summary:
      "Cadastros, agendamentos e atualizações exigem tarefas repetidas em várias ferramentas.",
    symptom: "A mesma informação é digitada em planilhas, agenda e sistema comercial.",
    impact: "Retrabalho diário e falhas de preenchimento entre setores.",
  },
  {
    id: "informacoes",
    index: "03",
    title: "Informações dispersas",
    summary:
      "Conversas, planilhas e sistemas separados dificultam acompanhar a operação.",
    symptom: "Ninguém enxerga com clareza quais contatos aguardam retorno.",
    impact: "Decisões operacionais baseadas em percepção, não em registros.",
  },
  {
    id: "captacao",
    index: "04",
    title: "Captação pouco estruturada",
    summary:
      "Falta um caminho claro para apresentar a oferta, receber contatos e encaminhá-los.",
    symptom: "Visitantes chegam sem contexto ou desistem antes de solicitar contato.",
    impact: "Propostas chegam incompletas e exigem triagem manual extensa.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "landing-sistemas",
    index: "01",
    title: "Landing pages e sistemas digitais",
    tag: "Sites",
    description:
      "Páginas para captar contatos, formulários, portais e sistemas de gestão sob medida.",
    deliverables: [
      "Apresentação objetiva da oferta",
      "Formulários e portais adaptados à rotina",
      "Sistemas sob medida para controle interno",
    ],
  },
  {
    id: "automacao",
    index: "02",
    title: "Automação de atendimento",
    tag: "Automação",
    description:
      "Triagem, respostas recorrentes, agendamentos e encaminhamento para uma pessoa.",
    deliverables: [
      "Coleta estruturada das informações iniciais",
      "Agendamento alinhado à disponibilidade",
      "Encaminhamento contextualizado para a equipe",
    ],
  },
  {
    id: "inteligencia-artificial",
    index: "03",
    title: "Inteligência artificial",
    tag: "IA",
    description:
      "Apoio a respostas, classificação de solicitações e resumos, com revisão conforme o uso.",
    deliverables: [
      "Classificação de pedidos por assunto ou urgência",
      "Apoio a respostas para dúvidas previstas",
      "Resumos de histórico com revisão humana",
    ],
  },
  {
    id: "integracoes",
    index: "04",
    title: "Integrações",
    tag: "Integração",
    description:
      "Conexão entre site, canais de atendimento, agenda, sistema comercial e bases de dados.",
    deliverables: [
      "Registro automático de novos contatos",
      "Sincronização entre agenda e atendimento",
      "Redução de digitação duplicada entre ferramentas",
    ],
  },
  {
    id: "dashboards",
    index: "05",
    title: "Dashboards",
    tag: "Painéis",
    description:
      "Painéis para acompanhar contatos, atendimentos e indicadores definidos com o cliente.",
    deliverables: [
      "Visibilidade de pedidos recebidos e em aberto",
      "Acompanhamento de tempo de resposta",
      "Leitura clara de andamento para a gestão",
    ],
  },
];

export const ILLUSTRATIVE_PIPELINE: PipelineStage[] = [
  {
    id: "captacao",
    step: "01",
    stage: "Captação",
    service: "Landing page e formulário",
    action: "Uma landing page apresenta o serviço e coleta o pedido de orçamento.",
    handoff: "Dados estruturados entram automaticamente na fila de triagem.",
    signalLabel: "Origem e contexto do pedido",
  },
  {
    id: "atendimento",
    step: "02",
    stage: "Atendimento",
    service: "Automação + IA com revisão",
    action:
      "A automação reúne as informações iniciais. A IA apoia dúvidas previstas e encaminha exceções à equipe.",
    handoff: "Casos específicos chegam resumidos para decisão humana.",
    signalLabel: "Triagem inicial e encaminhamento",
  },
  {
    id: "operacao",
    step: "03",
    stage: "Operação",
    service: "Integrações entre ferramentas",
    action:
      "A integração registra o contato no sistema comercial e cria uma tarefa de retorno.",
    handoff: "Sem planilhas paralelas nem cópia manual entre abas.",
    signalLabel: "Registro e tarefa de retorno",
  },
  {
    id: "gestao",
    step: "04",
    stage: "Gestão",
    service: "Dashboard operacional",
    action:
      "Um dashboard reúne pedidos recebidos, tempo de resposta e propostas em acompanhamento.",
    handoff: "A gestão acompanha gargalos com base no uso real.",
    signalLabel: "Pedidos, tempo de resposta e andamento",
  },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    step: "01",
    title: "Diagnóstico e escopo",
    description:
      "Entender a rotina, escolher o problema e acordar entregas, prazo e critério de aceite.",
    validationRule: "O escopo combina apenas os serviços necessários ao problema escolhido.",
  },
  {
    step: "02",
    title: "Construção e validação",
    description:
      "Criar uma primeira versão e testar os fluxos com o responsável do cliente.",
    validationRule: "O cliente valida as regras do negócio antes da entrada em operação.",
  },
  {
    step: "03",
    title: "Implantação",
    description:
      "Conectar as ferramentas, configurar acessos e orientar a equipe para o uso.",
    validationRule: "A equipe entrega, documenta e define os cuidados com dados e acessos.",
  },
  {
    step: "04",
    title: "Acompanhamento",
    description:
      "Monitorar o funcionamento, corrigir falhas e propor melhorias com base no uso.",
    validationRule: "Contrato opcional com limites e responsabilidades definidos.",
  },
];

export const TARGET_SEGMENTS: SegmentItem[] = [
  {
    id: "servicos",
    title: "Prestadores de serviços",
    context: "Empresas que recebem pedidos de orçamento e precisam organizar triagem e retorno.",
    exampleNeed: "Captação clara, resumo do pedido e tarefa automática para a equipe.",
  },
  {
    id: "comercios",
    title: "Comércios locais",
    context: "Negócios com volume recorrente de dúvidas, agendamentos ou pedidos no dia a dia.",
    exampleNeed: "Respostas rápidas para dúvidas frequentes sem perder o toque humano.",
  },
  {
    id: "vendas-atendimento",
    title: "Negócios com vendas por atendimento",
    context: "Operações onde cada conversa precisa ser registrada e acompanhada até a proposta.",
    exampleNeed: "Centralização de contatos entre canal de atendimento e sistema comercial.",
  },
];

export const PILOT_CRITERIA = [
  "Problema recorrente e bem definido",
  "Responsável disponível para validar os fluxos",
  "Processo com resultado observável no dia a dia",
] as const;

export const EXPECTED_VALUE = [
  {
    title: "Menos tarefas manuais",
    detail: "Eliminação de cadastros duplicados entre mensagens, planilhas e agenda.",
  },
  {
    title: "Atendimento organizado",
    detail: "Triagem inicial estruturada com encaminhamento claro para a equipe.",
  },
  {
    title: "Informações acessíveis para a gestão",
    detail: "Registro unificado de contatos, atendimentos e propostas em andamento.",
  },
] as const;

export const TRACKABLE_INDICATORS = [
  {
    name: "Tempo de resposta",
    note: "Exemplo de indicador: comparação entre o tempo inicial de retorno e após a triagem integrada.",
  },
  {
    name: "Retrabalho operacional",
    note: "Exemplo de indicador: redução de etapas repetidas de digitação entre ferramentas.",
  },
  {
    name: "Andamento dos contatos",
    note: "Exemplo de indicador: visibilidade sobre pedidos recebidos, em atendimento e aguardando retorno.",
  },
] as const;

export const COMMERCIAL_MODEL = [
  {
    title: "Implantação por projeto",
    summary:
      "Cobrança pelo diagnóstico, desenvolvimento e entrada em operação, conforme o escopo acordado.",
  },
  {
    title: "Acompanhamento recorrente",
    summary:
      "Contrato opcional para suporte, manutenção e melhorias, com limites e responsabilidades definidos.",
  },
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "bernardo-carneiro",
    index: "01",
    initials: "BC",
    name: "Bernardo Carneiro",
    badge: "Sócio · Desenvolvimento",
    role: "Desenvolvedor de Software FullStack",
    detailLabel: "Formação",
    detailText: "Curso: Ciência da Computação",
  },
  {
    id: "joao-chaves",
    index: "02",
    initials: "JVC",
    name: "João V. Chaves",
    badge: "Sócio · Engenharia",
    role: "Engenheiro de Controle e Automação",
    detailLabel: "Especialidade técnica",
    detailText: "Conhecimento forte em IoT e Hardware",
  },
  {
    id: "bernardo-ferreira",
    index: "03",
    initials: "BF",
    name: "Bernardo Ferreira",
    badge: "Sócio · Operação & Segurança",
    role: "Responsável pela Gestão, Direcionamento e Operação",
    detailLabel: "Frentes técnicas",
    detailText: "Cibersegurança e Desenvolvimento de features",
  },
];
