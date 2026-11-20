export const WHATSAPP_PHONE = "5581982240109";

export const PRODUCT_OPTIONS = [
  {
    id: "landing-sistemas",
    title: "Landing pages e sistemas digitais",
    tag: "Sites",
  },
  {
    id: "automacao",
    title: "Automação de atendimento",
    tag: "Automação",
  },
  {
    id: "inteligencia-artificial",
    title: "Inteligência artificial",
    tag: "IA",
  },
  {
    id: "integracoes",
    title: "Integrações",
    tag: "Integração",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    tag: "Painéis",
  },
] as const;

export type ProductId = (typeof PRODUCT_OPTIONS)[number]["id"];

export const PRODUCT_LABELS: Record<string, string> = Object.fromEntries(
  PRODUCT_OPTIONS.map((item) => [item.id, item.title])
);

export interface ContactInput {
  nome?: unknown;
  produtos?: unknown;
  objetivo?: unknown;
}

export interface ValidatedContactInput {
  nome: string;
  produtos: ProductId[];
  produtosNomes: string[];
  objetivo: string;
}

export type ContactValidationResult =
  | { ok: true; data: ValidatedContactInput }
  | { ok: false; fieldErrors: Record<string, string> };

/**
 * Validates and normalizes the three mandatory contact fields before generating a WhatsApp handoff.
 */
export function validateContactInput(input: ContactInput): ContactValidationResult {
  const payload = input && typeof input === "object" ? input : {};
  const nome = typeof payload.nome === "string" ? payload.nome.trim() : "";
  const objetivo = typeof payload.objetivo === "string" ? payload.objetivo.trim() : "";

  const seen = new Set<ProductId>();
  if (Array.isArray(payload.produtos)) {
    for (const item of payload.produtos) {
      if (typeof item === "string" && Object.hasOwn(PRODUCT_LABELS, item)) {
        seen.add(item as ProductId);
      }
    }
  }
  const produtos = Array.from(seen);

  const fieldErrors: Record<string, string> = {};
  if (nome.length < 2) {
    fieldErrors.nome = "Informe seu nome para iniciarmos a conversa.";
  }
  if (produtos.length === 0) {
    fieldErrors.produtos = "Selecione pelo menos um tipo de produto que você busca.";
  }
  if (objetivo.length < 5) {
    fieldErrors.objetivo = "Descreva brevemente qual é o seu objetivo.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      nome,
      produtos,
      produtosNomes: produtos.map((id) => PRODUCT_LABELS[id]),
      objetivo,
    },
  };
}

/**
 * Builds the pre-filled WhatsApp message starting with "Olá BJB!".
 */
export function buildWhatsAppMessage(data: ValidatedContactInput): string {
  return [
    "Olá BJB! Vim pelo site e gostaria de falar com os desenvolvedores.",
    "",
    `*Nome:* ${data.nome}`,
    `*Produto(s) de interesse:* ${data.produtosNomes.join(", ")}`,
    `*Objetivo:* ${data.objetivo}`,
  ].join("\n");
}

/**
 * Builds the wa.me URL for +5581982240109 with the encoded pre-filled message.
 */
export function buildWhatsAppUrl(data: ValidatedContactInput): string {
  const message = buildWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export interface DiagnosticResult {
  ok: boolean;
  protocolo: string;
  recebidoEm: string;
  whatsappUrl: string;
  mensagem: string;
  resumo: {
    nome: string;
    produtos: string[];
    objetivo: string;
    proximoPasso: string;
  };
}

/**
 * Creates a standardized protocol and WhatsApp handoff response payload.
 */
export function buildDiagnosticResult(data: ValidatedContactInput): DiagnosticResult {
  const protocolo = `BJB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return {
    ok: true,
    protocolo,
    recebidoEm: new Date().toISOString(),
    whatsappUrl: buildWhatsAppUrl(data),
    mensagem: buildWhatsAppMessage(data),
    resumo: {
      nome: data.nome,
      produtos: data.produtosNomes,
      objetivo: data.objetivo,
      proximoPasso:
        "Conversa iniciada no WhatsApp com os desenvolvedores para entender suas dores e desenhar a melhor proposta.",
    },
  };
}
