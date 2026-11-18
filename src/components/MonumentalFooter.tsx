"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NAV_LINKS } from "@/data/bjb-content";
import { BJB_EASE, ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";
import { ArrowIcon } from "./ArrowIcon";
import { Magnetic } from "./motion/Magnetic";
import { RollText } from "./motion/RollText";

const FOOTER_WORDMARK_CHARS = "BJB\u00A0GROWTH".split("");

export function MonumentalFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-footer-col", {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".bjb-footer-hairline", {
          scaleX: 0,
          duration: 0.78,
          stagger: 0.08,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
            once: true,
          },
        });

        if (wordmarkWrapRef.current) {
          gsap.from(".bjb-footer-char", {
            yPercent: 105,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wordmarkWrapRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
            },
          });
        }
      });

      mm.add(MOTION_QUERIES.desktopMotion, () => {
        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { yPercent: -16, rotate: -2 },
            {
              yPercent: 16,
              rotate: 2,
              ease: "none",
              scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.9,
              },
            }
          );
        }
      });
    }, footerRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bjb-cross-ground relative overflow-hidden border-t border-[#DDD1B9]/18 bg-[#211914] pt-20 text-[#EEE7D8]"
    >
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-6 h-[320px] w-[260px] opacity-20"
      >
        <img
          src="/assets/plates/symbol-watermark.png"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="relative grid grid-cols-1 gap-10 pb-14 lg:grid-cols-12">
          <div className="bjb-footer-col lg:col-span-5">
            <img
              src="/assets/plates/brand-logo.png"
              alt="BJB Growth — Build Join Business"
              className="h-12 w-auto min-w-[96px] object-contain"
            />
            <p className="mt-5 max-w-[38ch] text-[15.5px] leading-[1.55] text-[#DDD1B9]/90">
              Desenvolvemos e integramos soluções digitais para melhorar o atendimento, organizar
              processos e apoiar a gestão de pequenas e médias empresas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div className="bjb-footer-col">
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                Navegação
              </p>
              <ul className="m-0 mt-4 list-none space-y-2.5 p-0 text-[15px]">
                <li>
                  <a
                    href="#problemas"
                    data-cursor="action"
                    className="bjb-roll-link text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                  >
                    <RollText>Problemas</RollText>
                  </a>
                </li>
                {NAV_LINKS.map((link) => (
                  <li key={`footer-${link.href}`}>
                    <a
                      href={link.href}
                      data-cursor="action"
                      className="bjb-roll-link text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                    >
                      <RollText>{link.label}</RollText>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#equipe"
                    data-cursor="action"
                    className="bjb-roll-link text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                  >
                    <RollText>Equipe</RollText>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bjb-footer-col">
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                Frentes
              </p>
              <ul className="m-0 mt-4 list-none space-y-2.5 p-0 text-[15px] text-[#DDD1B9]/90">
                <li>Landing pages e sistemas</li>
                <li>Automação de atendimento</li>
                <li>IA com revisão de uso</li>
                <li>Integrações e dashboards</li>
              </ul>
            </div>

            <div className="bjb-footer-col col-span-2 sm:col-span-1">
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                Atendimento
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.55] text-[#DDD1B9]/90">
                Início por diagnóstico operacional e projeto-piloto com escopo definido.
              </p>
              <a
                href="#diagnostico"
                data-cursor="action"
                className="bjb-roll-link bjb-arrow-btn bjb-underline-wipe mt-4 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              >
                <RollText>Solicitar diagnóstico</RollText>
                <ArrowIcon direction="right" kinetic />
              </a>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="bjb-hairline bjb-footer-hairline absolute bottom-0 left-0 right-0 h-px bg-[#DDD1B9]/16"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-[12.5px] tracking-[0.04em] text-[#DDD1B9]/80">
          <span>BJB GROWTH · BUILD · JOIN · BUSINESS</span>
          <span>SOLUÇÕES TECNOLÓGICAS PARA EMPRESAS</span>
          <Magnetic strength={0.18} maxDistance={6}>
            <a
              href="#topo"
              data-cursor="action"
              className="bjb-roll-link bjb-arrow-btn bjb-underline-wipe inline-flex items-center gap-1.5 text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
            >
              <RollText>Voltar ao topo</RollText>
              <ArrowIcon direction="up" kinetic />
            </a>
          </Magnetic>
        </div>
      </div>

      <div
        ref={wordmarkWrapRef}
        aria-hidden="true"
        className="pointer-events-none relative select-none overflow-hidden pt-3 text-center"
      >
        <div
          aria-hidden="true"
          className="bjb-hairline bjb-footer-hairline absolute left-0 right-0 top-0 h-px bg-[#DDD1B9]/12"
        />
        <p className="m-0 whitespace-nowrap text-[14.2vw] font-bold uppercase leading-[0.8] tracking-[-0.03em] text-[#EEE7D8]/92">
          {FOOTER_WORDMARK_CHARS.map((ch, idx) => (
            <span key={`f-${idx}`} className="bjb-footer-char inline-block">
              {ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
