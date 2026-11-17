"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { SERVICES } from "@/data/bjb-content";

export function ServicesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = SERVICES[selectedIndex];

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next = idx;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = (idx + 1) % SERVICES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = (idx - 1 + SERVICES.length) % SERVICES.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = SERVICES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setSelectedIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-heading"
      className="bjb-cross-ground relative overflow-hidden py-24 text-[#EEE7D8] lg:py-32"
    >
      {/* Subtle atmospheric glow from the approved world */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-[520px] w-[520px] opacity-30 [mask-image:radial-gradient(closest-side,black_35%,transparent_100%)]"
      >
        <img
          src="/assets/plates/atmospheric-veil.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col justify-between gap-6 border-b border-[#DDD1B9]/18 pb-10 lg:flex-row lg:items-end">
          <div>
            <h2
              id="solucoes-heading"
              className="m-0 max-w-[20ch] text-[clamp(2.1rem,4vw,3.8rem)] font-medium leading-[1.03] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Cinco frentes que se combinam ao seu escopo.
            </h2>
          </div>

          <p className="m-0 max-w-[40ch] text-[16px] leading-[1.5] text-[#DDD1B9]/85">
            O escopo combina apenas os serviços necessários ao problema de cada empresa — sem
            empurrar ferramentas desconectadas.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label="Serviços e aplicações BJB Growth"
            aria-orientation="vertical"
            className="flex flex-col lg:col-span-7"
          >
            {SERVICES.map((service, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`service-tab-${service.id}`}
                  aria-selected={active}
                  aria-controls="service-detail-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className="group flex w-full items-center justify-between gap-4 border-b border-[#DDD1B9]/15 py-6 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] sm:py-7"
                >
                  <div className="flex items-baseline gap-4 sm:gap-7">
                    <span
                      className={`tabular-nums text-[14px] font-medium transition-colors ${
                        active ? "text-[#D9A566]" : "text-[#DDD1B9]/85"
                      }`}
                    >
                      {service.index}
                    </span>
                    <span
                      className={`text-[clamp(1.45rem,2.65vw,2.45rem)] font-medium tracking-[-0.025em] transition-transform duration-300 ${
                        active
                          ? "translate-x-1.5 text-[#EEE7D8]"
                          : "text-[#EEE7D8]/85 group-hover:translate-x-1 group-hover:text-[#EEE7D8]"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3.5 py-1 text-[12.5px] font-medium transition-colors ${
                      active
                        ? "bg-[#D9A566] text-[#2A211B]"
                        : "border border-[#DDD1B9]/30 text-[#DDD1B9]"
                    }`}
                  >
                    {service.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div
              id="service-detail-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${current.id}`}
              className="bjb-glass-panel relative overflow-hidden rounded-2xl p-7 sm:p-9 lg:sticky lg:top-28"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-36 opacity-20"
              >
                <img
                  src="/assets/plates/symbol-watermark.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-[#DDD1B9]/15 pb-4">
                  <span className="tabular-nums text-[13px] font-medium tracking-[0.06em] text-[#D9A566]">
                    APLICAÇÃO {current.index} / 05
                  </span>
                  <span className="rounded-full bg-[#D9A566] px-3 py-0.5 text-[12px] font-medium text-[#2A211B]">
                    {current.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-[26px] font-medium leading-[1.15] tracking-[-0.025em] text-[#EEE7D8]">
                  {current.title}
                </h3>

                <p className="mt-3 text-[16px] leading-[1.55] text-[#DDD1B9]">
                  {current.description}
                </p>

                <div className="mt-8 space-y-3 border-t border-[#DDD1B9]/15 pt-6">
                  <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                    O que entra na prática
                  </p>
                  <ul className="m-0 list-none space-y-3 p-0">
                    {current.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-3 text-[15px] leading-[1.45] text-[#EEE7D8]/90"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#D9A566]"
                        >
                          <path
                            d="M7 1V13M1 7H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#DDD1B9]/15 pt-5">
                  <span className="text-[13px] text-[#DDD1B9]/75">
                    Integrado ao seu fluxo atual
                  </span>
                  <a
                    href="#diagnostico"
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[14px] font-medium text-[#D9A566] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#D9A566]"
                  >
                    <span>Avaliar no diagnóstico</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7H12M8 3L12 7L8 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
