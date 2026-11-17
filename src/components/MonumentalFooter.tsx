"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/data/bjb-content";
import { ArrowIcon } from "./ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

export function MonumentalFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (wordmarkRef.current && footerRef.current) {
          gsap.from(wordmarkRef.current, {
            yPercent: 28,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 78%",
              once: true,
            },
            clearProps: "transform",
          });
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
        <div className="grid grid-cols-1 gap-10 border-b border-[#DDD1B9]/16 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
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
            <div>
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                Navegação
              </p>
              <ul className="m-0 mt-4 list-none space-y-2.5 p-0 text-[15px]">
                <li>
                  <a
                    href="#problemas"
                    className="text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                  >
                    Problemas
                  </a>
                </li>
                {NAV_LINKS.map((link) => (
                  <li key={`footer-${link.href}`}>
                    <a
                      href={link.href}
                      className="text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#equipe"
                    className="text-[#EEE7D8]/90 transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
                  >
                    Equipe
                  </a>
                </li>
              </ul>
            </div>

            <div>
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

            <div className="col-span-2 sm:col-span-1">
              <p className="m-0 text-[12px] font-medium uppercase tracking-[0.06em] text-[#D9A566]">
                Atendimento
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.55] text-[#DDD1B9]/90">
                Início por diagnóstico operacional e projeto-piloto com escopo definido.
              </p>
              <a
                href="#diagnostico"
                className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#D9A566] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              >
                <span>Solicitar diagnóstico</span>
                <ArrowIcon direction="right" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-[12.5px] tracking-[0.04em] text-[#DDD1B9]/80">
          <span>BJB GROWTH · BUILD · JOIN · BUSINESS</span>
          <span>SOLUÇÕES TECNOLÓGICAS PARA EMPRESAS</span>
          <a
            href="#topo"
            className="inline-flex items-center gap-1.5 text-[#D9A566] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
          >
            <span>Voltar ao topo</span>
            <ArrowIcon direction="up" />
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden border-t border-[#DDD1B9]/12 pt-3 text-center"
      >
        <p
          ref={wordmarkRef}
          className="m-0 whitespace-nowrap text-[14.2vw] font-bold uppercase leading-[0.8] tracking-[-0.03em] text-[#EEE7D8]/92"
        >
          BJB GROWTH
        </p>
      </div>
    </footer>
  );
}
