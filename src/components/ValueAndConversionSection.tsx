"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import {
  COMMERCIAL_MODEL,
  EXPECTED_VALUE,
  PROBLEMS,
  TRACKABLE_INDICATORS,
} from "@/data/bjb-content";
import {
  BJB_EASE,
  ensureGsapPlugins,
  MOTION_QUERIES,
  prefersReducedMotion,
} from "@/lib/motion";
import { Magnetic } from "./motion/Magnetic";
import { RollText } from "./motion/RollText";
import { SplitReveal } from "./motion/SplitReveal";

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-value-item", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-value-list",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-value-hairline", {
          scaleX: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".bjb-value-list",
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-value-card", {
          y: 24,
          clipPath: "inset(6% 0% 0% 0% round 16px)",
          duration: 0.82,
          stagger: 0.12,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: ".bjb-value-cards",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-metric-well", {
          y: 14,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          delay: 0.15,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-value-cards",
            start: "top 82%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="valor"
      ref={sectionRef}
      aria-labelledby="valor-heading"
      className="relative border-t border-[#DDD1B9]/15 bg-[#211914] py-24 text-[#EEE7D8] lg:py-32"
    >
      <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SplitReveal
              as="h2"
              id="valor-heading"
              variant="lines"
              className="m-0 text-[clamp(2rem,3.6vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Clareza sobre a operação — medida antes e depois da implantação.
            </SplitReveal>

            <div className="bjb-value-list mt-10 space-y-6">
              {EXPECTED_VALUE.map((item, idx) => (
                <div
                  key={item.title}
                  className="bjb-value-item relative pb-6 last:pb-0"
                >
                  <h3 className="m-0 text-[21px] font-medium tracking-[-0.02em] text-[#EEE7D8]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-[1.55] text-[#DDD1B9]/85">
                    {item.detail}
                  </p>
                  {idx < EXPECTED_VALUE.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="bjb-hairline bjb-value-hairline absolute bottom-0 left-0 right-0 h-px bg-[#DDD1B9]/14"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bjb-value-cards space-y-6 lg:col-span-6 lg:pl-6">
            <div className="bjb-value-card bjb-glass-panel rounded-2xl p-7 sm:p-8">
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
                  <div
                    key={ind.name}
                    className="bjb-metric-well rounded-xl border border-transparent bg-[#211914]/70 p-4 transition-colors duration-200 hover:border-[#D9A566]/35"
                  >
                    <p className="m-0 text-[15.5px] font-medium text-[#D9A566]">{ind.name}</p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#DDD1B9]/85">
                      {ind.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bjb-value-card rounded-2xl border border-[#DDD1B9]/18 bg-[#2A211B] p-7 sm:p-8">
              <h3 className="m-0 text-[18px] font-medium text-[#EEE7D8]">Modelo comercial</h3>
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

  const sectionRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-conv-left", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-conv-hairline", {
          scaleX: 0,
          duration: 0.75,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        if (panelRef.current) {
          gsap.from(panelRef.current, {
            y: 24,
            clipPath: "inset(5% 0% 0% 0% round 16px)",
            duration: 0.85,
            ease: BJB_EASE.expoOut,
            clearProps: "transform,clipPath",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 84%",
              once: true,
            },
          });
        }
      });

      mm.add(MOTION_QUERIES.desktopMotion, () => {
        if (veilRef.current) {
          gsap.fromTo(
            veilRef.current,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            }
          );
        }
      });

      mm.add(MOTION_QUERIES.tabletMotion, () => {
        if (veilRef.current) {
          gsap.fromTo(
            veilRef.current,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  // Animate validation alert entrance
  useEffect(() => {
    if (!formError || !errorRef.current) return;
    ensureGsapPlugins();
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      errorRef.current,
      { y: -6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.28, ease: BJB_EASE.editorial, clearProps: "transform,opacity" }
    );
  }, [formError]);

  // Animate protocol confirmation summary when result arrives
  useEffect(() => {
    if (!result || !resultRef.current) return;
    ensureGsapPlugins();
    const blocks = resultRef.current.querySelectorAll<HTMLElement>(".bjb-result-block");
    if (!blocks.length) return;

    if (prefersReducedMotion()) {
      gsap.fromTo(
        blocks,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.2, ease: "power1.out", clearProps: "opacity" }
      );
      return;
    }

    gsap.fromTo(
      blocks,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.42,
        stagger: 0.06,
        ease: BJB_EASE.editorial,
        clearProps: "transform,opacity",
      }
    );
  }, [result]);

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
      ref={sectionRef}
      aria-labelledby="diagnostico-heading"
      className="bjb-cross-ground relative overflow-hidden border-t border-[#DDD1B9]/15 py-24 text-[#EEE7D8] lg:py-32"
    >
      <div
        ref={veilRef}
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
            <SplitReveal
              as="h2"
              id="diagnostico-heading"
              variant="lines"
              className="m-0 text-[clamp(2.2rem,4vw,3.75rem)] font-medium leading-[1.03] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Conte qual rotina trava sua equipe hoje.
            </SplitReveal>
            <p className="bjb-conv-left mt-5 max-w-[40ch] text-[16.5px] leading-[1.55] text-[#DDD1B9]">
              Conversamos para entender o processo, escolher um problema bem definido e desenhar um
              piloto com entregas, prazo e critério de aceite acordados.
            </p>

            <div className="bjb-conv-left relative mt-10 space-y-3 pt-6 text-[14.5px] text-[#DDD1B9]/85">
              <div
                aria-hidden="true"
                className="bjb-hairline bjb-conv-hairline absolute left-0 right-0 top-0 h-px bg-[#DDD1B9]/18"
              />
              <p className="m-0">
                <strong className="font-medium text-[#EEE7D8]">Sem compromisso genérico:</strong>{" "}
                avaliamos viabilidade técnica, custos de canais e aderência à sua operação real.
              </p>
              <p className="m-0">
                <strong className="font-medium text-[#EEE7D8]">Resposta objetiva:</strong> ao enviar,
                você recebe um protocolo imediato com o pré-escopo das frentes sugeridas.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div ref={panelRef} className="bjb-glass-panel rounded-2xl p-6 sm:p-9">
              {result ? (
                <div ref={resultRef} role="status" aria-live="polite" className="space-y-6">
                  <div className="bjb-result-block flex flex-wrap items-center justify-between gap-3 border-b border-[#DDD1B9]/20 pb-5">
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

                  <div className="bjb-result-block grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                  <div className="bjb-result-block">
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

                  <p className="bjb-result-block m-0 text-[14.5px] leading-[1.5] text-[#DDD1B9]">
                    {result.resumo.proximoPasso} Copie o resumo abaixo para enviar diretamente pelo
                    canal combinado com a equipe BJB Growth.
                  </p>

                  <div className="bjb-result-block flex flex-wrap gap-3 border-t border-[#DDD1B9]/15 pt-5">
                    <Magnetic strength={0.18} maxDistance={6}>
                      <button
                        type="button"
                        data-cursor="action"
                        onClick={handleCopySummary}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-[#D9A566] px-6 text-[14.5px] font-medium text-[#2A211B] transition-[background-color,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#EEE7D8]"
                      >
                        {copied ? "Resumo copiado" : "Copiar resumo do diagnóstico"}
                      </button>
                    </Magnetic>
                    <button
                      type="button"
                      data-cursor="action"
                      onClick={() => {
                        setResult(null);
                        setCopied(false);
                      }}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-[#DDD1B9]/30 px-5 text-[14px] text-[#EEE7D8] transition-[border-color,color,transform] duration-200 hover:border-[#D9A566] hover:text-[#D9A566] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
                    >
                      Enviar outro processo
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {formError && (
                    <div
                      ref={errorRef}
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
                        className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 transition-colors duration-200 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
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
                        className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 transition-colors duration-200 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
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
                          className="h-11 w-full appearance-none rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 pl-3.5 pr-10 text-[15px] text-[#EEE7D8] transition-colors duration-200 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
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
                        className="mt-2 h-11 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 px-3.5 text-[15px] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 transition-colors duration-200 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
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
                            data-cursor="action"
                            onClick={() => toggleGargalo(prob.id)}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] ${
                              checked
                                ? "border border-[#D9A566] bg-[#D9A566] text-[#2A211B]"
                                : "border border-[#DDD1B9]/25 bg-[#211914]/60 text-[#DDD1B9] hover:border-[#DDD1B9]/55"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`h-1.5 w-1.5 rounded-full transition-transform duration-200 ${
                                checked
                                  ? "scale-100 bg-[#2A211B]"
                                  : "scale-75 bg-[#D9A566]/65"
                              }`}
                            />
                            <span>{prob.title}</span>
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
                      className="mt-2 w-full rounded-lg border border-[#DDD1B9]/25 bg-[#211914]/80 p-3.5 text-[15px] leading-[1.5] text-[#EEE7D8] placeholder:text-[#DDD1B9]/70 transition-colors duration-200 focus:border-[#D9A566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A566]"
                    />
                    {fieldErrors.rotina && (
                      <p className="mt-1.5 text-[13px] text-[#D9A566]">{fieldErrors.rotina}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-[#DDD1B9]/15 pt-5 sm:flex-row sm:items-center">
                    <span className="text-[13px] text-[#DDD1B9]/75">
                      Etapa 01 · Diagnóstico e alinhamento de escopo
                    </span>
                    <Magnetic strength={0.18} maxDistance={7}>
                      <button
                        type="submit"
                        disabled={submitting}
                        data-cursor="action"
                        className="bjb-roll-link inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-[#D9A566] px-7 text-[15px] font-medium text-[#2A211B] transition-[background-color,opacity,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.98] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
                      >
                        {submitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 animate-pulse rounded-full bg-[#2A211B]"
                            />
                            <span>Registrando pedido...</span>
                          </span>
                        ) : (
                          <RollText className="[&_.bjb-roll-link__clone]:text-[#2A211B]">
                            Solicitar diagnóstico
                          </RollText>
                        )}
                      </button>
                    </Magnetic>
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
