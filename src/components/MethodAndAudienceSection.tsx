"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { METHOD_STEPS, PILOT_CRITERIA, TARGET_SEGMENTS } from "@/data/bjb-content";

gsap.registerPlugin(ScrollTrigger);

export function MethodAndAudienceSection() {
  const methodRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bjb-method-num", {
          y: 14,
          letterSpacing: "0.04em",
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: methodRef.current,
            start: "top 75%",
            once: true,
          },
          clearProps: "transform,letterSpacing",
        });
      });
    }, methodRef);

    return () => {
      ctx.revert();
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
          <div className="grid grid-cols-1 gap-8 border-b border-[#2A211B]/18 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2
                id="metodo-heading"
                className="m-0 text-[clamp(2.1rem,3.9vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
              >
                Escopo fechado, validação em conjunto e entrada em operação sem atalhos.
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="m-0 max-w-[42ch] text-[17px] leading-[1.55] text-[#2A211B]/85">
                O cliente valida as regras do negócio. Nossa equipe entrega, documenta e define os
                cuidados com dados e acessos desde o primeiro ciclo.
              </p>
            </div>
          </div>

          <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#2A211B]/18 bg-[#2A211B]/18 p-0 md:grid-cols-2 lg:grid-cols-4">
            {METHOD_STEPS.map((step) => (
              <li
                key={step.step}
                className="flex flex-col justify-between bg-[#EEE7D8] p-7 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#2A211B]/12 pb-5">
                    <span className="bjb-method-num tabular-nums text-[44px] font-medium leading-none tracking-[-0.04em] text-[#9A4B30]">
                      {step.step}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                      className="text-[#2A211B]/45"
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
        aria-labelledby="publico-heading"
        className="bjb-cross-ground relative py-24 text-[#EEE7D8] lg:py-32"
      >
        <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <h2
                id="publico-heading"
                className="m-0 text-[clamp(2rem,3.6vw,3.3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8] [text-wrap:balance]"
              >
                Feito para PMEs com rotinas repetitivas e operação digital para organizar.
              </h2>

              <div className="mt-10 divide-y divide-[#DDD1B9]/16 border-y border-[#DDD1B9]/16">
                {TARGET_SEGMENTS.map((seg, index) => (
                  <div key={seg.id} className="py-6 sm:py-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="m-0 text-[22px] font-medium tracking-[-0.02em] text-[#EEE7D8]">
                        {seg.title}
                      </h3>
                      <span className="tabular-nums text-[13px] font-medium text-[#D9A566]">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[16px] leading-[1.5] text-[#DDD1B9]">
                      {seg.context}
                    </p>
                    <p className="mt-2 text-[14px] text-[#D9A566]/95">{seg.exampleNeed}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-6">
              <div className="overflow-hidden rounded-2xl border border-[#DDD1B9]/20 bg-[#4B4F3A] p-7 text-[#EEE7D8] sm:p-10">
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
                      className="flex items-center gap-4 rounded-xl border border-[#EEE7D8]/18 bg-[#2A211B]/30 px-5 py-4"
                    >
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9A566] tabular-nums text-[12.5px] font-medium text-[#2A211B]">
                        0{idx + 1}
                      </span>
                      <span className="text-[16px] font-normal text-[#EEE7D8]">{criterion}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-[#EEE7D8]/20 pt-6">
                  <p className="m-0 text-[14.5px] leading-[1.55] text-[#EEE7D8]/90">
                    <strong className="font-medium text-[#EEE7D8]">O que você recebe:</strong> uma
                    solução ajustada à sua operação real, com implantação, orientação de uso para a
                    equipe e possibilidade de acompanhamento contínuo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
