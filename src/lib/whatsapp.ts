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

export type DiagnosticSubmissionOutcome =
  | { status: "ok"; result: DiagnosticResult }
  | { status: "fallback"; result: DiagnosticResult }
  | { status: "validation_error"; error: string; fieldErrors: Record<string, string> };

function isDiagnosticResult(value: unknown): value is DiagnosticResult {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (
    record.ok !== true ||
    typeof record.protocolo !== "string" ||
    !record.protocolo ||
    typeof record.whatsappUrl !== "string" ||
    !record.whatsappUrl ||
    typeof record.mensagem !== "string" ||
    !record.mensagem ||
    !record.resumo ||
    typeof record.resumo !== "object"
  ) {
    return false;
  }

  const resumo = record.resumo as Record<string, unknown>;
  return (
    typeof resumo.nome === "string" &&
    typeof resumo.objetivo === "string" &&
    typeof resumo.proximoPasso === "string" &&
    Array.isArray(resumo.produtos) &&
    resumo.produtos.every((item) => typeof item === "string")
  );
}

/**
 * Registers the contact request with a timeout and guarantees a valid fallback handoff payload.
 */
export async function requestDiagnosticWithFallback(
  data: ValidatedContactInput,
  localFallback: DiagnosticResult,
  fetchFn: typeof fetch = fetch,
  timeoutMs = 3000
): Promise<DiagnosticSubmissionOutcome> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchFn("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        nome: data.nome,
        produtos: data.produtos,
        objetivo: data.objetivo,
      }),
    });

    const payload = (await response.json()) as {
      error?: string;
      fieldErrors?: Record<string, string>;
    };

    if (!response.ok) {
      if (response.status === 422 && payload.fieldErrors) {
        return {
          status: "validation_error",
          error:
            payload.error ??
            "Revise os campos destacados antes de continuar para o WhatsApp.",
          fieldErrors: payload.fieldErrors,
        };
      }
      return { status: "fallback", result: localFallback };
    }

    if (isDiagnosticResult(payload)) {
      return { status: "ok", result: payload };
    }

    return { status: "fallback", result: localFallback };
  } catch {
    return { status: "fallback", result: localFallback };
  } finally {
    clearTimeout(timer);
  }
}
