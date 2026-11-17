"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ILLUSTRATIVE_PIPELINE } from "@/data/bjb-content";
import { ArrowIcon } from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

export function PipelineSection() {
  const [activeStage, setActiveStage] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (lineRef.current && sectionRef.current) {
          gsap.fromTo(
            lineRef.current,
            { strokeDashoffset: 1000 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "center 45%",
                scrub: 0.7,
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

  const handleStageKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (idx + 1) % ILLUSTRATIVE_PIPELINE.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (idx - 1 + ILLUSTRATIVE_PIPELINE.length) % ILLUSTRATIVE_PIPELINE.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = ILLUSTRATIVE_PIPELINE.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveStage(next);
    tabRefs.current[next]?.focus();
  };

  const current = ILLUSTRATIVE_PIPELINE[activeStage];

  return (
    <section
      id="fluxo"
      ref={sectionRef}
      aria-labelledby="fluxo-heading"
      className="relative border-y border-[#DDD1B9]/15 bg-[#211914] py-24 text-[#EEE7D8] lg:py-32"
    >
      <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="fluxo-heading"
              className="m-0 text-[clamp(2rem,3.8vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Tecnologia trabalhando em conjunto, do primeiro contato à gestão.
            </h2>
            <p className="mt-4 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-[#D9A566]/45 bg-[#2A211B] px-3.5 py-1.5 text-[11.5px] font-medium tracking-[0.04em] text-[#D9A566] sm:rounded-full sm:text-[12px]">
              <span>EXEMPLO ILUSTRATIVO</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>EMPRESA DE SERVIÇOS COM PEDIDOS DE ORÇAMENTO</span>
            </p>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-[#DDD1B9]/85">
              Em vez de ferramentas isoladas que exigem cópia manual, cada etapa entrega o contexto
              pronto para a etapa seguinte. Selecione qualquer estágio abaixo para inspecionar o
              fluxo.
            </p>
          </div>
        </div>

        {/* Connected 4-stage horizontal stepper on desktop, vertical on mobile */}
        <div className="relative mt-14">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[10%] top-[27px] hidden h-3 w-[80%] lg:block"
          >
            <line
              x1="0"
              y1="6"
              x2="1000"
              y2="6"
              stroke="rgba(221, 209, 185, 0.2)"
              strokeWidth="1.5"
            />
            <line
              ref={lineRef}
              x1="0"
              y1="6"
              x2="1000"
              y2="6"
              stroke="#D9A566"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="0"
            />
          </svg>

          <div
            role="tablist"
            aria-label="Estágios da solução integrada"
            className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {ILLUSTRATIVE_PIPELINE.map((item, idx) => {
              const isSelected = idx === activeStage;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`pipeline-tab-${item.id}`}
                  aria-selected={isSelected}
                  aria-controls="pipeline-stage-readout"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveStage(idx)}
                  onKeyDown={(e) => handleStageKeyDown(e, idx)}
                  className={`flex flex-col items-start rounded-xl border p-5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] ${
                    isSelected
                      ? "border-[#D9A566] bg-[#2A211B] shadow-[0_14px_34px_rgba(0,0,0,0.35)]"
                      : "border-[#DDD1B9]/18 bg-[#2A211B]/55 hover:border-[#DDD1B9]/40"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full tabular-nums text-[13px] font-medium transition-colors ${
                        isSelected
                          ? "bg-[#D9A566] text-[#2A211B]"
                          : "border border-[#DDD1B9]/30 bg-[#211914] text-[#DDD1B9]"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-[#DDD1B9]/80">
                      {idx < ILLUSTRATIVE_PIPELINE.length - 1 ? (
                        <>
                          <span>Passa para</span>
                          <ArrowIcon direction="right" className="h-3 w-3 shrink-0" />
                        </>
                      ) : (
                        "Consolida"
                      )}
                    </span>
                  </div>

                  <span className="mt-5 text-[22px] font-medium tracking-[-0.02em] text-[#EEE7D8]">
                    {item.stage}
                  </span>
                  <span className="mt-1 text-[14px] text-[#D9A566]">{item.service}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail readout */}
        <div
          id="pipeline-stage-readout"
          role="tabpanel"
          aria-labelledby={`pipeline-tab-${current.id}`}
          className="bjb-glass-panel mt-6 rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.05em] text-[#D9A566]">
                <span className="tabular-nums">Etapa {current.step}</span>
                <span aria-hidden="true">·</span>
                <span>{current.stage}</span>
              </div>
              <p className="mt-3 text-[clamp(1.3rem,2vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-[#EEE7D8]">
                {current.action}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[#DDD1B9]/15 pt-6 sm:grid-cols-2 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#DDD1B9]/75">
                  Continuidade sem retrabalho
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-[#EEE7D8]/90">
                  {current.handoff}
                </p>
              </div>
              <div>
                <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#DDD1B9]/75">
                  O que fica registrado
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-[#D9A566]">
                  {current.signalLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#DDD1B9]/15 pt-5">
            <p className="m-0 text-[13px] text-[#DDD1B9]/75">
              * Fluxo ilustrativo de arquitetura integrada. O desenho real segue os canais e regras
              de cada cliente.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveStage((prev) =>
                    prev === 0 ? ILLUSTRATIVE_PIPELINE.length - 1 : prev - 1
                  )
                }
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#DDD1B9]/30 px-4 text-[13px] text-[#EEE7D8] transition-colors hover:border-[#D9A566] hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
              >
                <ArrowIcon direction="left" className="h-3.5 w-3.5 shrink-0" />
                <span>Etapa anterior</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveStage((prev) => (prev + 1) % ILLUSTRATIVE_PIPELINE.length)
                }
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#D9A566] px-4 text-[13px] font-medium text-[#2A211B] transition-colors hover:bg-[#E5B87E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
              >
                <span>Próxima etapa</span>
                <ArrowIcon direction="right" className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
