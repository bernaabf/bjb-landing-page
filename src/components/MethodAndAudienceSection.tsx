"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { METHOD_STEPS, PILOT_CRITERIA, TARGET_SEGMENTS } from "@/data/bjb-content";
import { BJB_EASE, ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";
import { SplitReveal } from "./motion/SplitReveal";

export function MethodAndAudienceSection() {
  const methodRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const musgoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const methodEl = methodRef.current;
    const audienceEl = audienceRef.current;
    if (!methodEl || !audienceEl) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();

    const methodCtx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-method-hairline", {
          scaleX: 0,
          duration: 0.78,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: methodEl,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-method-intro", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: methodEl,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-method-bento", {
          clipPath: "inset(0% 0% 6% 0% round 16px)",
          duration: 0.85,
          ease: BJB_EASE.expoOut,
          clearProps: "clipPath",
          scrollTrigger: {
            trigger: ".bjb-method-bento",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-method-card", {
          y: 22,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-method-bento",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-method-num", {
          yPercent: 105,
          duration: 0.78,
          stagger: 0.09,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".bjb-method-bento",
            start: "top 80%",
            once: true,
          },
        });
      });

      mm.add(MOTION_QUERIES.desktopMotion, () => {
        gsap.fromTo(
          ".bjb-method-cross",
          { rotate: 0 },
          {
            rotate: 90,
            ease: "none",
            scrollTrigger: {
              trigger: methodEl,
              start: "top 85%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          }
        );
      });

      mm.add(MOTION_QUERIES.tabletMotion, () => {
        gsap.fromTo(
          ".bjb-method-cross",
          { rotate: 0 },
          {
            rotate: 90,
            ease: "none",
            scrollTrigger: {
              trigger: methodEl,
              start: "top 85%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          }
        );
      });
    }, methodRef);

    const audienceCtx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-audience-hairline", {
          scaleX: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".bjb-segments-list",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-segment-row", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-segments-list",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-musgo-panel", {
          clipPath: "inset(6% 0% 6% 0% round 16px)",
          y: 18,
          duration: 0.85,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: ".bjb-musgo-panel",
            start: "top 84%",
            once: true,
          },
        });

        gsap.from(".bjb-criterion-item", {
          x: -14,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          delay: 0.14,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".bjb-musgo-panel",
            start: "top 82%",
            once: true,
          },
        });
      });

      mm.add(MOTION_QUERIES.desktopMotion, () => {
        if (musgoWrapRef.current) {
          gsap.fromTo(
            musgoWrapRef.current,
            { y: 18 },
            {
              y: -14,
              ease: "none",
              scrollTrigger: {
                trigger: audienceEl,
                start: "top 85%",
                end: "bottom 20%",
                scrub: 0.85,
              },
            }
          );
        }
      });
    }, audienceRef);

    return () => {
      methodCtx.revert();
      audienceCtx.revert();
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* Seção 05 — Como trabalhamos (Areia #DDD1B9 com Pontos de retícula) */}
      <section
        id="metodo"
        ref={methodRef}
        aria-labelledby="metodo-heading"
        className="bjb-areia-dot-ground relative border-b border-[#2A211B]/15 bg-[#DDD1B9] py-24 text-[#2A211B] lg:py-32"
      >
        <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
          <div className="relative grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SplitReveal
                as="h2"
                id="metodo-heading"
                variant="lines"
                className="m-0 text-[clamp(2.1rem,3.9vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
              >
                Escopo fechado, validação em conjunto e entrada em operação sem atalhos.
              </SplitReveal>
            </div>

            <div className="lg:col-span-5">
              <p className="bjb-method-intro m-0 max-w-[42ch] text-[17px] leading-[1.55] text-[#2A211B]/85">
                O cliente valida as regras do negócio. Nossa equipe entrega, documenta e define os
                cuidados com dados e acessos desde o primeiro ciclo.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="bjb-hairline bjb-method-hairline absolute bottom-0 left-0 right-0 h-px bg-[#2A211B]/18"
            />
          </div>

          <ol className="bjb-method-bento m-0 mt-12 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#2A211B]/18 bg-[#2A211B]/18 p-0 md:grid-cols-2 lg:grid-cols-4">
            {METHOD_STEPS.map((step) => (
              <li
                key={step.step}
                data-cursor="inspect"
                className="bjb-method-card group relative flex flex-col justify-between bg-[#EEE7D8] p-7 transition-colors duration-250 hover:bg-[#F3EDE0] sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#9A4B30] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <div>
                  <div className="flex items-center justify-between border-b border-[#2A211B]/12 pb-5">
                    <span className="inline-block overflow-hidden">
                      <span className="bjb-method-num inline-block tabular-nums text-[44px] font-medium leading-none tracking-[-0.04em] text-[#9A4B30]">
                        {step.step}
                      </span>
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                      className="bjb-method-cross text-[#2A211B]/45 transition-colors duration-200 group-hover:text-[#9A4B30]"
                    >
                      <path d="M9 2V16M2 9H16" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  </div>

                  <h3 className="mt-6 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-[#2A211B]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.55] text-[#2A211B]/82">
                    {step.description}
                  </p>
                </div>

                <p className="mt-8 border-t border-[#2A211B]/12 pt-4 text-[13.5px] leading-[1.45] text-[#2A211B]/75">
                  {step.validationRule}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Seção 06 — Para quem construímos (Casca + Musgo #4B4F3A) */}
      <section
        id="publico"
        ref={audienceRef}
        aria-labelledby="publico-heading"
        className="bjb-cross-ground relative py-24 text-[#EEE7D8] lg:py-32"
      >
        <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SplitReveal
                as="h2"
                id="publico-heading"
                variant="words"
                className="m-0 text-[clamp(2rem,3.6vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8] [text-wrap:balance]"
              >
                Feito para PMEs com rotinas repetitivas e operação digital para organizar.
              </SplitReveal>

              <div className="bjb-segments-list mt-10">
                <div
                  aria-hidden="true"
                  className="bjb-hairline bjb-audience-hairline h-px w-full bg-[#DDD1B9]/16"
                />
                {TARGET_SEGMENTS.map((seg, index) => (
                  <div key={seg.id} className="bjb-segment-row group relative py-6 sm:py-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="m-0 text-[22px] font-medium tracking-[-0.02em] text-[#EEE7D8] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                        {seg.title}
                      </h3>
                      <span className="tabular-nums text-[13px] font-medium text-[#D9A566] transition-opacity duration-200 group-hover:opacity-100">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[16px] leading-[1.5] text-[#DDD1B9]">
                      {seg.context}
                    </p>
                    <p className="mt-2 text-[14px] text-[#D9A566]/95">{seg.exampleNeed}</p>

                    <div
                      aria-hidden="true"
                      className="bjb-hairline bjb-audience-hairline absolute bottom-0 left-0 right-0 h-px bg-[#DDD1B9]/16"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-6">
              <div ref={musgoWrapRef}>
                <div className="bjb-musgo-panel overflow-hidden rounded-2xl border border-[#DDD1B9]/20 bg-[#4B4F3A] p-7 text-[#EEE7D8] shadow-[0_24px_60px_rgba(12,10,8,0.45)] sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE7D8]/20 pb-5">
                    <span className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#EEE7D8]">
                      Critérios para os primeiros projetos
                    </span>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-[#EEE7D8] px-3.5 py-1 text-[12px] font-medium text-[#2A211B]">
                      Escopo piloto
                    </span>
                  </div>

                  <p className="mt-6 text-[22px] font-medium leading-[1.3] tracking-[-0.02em] text-[#EEE7D8]">
                    Começamos por um segmento e um problema específico, para validar entregas
                    comparáveis na prática.
                  </p>

                  <ul className="m-0 mt-8 list-none space-y-4 p-0">
                    {PILOT_CRITERIA.map((criterion, idx) => (
                      <li
                        key={criterion}
                        className="bjb-criterion-item flex items-center gap-4 rounded-xl border border-[#EEE7D8]/18 bg-[#2A211B]/30 px-5 py-4 transition-colors duration-200 hover:border-[#EEE7D8]/35 hover:bg-[#2A211B]/45"
                      >
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9A566] tabular-nums text-[12.5px] font-medium text-[#2A211B]">
                          0{idx + 1}
                        </span>
                        <span className="text-[16px] font-normal text-[#EEE7D8]">
                          {criterion}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-[#EEE7D8]/20 pt-6">
                    <p className="m-0 text-[14.5px] leading-[1.55] text-[#EEE7D8]/90">
                      <strong className="font-medium text-[#EEE7D8]">O que você recebe:</strong> uma
                      solução ajustada à sua operação real, com implantação, orientação de uso para
                      a equipe e possibilidade de acompanhamento contínuo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
