"use client";

import { useState } from "react";
import { PROBLEMS } from "@/data/bjb-content";

export function ProblemsSection() {
  const [activeId, setActiveId] = useState<string>(PROBLEMS[0].id);

  return (
    <section
      id="problemas"
      aria-labelledby="problemas-heading"
      className="bjb-linho-cross-ground relative border-b border-[#2A211B]/12 bg-[#EEE7D8] text-[#2A211B]"
    >
      <div className="mx-auto max-w-[1376px] px-5 pb-24 pt-12 sm:px-8 lg:px-14 lg:pb-32 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-8">
            <div className="lg:sticky lg:top-28">
              <h2
                id="problemas-heading"
                className="m-0 text-[clamp(2rem,3.6vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
              >
                Quando o atendimento cresce, o improviso cobra juros na rotina.
              </h2>

              <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.55] text-[#2A211B]/80">
                Antes de propor qualquer tecnologia, validamos quatro situações recorrentes que
                impedem pequenas e médias empresas de escalar sem multiplicar trabalho manual.
              </p>

              <div className="mt-10 border-t border-[#2A211B]/15 pt-5">
                <h3 className="m-0 text-[15px] font-medium text-[#9A4B30]">
                  Critério de diagnóstico
                </h3>
                <p className="mt-2 max-w-[38ch] text-[15px] leading-[1.5] text-[#2A211B]/80">
                  Cada projeto parte de um gargalo específico, observável no dia a dia da equipe.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-[#2A211B]/20">
              {PROBLEMS.map((item) => {
                const isOpen = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border-b border-[#2A211B]/20 transition-colors duration-200"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`problem-panel-${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A4B30] sm:py-8"
                    >
                      <div className="flex items-baseline gap-5 sm:gap-8">
                        <span className="tabular-nums text-[14px] font-medium tracking-[0.04em] text-[#9A4B30]">
                          {item.index}
                        </span>
                        <div>
                          <h3 className="m-0 text-[clamp(1.35rem,2.1vw,1.9rem)] font-medium tracking-[-0.025em] text-[#2A211B] transition-colors group-hover:text-[#9A4B30]">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-[54ch] text-[16px] leading-[1.5] text-[#2A211B]/80">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2A211B]/25 transition-transform duration-300 ${
                          isOpen ? "rotate-45 bg-[#2A211B] text-[#EEE7D8]" : "text-[#2A211B]"
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
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 gap-4 pb-8 pl-9 sm:grid-cols-2 sm:pl-13">
                          <div className="rounded-lg bg-[#DDD1B9]/55 p-4">
                            <p className="m-0 text-[12px] font-medium uppercase tracking-[0.05em] text-[#2A211B]/70">
                              Como aparece no dia a dia
                            </p>
                            <p className="mt-1.5 text-[15px] leading-[1.45] text-[#2A211B]">
                              {item.symptom}
                            </p>
                          </div>
                          <div className="rounded-lg bg-[#2A211B] p-4 text-[#EEE7D8]">
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
