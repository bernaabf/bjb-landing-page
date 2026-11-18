"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ILLUSTRATIVE_PIPELINE } from "@/data/bjb-content";
import {
  BJB_EASE,
  ensureGsapPlugins,
  MOTION_QUERIES,
  prefersReducedMotion,
} from "@/lib/motion";
import { ArrowIcon } from "./ArrowIcon";
import { Magnetic } from "./motion/Magnetic";
import { SplitReveal } from "./motion/SplitReveal";

const STAGE_DOT_X = [31, 344, 656, 969] as const;

export function PipelineSection() {
  const [activeStage, setActiveStage] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const pulseRingRef = useRef<SVGCircleElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const prevStageRef = useRef(0);
  const isFirstStageEffect = useRef(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-pipeline-intro", {
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

        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { strokeDashoffset: 1000 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "center 45%",
                scrub: 0.7,
              },
            }
          );
        }

        gsap.from(".bjb-pipeline-card", {
          y: 22,
          opacity: 0,
          duration: 0.72,
          stagger: 0.085,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-pipeline-grid",
            start: "top 82%",
            once: true,
          },
        });

        if (readoutRef.current) {
          gsap.from(readoutRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.75,
            ease: BJB_EASE.editorial,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: readoutRef.current,
              start: "top 86%",
              once: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  // Glide signal pulse dot & animate readout directionally on stage change
  useEffect(() => {
    ensureGsapPlugins();
    const reduced = prefersReducedMotion();
    const targetX = STAGE_DOT_X[activeStage] ?? STAGE_DOT_X[0];
    const dot = pulseDotRef.current;
    const ring = pulseRingRef.current;

    if (dot && ring) {
      gsap.killTweensOf([dot, ring]);
      if (reduced || isFirstStageEffect.current) {
        gsap.set([dot, ring], { attr: { cx: targetX } });
      } else {
        gsap.to([dot, ring], {
          attr: { cx: targetX },
          duration: 0.48,
          ease: BJB_EASE.expoOut,
        });
      }
    }

    if (isFirstStageEffect.current) {
      isFirstStageEffect.current = false;
      prevStageRef.current = activeStage;
      return;
    }

    const prev = prevStageRef.current;
    prevStageRef.current = activeStage;

    // Determine natural directional slide including wrap-around
    let dir = activeStage >= prev ? 1 : -1;
    if (prev === ILLUSTRATIVE_PIPELINE.length - 1 && activeStage === 0) dir = 1;
    if (prev === 0 && activeStage === ILLUSTRATIVE_PIPELINE.length - 1) dir = -1;

    const readout = readoutRef.current;
    if (!readout) return;

    const blocks = readout.querySelectorAll<HTMLElement>(".bjb-pipeline-readout-block");
    gsap.killTweensOf(blocks);

    if (reduced) {
      gsap.fromTo(
        blocks,
        { opacity: 0.55 },
        { opacity: 1, duration: 0.18, ease: "power1.out", clearProps: "opacity" }
      );
      return;
    }

    gsap.fromTo(
      blocks,
      { x: dir * 18, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.36,
        stagger: 0.045,
        ease: BJB_EASE.editorial,
        clearProps: "transform,opacity",
      }
    );
  }, [activeStage]);

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
            <SplitReveal
              as="h2"
              id="fluxo-heading"
              variant="lines"
              className="m-0 text-[clamp(2rem,3.8vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Tecnologia trabalhando em conjunto, do primeiro contato à gestão.
            </SplitReveal>
            <p className="bjb-pipeline-intro mt-4 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-[#D9A566]/45 bg-[#2A211B] px-3.5 py-1.5 text-[11.5px] font-medium tracking-[0.04em] text-[#D9A566] sm:rounded-full sm:text-[12px]">
              <span>EXEMPLO ILUSTRATIVO</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>EMPRESA DE SERVIÇOS COM PEDIDOS DE ORÇAMENTO</span>
            </p>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="bjb-pipeline-intro m-0 max-w-[44ch] text-[16px] leading-[1.55] text-[#DDD1B9]/85">
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
            viewBox="0 0 1000 16"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[10%] top-[25px] hidden h-4 w-[80%] lg:block"
          >
            <line
              x1="0"
              y1="8"
              x2="1000"
              y2="8"
              stroke="rgba(221, 209, 185, 0.2)"
              strokeWidth="1.5"
            />
            <line
              ref={lineRef}
              x1="0"
              y1="8"
              x2="1000"
              y2="8"
              stroke="#D9A566"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="0"
            />
            <circle
              ref={pulseRingRef}
              cx={STAGE_DOT_X[0]}
              cy="8"
              r="6.5"
              fill="rgba(217, 165, 102, 0.22)"
              stroke="#D9A566"
              strokeWidth="1"
            />
            <circle ref={pulseDotRef} cx={STAGE_DOT_X[0]} cy="8" r="3.5" fill="#D9A566" />
          </svg>

          <div
            role="tablist"
            aria-label="Estágios da solução integrada"
            className="bjb-pipeline-grid relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
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
                  data-cursor="inspect"
                  onClick={() => setActiveStage(idx)}
                  onKeyDown={(e) => handleStageKeyDown(e, idx)}
                  className={`bjb-pipeline-card group flex flex-col items-start rounded-xl border p-5 text-left transition-[border-color,background-color,box-shadow,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] ${
                    isSelected
                      ? "border-[#D9A566] bg-[#2A211B] shadow-[0_14px_34px_rgba(0,0,0,0.35)]"
                      : "border-[#DDD1B9]/18 bg-[#2A211B]/55 hover:-translate-y-0.5 hover:border-[#DDD1B9]/40"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full tabular-nums text-[13px] font-medium transition-colors duration-200 ${
                        isSelected
                          ? "bg-[#D9A566] text-[#2A211B]"
                          : "border border-[#DDD1B9]/30 bg-[#211914] text-[#DDD1B9] group-hover:border-[#D9A566]/60"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-[#DDD1B9]/80">
                      {idx < ILLUSTRATIVE_PIPELINE.length - 1 ? (
                        <>
                          <span>Passa para</span>
                          <ArrowIcon
                            direction="right"
                            className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                          />
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
          ref={readoutRef}
          role="tabpanel"
          aria-labelledby={`pipeline-tab-${current.id}`}
          className="bjb-glass-panel mt-6 overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="bjb-pipeline-readout-block lg:col-span-6">
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
              <div className="bjb-pipeline-readout-block">
                <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#DDD1B9]/75">
                  Continuidade sem retrabalho
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-[#EEE7D8]/90">
                  {current.handoff}
                </p>
              </div>
              <div className="bjb-pipeline-readout-block">
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
              <Magnetic strength={0.18} maxDistance={6}>
                <button
                  type="button"
                  data-cursor="action"
                  onClick={() =>
                    setActiveStage((prev) =>
                      prev === 0 ? ILLUSTRATIVE_PIPELINE.length - 1 : prev - 1
                    )
                  }
                  className="bjb-arrow-btn inline-flex h-10 items-center gap-2 rounded-full border border-[#DDD1B9]/30 px-4 text-[13px] text-[#EEE7D8] transition-[border-color,color,transform] duration-200 hover:border-[#D9A566] hover:text-[#D9A566] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
                >
                  <ArrowIcon direction="left" kinetic />
                  <span>Etapa anterior</span>
                </button>
              </Magnetic>
              <Magnetic strength={0.18} maxDistance={6}>
                <button
                  type="button"
                  data-cursor="action"
                  onClick={() =>
                    setActiveStage((prev) => (prev + 1) % ILLUSTRATIVE_PIPELINE.length)
                  }
                  className="bjb-arrow-btn inline-flex h-10 items-center gap-2 rounded-full bg-[#D9A566] px-4 text-[13px] font-medium text-[#2A211B] transition-[background-color,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
                >
                  <span>Próxima etapa</span>
                  <ArrowIcon direction="right" kinetic />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
