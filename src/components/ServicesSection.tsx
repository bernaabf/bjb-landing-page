"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { SERVICES } from "@/data/bjb-content";
import {
  BJB_EASE,
  ensureGsapPlugins,
  MOTION_QUERIES,
  prefersReducedMotion,
} from "@/lib/motion";
import { ArrowIcon } from "./ArrowIcon";
import { RollText } from "./motion/RollText";
import { SplitReveal } from "./motion/SplitReveal";

export function ServicesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelMarkRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstTabEffect = useRef(true);
  const hasPlacedIndicator = useRef(false);

  const current = SERVICES[selectedIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-services-hairline", {
          scaleX: 0,
          duration: 0.78,
          stagger: 0.06,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-services-intro", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-service-tab", {
          y: 16,
          opacity: 0,
          duration: 0.68,
          stagger: 0.065,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: tabListRef.current,
            start: "top 82%",
            once: true,
          },
        });

        if (panelRef.current) {
          gsap.from(panelRef.current, {
            y: 18,
            clipPath: "inset(6% 0% 0% 0% round 16px)",
            duration: 0.85,
            ease: BJB_EASE.expoOut,
            clearProps: "transform,clipPath",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 82%",
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

        if (panelMarkRef.current) {
          gsap.fromTo(
            panelMarkRef.current,
            { yPercent: -8, rotate: -3 },
            {
              yPercent: 10,
              rotate: 3,
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

  // Glide shared active tab indicator + choreograph panel content transition
  useEffect(() => {
    const activeTab = tabRefs.current[selectedIndex];
    const indicator = activeIndicatorRef.current;

    ensureGsapPlugins();
    const reduced = prefersReducedMotion();

    const syncIndicator = (immediate: boolean) => {
      if (!activeTab || !indicator) return;
      const top = activeTab.offsetTop;
      const height = activeTab.offsetHeight;
      gsap.killTweensOf(indicator);
      if (immediate || reduced) {
        gsap.set(indicator, { y: top, height, opacity: 1 });
      } else {
        gsap.to(indicator, {
          y: top,
          height,
          opacity: 1,
          duration: 0.42,
          ease: BJB_EASE.expoOut,
        });
      }
    };

    syncIndicator(!hasPlacedIndicator.current);
    hasPlacedIndicator.current = true;

    let observer: ResizeObserver | undefined;
    if (tabListRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        syncIndicator(true);
      });
      observer.observe(tabListRef.current);
    }

    if (isFirstTabEffect.current) {
      isFirstTabEffect.current = false;
      return () => observer?.disconnect();
    }

    const panel = panelRef.current;
    if (panel) {
      const blocks = panel.querySelectorAll<HTMLElement>(".bjb-service-readout");
      const crosses = panel.querySelectorAll<SVGSVGElement>(".bjb-service-cross");
      gsap.killTweensOf(blocks);
      gsap.killTweensOf(crosses);

      if (reduced) {
        gsap.fromTo(
          blocks,
          { opacity: 0.55 },
          { opacity: 1, duration: 0.18, ease: "power1.out", clearProps: "opacity" }
        );
      } else {
        gsap.fromTo(
          blocks,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.36,
            stagger: 0.045,
            ease: BJB_EASE.editorial,
            clearProps: "transform,opacity",
          }
        );

        gsap.fromTo(
          crosses,
          { rotate: -90 },
          {
            rotate: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: BJB_EASE.expoOut,
            clearProps: "transform",
          }
        );
      }
    }

    return () => observer?.disconnect();
  }, [selectedIndex]);

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
      ref={sectionRef}
      aria-labelledby="solucoes-heading"
      className="bjb-cross-ground relative overflow-x-clip py-24 text-[#EEE7D8] lg:py-32"
    >
      {/* Subtle atmospheric glow from the approved world */}
      <div
        ref={veilRef}
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
        <div className="relative flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end">
          <div>
            <SplitReveal
              as="h2"
              id="solucoes-heading"
              variant="words"
              className="m-0 max-w-[20ch] text-[clamp(2.1rem,4vw,3.8rem)] font-medium leading-[1.03] tracking-[-0.032em] text-[#EEE7D8] [text-wrap:balance]"
            >
              Cinco frentes que se combinam ao seu escopo.
            </SplitReveal>
          </div>

          <p className="bjb-services-intro m-0 max-w-[40ch] text-[16px] leading-[1.5] text-[#DDD1B9]/85">
            O escopo combina apenas os serviços necessários ao problema de cada empresa — sem
            empurrar ferramentas desconectadas.
          </p>

          <div
            aria-hidden="true"
            className="bjb-hairline bjb-services-hairline absolute bottom-0 left-0 right-0 h-px bg-[#DDD1B9]/18"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Serviços e aplicações BJB Growth"
            aria-orientation="vertical"
            className="relative flex flex-col lg:col-span-7"
          >
            {/* Shared sliding indicator synchronized to active tab */}
            <div
              ref={activeIndicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-0 z-0 rounded-lg border-l-2 border-[#D9A566] bg-[#342922]/45 opacity-0"
            />

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
                  data-cursor="inspect"
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className="bjb-service-tab group relative z-10 flex w-full items-center justify-between gap-4 border-b border-[#DDD1B9]/15 px-3 py-6 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] sm:px-4 sm:py-7"
                >
                  <div className="flex items-baseline gap-4 sm:gap-7">
                    <span
                      className={`tabular-nums text-[14px] font-medium transition-colors duration-200 ${
                        active ? "text-[#D9A566]" : "text-[#DDD1B9]/85 group-hover:text-[#D9A566]"
                      }`}
                    >
                      {service.index}
                    </span>
                    <span
                      className={`text-[clamp(1.45rem,2.65vw,2.45rem)] font-medium tracking-[-0.025em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active
                          ? "translate-x-1.5 text-[#EEE7D8]"
                          : "text-[#EEE7D8]/85 group-hover:translate-x-1.5 group-hover:text-[#EEE7D8]"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3.5 py-1 text-[12.5px] font-medium transition-colors duration-200 ${
                      active
                        ? "bg-[#D9A566] text-[#2A211B]"
                        : "border border-[#DDD1B9]/30 text-[#DDD1B9] group-hover:border-[#D9A566]/55 group-hover:text-[#EEE7D8]"
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
              ref={panelRef}
              role="tabpanel"
              aria-labelledby={`service-tab-${current.id}`}
              className="bjb-glass-panel relative overflow-hidden rounded-2xl p-7 sm:p-9 lg:sticky lg:top-28"
            >
              <div
                ref={panelMarkRef}
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
                <div className="bjb-service-readout flex items-center justify-between border-b border-[#DDD1B9]/15 pb-4">
                  <span className="tabular-nums text-[13px] font-medium tracking-[0.06em] text-[#D9A566]">
                    APLICAÇÃO {current.index} / 05
                  </span>
                  <span className="rounded-full bg-[#D9A566] px-3 py-0.5 text-[12px] font-medium text-[#2A211B]">
                    {current.tag}
                  </span>
                </div>

                <h3 className="bjb-service-readout mt-6 text-[26px] font-medium leading-[1.15] tracking-[-0.025em] text-[#EEE7D8]">
                  {current.title}
                </h3>

                <p className="bjb-service-readout mt-3 text-[16px] leading-[1.55] text-[#DDD1B9]">
                  {current.description}
                </p>

                <div className="bjb-service-readout mt-8 space-y-3 border-t border-[#DDD1B9]/15 pt-6">
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
                          className="bjb-service-cross mt-1 shrink-0 text-[#D9A566]"
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
                    data-cursor="action"
                    className="bjb-roll-link bjb-arrow-btn bjb-underline-wipe inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[14px] font-medium text-[#D9A566] focus-visible:outline-2 focus-visible:outline-[#D9A566]"
                  >
                    <RollText>Avaliar no diagnóstico</RollText>
                    <ArrowIcon direction="right" kinetic />
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
