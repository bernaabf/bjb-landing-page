"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PROBLEMS } from "@/data/bjb-content";
import {
  BJB_EASE,
  ensureGsapPlugins,
  MOTION_QUERIES,
  prefersReducedMotion,
} from "@/lib/motion";
import { SplitReveal } from "./motion/SplitReveal";

export function ProblemsSection() {
  const [activeId, setActiveId] = useState<string>(PROBLEMS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstPanelEffect = useRef(true);

  const activeIndex = Math.max(
    0,
    PROBLEMS.findIndex((item) => item.id === activeId)
  );
  const activeStep = PROBLEMS[activeIndex]?.index ?? "01";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-problems-left", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        gsap.from(".bjb-problems-hairline", {
          scaleX: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(".bjb-problem-row", {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-problems-list",
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

  useEffect(() => {
    if (isFirstPanelEffect.current) {
      isFirstPanelEffect.current = false;
      return;
    }

    const panel = document.getElementById(`problem-panel-${activeId}`);
    if (!panel) return;

    ensureGsapPlugins();
    const cards = panel.querySelectorAll<HTMLElement>(".bjb-problem-card");
    if (!cards.length) return;

    gsap.killTweensOf(cards);

    if (prefersReducedMotion()) {
      gsap.fromTo(
        cards,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.18, ease: "power1.out", clearProps: "opacity" }
      );
      return;
    }

    gsap.fromTo(
      cards,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.38,
        stagger: 0.06,
        ease: BJB_EASE.editorial,
        clearProps: "transform,opacity",
      }
    );
  }, [activeId]);

  return (
    <section
      id="problemas"
      ref={sectionRef}
      aria-labelledby="problemas-heading"
      className="bjb-linho-cross-ground relative border-b border-[#2A211B]/12 bg-[#EEE7D8] text-[#2A211B]"
    >
      <div className="mx-auto max-w-[1376px] px-5 pb-24 pt-12 sm:px-8 lg:px-14 lg:pb-32 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-8">
            <div className="lg:sticky lg:top-28">
              <SplitReveal
                as="h2"
                id="problemas-heading"
                variant="lines"
                className="m-0 text-[clamp(2rem,3.6vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
              >
                Quando o atendimento cresce, o improviso cobra juros na rotina.
              </SplitReveal>

              <p className="bjb-problems-left mt-6 max-w-[44ch] text-[17px] leading-[1.55] text-[#2A211B]/80">
                Antes de propor qualquer tecnologia, validamos quatro situações recorrentes que
                impedem pequenas e médias empresas de escalar sem multiplicar trabalho manual.
              </p>

              <div className="bjb-problems-left relative mt-10 pt-5">
                <div
                  aria-hidden="true"
                  className="bjb-hairline bjb-problems-hairline absolute left-0 right-0 top-0 h-px bg-[#2A211B]/15"
                />
                <div className="flex items-center justify-between gap-4">
                  <h3 className="m-0 text-[15px] font-medium text-[#9A4B30]">
                    Critério de diagnóstico
                  </h3>
                  <span
                    aria-hidden="true"
                    className="tabular-nums text-[12.5px] font-medium tracking-[0.06em] text-[#9A4B30]"
                  >
                    {activeStep} / 0{PROBLEMS.length}
                  </span>
                </div>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-[1.5] text-[#2A211B]/80">
                  Cada projeto parte de um gargalo específico, observável no dia a dia da equipe.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bjb-problems-list relative">
              <div
                aria-hidden="true"
                className="bjb-hairline bjb-problems-hairline h-px w-full bg-[#2A211B]/20"
              />
              {PROBLEMS.map((item) => {
                const isOpen = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bjb-problem-row relative transition-colors duration-200"
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 top-6 bottom-6 w-[2px] origin-top bg-[#9A4B30] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`problem-panel-${item.id}`}
                      data-cursor="inspect"
                      onClick={() => setActiveId(item.id)}
                      className={`group flex w-full items-start justify-between gap-6 py-7 text-left transition-[padding] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4B30] sm:py-8 ${
                        isOpen ? "pl-4 sm:pl-5" : "pl-0 hover:pl-2"
                      }`}
                    >
                      <div className="flex items-baseline gap-5 sm:gap-8">
                        <span className="tabular-nums text-[14px] font-medium tracking-[0.04em] text-[#9A4B30]">
                          {item.index}
                        </span>
                        <div>
                          <h3
                            className={`m-0 text-[clamp(1.35rem,2.1vw,1.9rem)] font-medium tracking-[-0.025em] transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isOpen
                                ? "text-[#9A4B30]"
                                : "text-[#2A211B] group-hover:translate-x-1 group-hover:text-[#9A4B30]"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-[54ch] text-[16px] leading-[1.5] text-[#2A211B]/80">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2A211B]/25 transition-[transform,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen
                            ? "rotate-45 border-[#2A211B] bg-[#2A211B] text-[#EEE7D8]"
                            : "text-[#2A211B] group-hover:rotate-12 group-hover:border-[#9A4B30] group-hover:text-[#9A4B30]"
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M7 1V13M1 7H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`problem-panel-${item.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 gap-4 pb-8 pl-9 sm:grid-cols-2 sm:pl-13">
                          <div className="bjb-problem-card rounded-lg bg-[#DDD1B9]/55 p-4">
                            <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#2A211B]/70">
                              Como aparece no dia a dia
                            </p>
                            <p className="mt-1.5 text-[15px] leading-[1.45] text-[#2A211B]">
                              {item.symptom}
                            </p>
                          </div>
                          <div className="bjb-problem-card rounded-lg bg-[#2A211B] p-4 text-[#EEE7D8]">
                            <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#D9A566]">
                              Efeito na operação
                            </p>
                            <p className="mt-1.5 text-[15px] leading-[1.45] text-[#EEE7D8]/90">
                              {item.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      aria-hidden="true"
                      className="bjb-hairline bjb-problems-hairline h-px w-full bg-[#2A211B]/20"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
