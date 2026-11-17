import { NextRequest, NextResponse } from "next/server";

interface DiagnosticPayload {
  nome?: unknown;
  empresa?: unknown;
  segmento?: unknown;
  contato?: unknown;
  gargalos?: unknown;
  rotina?: unknown;
}

const SEGMENT_LABELS: Record<string, string> = {
  servicos: "Prestação de serviços",
  comercio: "Comércio local",
  atendimento: "Vendas por atendimento",
  outro: "Outra operação PME",
};

const SERVICE_MAP: Record<string, string> = {
  atendimento: "Automação de atendimento + IA sob revisão humana",
  rotinas: "Integrações entre ferramentas e eliminação de retrabalho",
  informacoes: "Dashboard operacional com visão consolidada",
  captacao: "Landing page ou portal estruturado para captação",
};

export async function POST(request: NextRequest) {
  let body: DiagnosticPayload;
  try {
    body = (await request.json()) as DiagnosticPayload;
  } catch {
    return NextResponse.json(
      { error: "Não foi possível ler os dados enviados. Tente novamente." },
      { status: 400 }
    );
  }

  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const empresa = typeof body.empresa === "string" ? body.empresa.trim() : "";
  const segmento = typeof body.segmento === "string" ? body.segmento.trim() : "";
  const contato = typeof body.contato === "string" ? body.contato.trim() : "";
  const rotina = typeof body.rotina === "string" ? body.rotina.trim() : "";
  const gargalos = Array.isArray(body.gargalos)
    ? body.gargalos.filter((item): item is string => typeof item === "string")
    : [];

  const fieldErrors: Record<string, string> = {};
  if (nome.length < 2) {
    fieldErrors.nome = "Informe seu nome completo para identificarmos o retorno.";
  }
  if (empresa.length < 2) {
    fieldErrors.empresa = "Informe o nome da empresa ou operação.";
  }
  if (!SEGMENT_LABELS[segmento]) {
    fieldErrors.segmento = "Selecione o perfil mais próximo da sua empresa.";
  }
  if (contato.length < 5) {
    fieldErrors.contato = "Informe um e-mail ou telefone/WhatsApp válido para retorno.";
  }
  if (gargalos.length === 0) {
    fieldErrors.gargalos = "Marque ao menos um gargalo que hoje consome tempo da equipe.";
  }
  if (rotina.length < 15) {
    fieldErrors.rotina =
      "Descreva em pelo menos uma frase curta como o processo funciona hoje.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        error: "Revise os campos destacados antes de registrar o diagnóstico.",
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const protocolo = `BJB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const recomendacoes = gargalos
    .map((key) => SERVICE_MAP[key])
    .filter((value): value is string => Boolean(value));

  return NextResponse.json(
    {
      ok: true,
      protocolo,
      recebidoEm: new Date().toISOString(),
      resumo: {
        nome,
        empresa,
        segmento: SEGMENT_LABELS[segmento],
        contato,
        frentesCombinadas:
          recomendacoes.length > 0
            ? recomendacoes
            : ["Diagnóstico inicial e desenho de escopo piloto"],
        proximoPasso:
          "Etapa 01 — Diagnóstico e escopo: alinhar o problema principal, definir entregas, prazo e critério de aceite com o responsável.",
      },
    },
    { status: 201 }
  );
}
