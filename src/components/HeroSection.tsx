"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (headlineLine1Ref.current && headlineLine2Ref.current) {
          gsap.from([headlineLine1Ref.current, headlineLine2Ref.current], {
            yPercent: 22,
            opacity: 0.92,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        }

        if (veilRef.current && sectionRef.current) {
          gsap.to(veilRef.current, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (wordmarkRef.current && sectionRef.current) {
          gsap.to(wordmarkRef.current, {
            yPercent: -6,
            letterSpacing: "-0.022em",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
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

  return (
    <section
      id="topo"
      ref={sectionRef}
      aria-label="BJB Growth — Operação integrada para PMEs"
      className="bjb-cross-ground relative w-full overflow-hidden lg:[container-type:inline-size] lg:aspect-[1376/768]"
      style={{ backgroundPosition: "0px 90px" }}
    >
      <Navbar />

      {/* Atmospheric glow + smoked glass veil plate */}
      <figure
        ref={veilRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-16 m-0 h-[380px] w-[360px] opacity-65 sm:h-[460px] sm:w-[480px] lg:right-auto lg:left-[var(--r-atmospheric-veil-x)] lg:top-[var(--r-atmospheric-veil-y)] lg:h-[var(--r-atmospheric-veil-h)] lg:w-[var(--r-atmospheric-veil-w)] lg:opacity-76"
      >
        <img
          src="/assets/plates/atmospheric-veil.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </figure>

      {/* Cropped official symbol watermark plate */}
      <figure
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-24 m-0 h-[260px] w-[200px] opacity-30 sm:h-[340px] sm:w-[270px] lg:bottom-auto lg:left-[var(--r-symbol-watermark-x)] lg:top-[14%] lg:h-[var(--r-symbol-watermark-h)] lg:w-[var(--r-symbol-watermark-w)] lg:opacity-40"
      >
        <img
          src="/assets/plates/symbol-watermark.png"
          alt=""
          className="h-full w-full object-cover object-right-top"
        />
      </figure>

      {/* Mobile & Tablet responsive composition (< 1024px) */}
      <div className="relative z-20 flex min-h-[760px] flex-col justify-between px-5 pt-28 pb-0 sm:px-8 sm:pt-32 lg:hidden">
        <div className="mx-auto w-full max-w-[760px] space-y-6">
          <h1 className="text-[clamp(2.4rem,8vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8]">
            Menos rotina manual. Mais controle operacional.
          </h1>

          <p className="max-w-[42ch] text-[17px] leading-[1.45] text-[#DDD1B9]">
            Desenvolvemos e integramos sites, automação de atendimento, IA e dashboards sob medida.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href="#diagnostico"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#D9A566] px-7 text-[15px] font-medium text-[#2A211B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
            >
              Solicitar diagnóstico
            </a>
            <a
              href="#fluxo"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#DDD1B9]/30 bg-[#2A211B]/65 px-7 text-[14.5px] text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
            >
              Ver fluxo ilustrativo
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-[#DDD1B9]/15 pt-4 text-[12px] tracking-[0.05em] text-[#EEE7D8]/90 uppercase">
            <span>BUILD · JOIN · BUSINESS</span>
            <span>PMEs · SERVIÇOS E COMÉRCIOS</span>
          </div>
        </div>

        <div className="-mx-5 mt-10 overflow-hidden pt-4 sm:-mx-8">
          <div
            aria-hidden="true"
            className="relative z-20 -mb-[1.8vw] select-none whitespace-nowrap text-center text-[15.4vw] font-bold uppercase leading-[0.72] tracking-[-0.015em] text-[#EEE7D8]"
          >
            BJB GROWTH
          </div>
          <div className="relative z-10 bg-[#EEE7D8] px-5 pb-3 pt-4 sm:px-8">
            <p className="m-0 text-[12.5px] font-medium uppercase tracking-[0.04em] text-[#2A211B]">
              02 / O QUE TRAVA A OPERAÇÃO
            </p>
          </div>
        </div>
      </div>

      {/* Desktop comp-matched canvas (>= 1024px) */}
      <div className="hidden lg:contents">
        <p
          className="absolute z-20 m-0 font-normal uppercase text-[#DDD1B9]/85"
          style={{
            left: "var(--r-kicker-brand-x)",
            top: "var(--r-kicker-brand-y)",
            fontSize: "max(12px, 0.945cqw)",
            letterSpacing: "0.025em",
          }}
        >
          BUILD · JOIN · BUSINESS
        </p>

        <p
          className="absolute z-20 m-0 font-normal text-[#DDD1B9]/90"
          style={{
            left: "var(--r-kicker-index-x)",
            top: "var(--r-kicker-index-y)",
            fontSize: "max(12px, 1.017cqw)",
            letterSpacing: "0.005em",
          }}
        >
          01 / OPERAÇÃO INTEGRADA
        </p>

        <p
          className="absolute z-20 m-0 font-normal text-[#EEE7D8]/95"
          style={{
            left: "var(--r-kicker-segment-x)",
            top: "var(--r-kicker-segment-y)",
            fontSize: "max(12px, 1.017cqw)",
            letterSpacing: "0.005em",
            textShadow: "0 1px 10px rgba(33, 25, 20, 0.72)",
          }}
        >
          PMEs · SERVIÇOS E COMÉRCIOS
        </p>

        <h1
          className="absolute z-20 m-0 font-medium text-[#EEE7D8]"
          style={{
            left: "var(--r-hero-headline-x)",
            top: "var(--r-hero-headline-y)",
            width: "var(--r-hero-headline-w)",
            fontSize: "4.142cqw",
            lineHeight: 1.07,
            letterSpacing: "-0.028em",
          }}
        >
          <span className="block overflow-hidden">
            <span ref={headlineLine1Ref} className="block">
              Menos rotina manual.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={headlineLine2Ref} className="block">
              Mais controle operacional.
            </span>
          </span>
        </h1>

        <p
          className="absolute z-20 m-0 font-normal text-[#DDD1B9]"
          style={{
            left: "var(--r-hero-subcopy-x)",
            top: "var(--r-hero-subcopy-y)",
            width: "var(--r-hero-subcopy-w)",
            fontSize: "max(15px, 1.344cqw)",
            lineHeight: 1.32,
            letterSpacing: "-0.01em",
          }}
        >
          Desenvolvemos e integramos sites, automação de atendimento, IA e dashboards sob medida.
        </p>

        <a
          href="#diagnostico"
          className="absolute z-20 inline-flex items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] font-medium text-[#2A211B] transition-colors duration-200 hover:bg-[#E5B87E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8]"
          style={{
            left: "var(--r-hero-cta-x)",
            top: "var(--r-hero-cta-y)",
            width: "var(--r-hero-cta-w)",
            height: "var(--r-hero-cta-h)",
            fontSize: "max(13px, 1.126cqw)",
            letterSpacing: "-0.02em",
          }}
        >
          Solicitar diagnóstico
        </a>

        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 flex select-none items-end justify-center overflow-hidden font-bold uppercase text-[#EEE7D8]"
          style={{
            left: "0%",
            bottom: "6.05%",
            width: "100%",
            height: "auto",
            fontSize: "16.35cqw",
            lineHeight: 0.74,
            letterSpacing: "-0.008em",
            whiteSpace: "nowrap",
          }}
        >
          BJB GROWTH
        </div>

        <div
          className="absolute z-10 bg-[#EEE7D8]"
          style={{
            left: "var(--r-section02-band-x)",
            top: "var(--r-section02-band-y)",
            width: "var(--r-section02-band-w)",
            height: "var(--r-section02-band-h)",
          }}
        >
          <p
            className="absolute m-0 font-medium uppercase text-[#2A211B]"
            style={{
              left: "10.76%",
              top: "68%",
              fontSize: "max(12px, 0.981cqw)",
              letterSpacing: "0.008em",
            }}
          >
            02 / O QUE TRAVA A OPERAÇÃO
          </p>
        </div>
      </div>
    </section>
  );
}
