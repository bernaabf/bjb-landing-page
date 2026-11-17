"use client";

import { useState, type FormEvent } from "react";
import {
  COMMERCIAL_MODEL,
  EXPECTED_VALUE,
  PROBLEMS,
  TRACKABLE_INDICATORS,
} from "@/data/bjb-content";

interface DiagnosticResponse {
  ok: boolean;
  protocolo: string;
  recebidoEm: string;
  resumo: {
    nome: string;
    empresa: string;
    segmento: string;
    contato: string;
    frentesCombinadas: string[];
    proximoPasso: string;
  };
}

export function ValueSection() {
  return (
    <section
      aria-labelledby="valor-heading"
      className="relative border-t border-[#DDD1B9]/15 bg-[#211914] py-24 text-[#EEE7D8] lg:py-32"
    >
      <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2
              id="valor-heading"
              className="m-0 text-[clamp(2rem,3.6vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Clareza sobre a operação — medida antes e depois da implantação.
            </h2>

            <div className="mt-10 space-y-6">
              {EXPECTED_VALUE.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-[#DDD1B9]/14 pb-6 last:border-b-0"
                >
                  <h3 className="m-0 text-[21px] font-medium tracking-[-0.02em] text-[#EEE7D8]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-[1.55] text-[#DDD1B9]/85">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-6 lg:pl-6">
            <div className="bjb-glass-panel rounded-2xl p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDD1B9]/15 pb-4">
                <h3 className="m-0 text-[18px] font-medium text-[#EEE7D8]">
                  Como acompanhamos evolução
                </h3>
                <span className="rounded-full border border-[#D9A566]/50 px-3 py-0.5 text-[11.5px] text-[#D9A566]">
                  Exemplos de métricas
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {TRACKABLE_INDICATORS.map((ind) => (
                  <div key={ind.name} className="rounded-xl bg-[#211914]/70 p-4">
                    <p className="m-0 text-[15.5px] font-medium text-[#D9A566]">{ind.name}</p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#DDD1B9]/85">
                      {ind.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#DDD1B9]/18 bg-[#2A211B] p-7 sm:p-8">
              <h3 className="m-0 text-[18px] font-medium text-[#EEE7D8]">
                Modelo comercial
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {COMMERCIAL_MODEL.map((model) => (
                  <div key={model.title}>
                    <h4 className="m-0 text-[16.5px] font-medium text-[#D9A566]">
                      {model.title}
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-[1.55] text-[#DDD1B9]/90">
                      {model.summary}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-[#DDD1B9]/15 pt-4 text-[13px] leading-[1.5] text-[#DDD1B9]/80">
                Preço e viabilidade dependem do esforço, do suporte e dos custos de hospedagem,
                canais e uso de IA definidos em escopo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConversionSection() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState("servicos");
  const [contato, setContato] = useState("");
  const [gargalos, setGargalos] = useState<string[]>(["atendimento"]);
  const [rotina, setRotina] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleGargalo = (id: string) => {
    setGargalos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          empresa,
          segmento,
          contato,
          gargalos,
          rotina,
        }),
      });

      const payload = (await response.json()) as Partial<DiagnosticResponse> & {
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok) {
        setFormError(
          payload.error ?? "Não foi possível registrar o diagnóstico. Revise os campos."
        );
        if (payload.fieldErrors) {
          setFieldErrors(payload.fieldErrors);
        }
        return;
      }

      if (payload.ok && payload.resumo && payload.protocolo) {
        setResult(payload as DiagnosticResponse);
      }
    } catch {
      setFormError(
        "Erro de conexão ao registrar seu pedido. Verifique sua rede e tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    const text = [
      `Protocolo BJB Growth: ${result.protocolo}`,
      `Empresa: ${result.resumo.empresa} (${result.resumo.segmento})`,
      `Responsável: ${result.resumo.nome}`,
      `Contato para retorno: ${result.resumo.contato}`,
      `Frentes sugeridas: ${result.resumo.frentesCombinadas.join(" | ")}`,
      `Rotina relatada: ${rotina}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-heading"
      className="bjb-cross-ground relative overflow-hidden border-t border-[#DDD1B9]/15 py-24 text-[#EEE7D8] lg:py-32"
    >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-[560px] w-[640px] opacity-35 [mask-image:radial-gradient(closest-side,black_35%,transparent_100%)]"
        >
          <img
            src="/assets/plates/atmospheric-veil.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2
                id="diagnostico-heading"
                className="m-0 text-[clamp(2.2rem,4vw,3.75rem)] font-medium leading-[1.03] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
              >
                Conte qual rotina trava sua equipe hoje.
              </h2>
              <p className="mt-5 max-w-[40ch] text-[16.5px] leading-[1.55] text-[#DDD1B9]">
                Conversamos para entender o processo, escolher um problema bem definido e desenhar
                um piloto com entregas, prazo e critério de aceite acordados.
              </p>

              <div className="mt-10 space-y-3 border-t border-[#DDD1B9]/18 pt-6 text-[14.5px] text-[#DDD1B9]/85">
                <p className="m-0">
                  <strong className="font-medium text-[#EEE7D8]">Sem compromisso genérico:</strong>{" "}
                  avaliamos viabilidade técnica, custos de canais e aderência à sua operação real.
                </p>
                <p className="m-0">
                  <strong className="font-medium text-[#EEE7D8]">Resposta objetiva:</strong> ao
                  enviar, você recebe um protocolo imediato com o pré-escopo das frentes sugeridas.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bjb-glass-panel rounded-2xl p-6 sm:p-9">
                {result ? (
                  <div role="status" aria-live="polite" className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDD1B9]/20 pb-5">
                      <div>
                        <h3 className="m-0 text-[24px] font-medium tracking-[-0.02em] text-[#EEE7D8]">
                          Pré-escopo preparado · {result.protocolo}
                        </h3>
                        <p className="mt-1 text-[13.5px] text-[#DDD1B9]/85">
                          Resumo estruturado gerado nesta sessão para você copiar e encaminhar.
                        </p>
                      </div>
                      <span className="rounded-full bg-[#4B4F3A] px-3.5 py-1 text-[12.5px] font-medium text-[#EEE7D8]">
                        Etapa 01 · Pronta para envio
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-[#211914]/75 p-4">
                        <p className="m-0 text-[12px] uppercase tracking-[0.05em] text-[#DDD1B9]/80">
                          Empresa e perfil
                        </p>
                        <p className="mt-1.5 text-[16px] font-medium text-[#EEE7D8]">
                          {result.resumo.empresa}
                        </p>
                        <p className="mt-0.5 text-[14px] text-[#DDD1B9]/85">
                          {result.resumo.segmento} · {result.resumo.nome}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#211914]/75 p-4">
                        <p className="m-0 text-[12px] uppercase tracking-[0.05em] text-[#DDD1B9]/80">
                          Contato informado para retorno
                        </p>
                        <p className="mt-1.5 text-[16px] font-medium text-[#D9A566]">
                          {result.resumo.contato}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="m-0 text-[12.5px] font-medium uppercase tracking-[0.05em] text-[#D9A566]">
                        Frentes preliminares combinadas
                      </p>
                      <ul className="m-0 mt-3 list-none space-y-2 p-0">
                        {result.resumo.frentesCombinadas.map((frente) => (
                          <li
                            key={frente}
                            className="rounded-lg border border-[#DDD1B9]/15 bg-[#2A211B]/65 px-4 py-2.5 text-[15px] text-[#EEE7D8]"
                          >
                            {frente}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="m-0 text-[14.5px] leading-[1.5] text-[#DDD1B9]">
                      {result.resumo.proximoPasso} Copie o resumo abaixo para enviar diretamente
                      pelo canal combinado com a equipe BJB Growth.
                    </p>

                    <div className="flex flex-wrap gap-3 border-t border-[#DDD1B9]/15 pt-5">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-[#D9A566] px-6 text-[14.5px] font-medium text-[#2A211B] transition-colors hover:bg-[#E5B87E] focus-visible:outline-2 focus-visible:outline-[#EEE7D8]"
                      >
                        {copied ? "Resumo copiado" : "Copiar resumo do diagnóstico"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setResult(null);
                          setCopied(false);
                        }}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-[#DDD1B9]/30 px-5 text-[14px] text-[#EEE7D8] transition-colors hover:border-[#D9A566] hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
                      >
                        Enviar outro processo
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {formError && (
                      <div
                        role="alert"
                        className="rounded-xl border border-[#D9A566]/45 bg-[#9A4B30]/35 px-4 py-3 text-[14.5px] text-[#EEE7D8]"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="diag-nome"
                          className="block text-[13.5px] font-medium text-[#EEE7D8]"
                        >
                          Seu nome
                        </label>
                        <input
                          id="diag-nome"
                          name="nome"
                          type="text"
                          required
                          autoComplete="name"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Ex.: Mariana Alves"
                          aria-invalid={Boolean(fieldErrors.nome)}
                          className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                        />
                        {fieldErrors.nome && (
                          <p className="mt-1.5 text-[13px] text-[#D9A566]">{fieldErrors.nome}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="diag-empresa"
                          className="block text-[13.5px] font-medium text-[#EEE7D8]"
                        >
                          Nome da empresa
                        </label>
                        <input
                          id="diag-empresa"
                          name="empresa"
                          type="text"
                          required
                          autoComplete="organization"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                          placeholder="Ex.: Clínica / Oficina / Escritório"
                          aria-invalid={Boolean(fieldErrors.empresa)}
                          className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                        />
                        {fieldErrors.empresa && (
                          <p className="mt-1.5 text-[13px] text-[#D9A566]">{fieldErrors.empresa}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="diag-segmento"
                          className="block text-[13.5px] font-medium text-[#EEE7D8]"
                        >
                          Perfil da operação
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="diag-segmento"
                            name="segmento"
                            value={segmento}
                            onChange={(e) => setSegmento(e.target.value)}
                            className="h-11 w-full appearance-none rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 pl-3.5 pr-10 text-[15px] text-[#EEE7D8] focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                          >
                            <option value="servicos">Prestação de serviços</option>
                            <option value="comercio">Comércio local</option>
                            <option value="atendimento">Negócio com vendas por atendimento</option>
                            <option value="outro">Outra operação PME</option>
                          </select>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D9A566]"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="square"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="diag-contato"
                          className="block text-[13.5px] font-medium text-[#EEE7D8]"
                        >
                          Seu e-mail ou WhatsApp para retorno
                        </label>
                        <input
                          id="diag-contato"
                          name="contato"
                          type="text"
                          required
                          value={contato}
                          onChange={(e) => setContato(e.target.value)}
                          placeholder="nome@empresa.com ou (DDD) 9..."
                          aria-invalid={Boolean(fieldErrors.contato)}
                          className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                        />
                        {fieldErrors.contato && (
                          <p className="mt-1.5 text-[13px] text-[#D9A566]">{fieldErrors.contato}</p>
                        )}
                      </div>
                    </div>

                    <fieldset>
                      <legend className="text-[13.5px] font-medium text-[#EEE7D8]">
                        Onde a rotina mais trava hoje?
                      </legend>
                      <div className="mt-2.5 flex flex-wrap gap-2.5">
                        {PROBLEMS.map((prob) => {
                          const checked = gargalos.includes(prob.id);
                          return (
                            <button
                              key={prob.id}
                              type="button"
                              aria-pressed={checked}
                              onClick={() => toggleGargalo(prob.id)}
                              className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] ${
                                checked
                                  ? "bg-[#D9A566] text-[#2A211B]"
                                  : "border border-[#DDD1B9]/25 bg-[#211914]/60 text-[#DDD1B9] hover:border-[#DDD1B9]/55"
                              }`}
                            >
                              {prob.title}
                            </button>
                          );
                        })}
                      </div>
                      {fieldErrors.gargalos && (
                        <p className="mt-2 text-[13px] text-[#D9A566]">{fieldErrors.gargalos}</p>
                      )}
                    </fieldset>

                    <div>
                      <label
                        htmlFor="diag-rotina"
                        className="block text-[13.5px] font-medium text-[#EEE7D8]"
                      >
                        Como esse processo funciona hoje na equipe?
                      </label>
                      <textarea
                        id="diag-rotina"
                        name="rotina"
                        required
                        rows={4}
                        value={rotina}
                        onChange={(e) => setRotina(e.target.value)}
                        placeholder="Descreva em poucas linhas por onde chegam os contatos, o que precisa ser respondido manualmente e onde a informação se perde."
                        aria-invalid={Boolean(fieldErrors.rotina)}
                        className="mt-2 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 p-3.5 text-[15px] leading-[1.5] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                      />
                      {fieldErrors.rotina && (
                        <p className="mt-1.5 text-[13px] text-[#D9A566]">{fieldErrors.rotina}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 border-t border-[#DDD1B9]/15 pt-5 sm:flex-row sm:items-center">
                      <span className="text-[13px] text-[#DDD1B9]/75">
                        Etapa 01 · Diagnóstico e alinhamento de escopo
                      </span>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-[#D9A566] px-7 text-[15px] font-medium text-[#2A211B] transition-colors hover:bg-[#E5B87E] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
                      >
                        {submitting ? "Registrando pedido..." : "Solicitar diagnóstico"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
