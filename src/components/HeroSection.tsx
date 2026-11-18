"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BJB_EASE, ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";
import { Magnetic } from "./motion/Magnetic";
import { RollText } from "./motion/RollText";
import { SplitReveal } from "./motion/SplitReveal";
import { Navbar } from "./Navbar";

const WORDMARK_CHARS = "BJB\u00A0GROWTH".split("");

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLElement>(null);
  const veilInnerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLElement>(null);
  const watermarkInnerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapPlugins();

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        // Kickers masked entrance
        gsap.from(".bjb-hero-kicker", {
          yPercent: 112,
          duration: 0.72,
          stagger: 0.06,
          delay: 0.05,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
        });

        // Desktop H1 split-line masked entrance
        if (headlineLine1Ref.current && headlineLine2Ref.current) {
          gsap.from([headlineLine1Ref.current, headlineLine2Ref.current], {
            yPercent: 112,
            rotate: 0.6,
            duration: 0.92,
            stagger: 0.1,
            delay: 0.14,
            ease: BJB_EASE.expoOut,
            clearProps: "transform",
          });
        }

        // Subcopy + CTA masked rise
        gsap.from(".bjb-hero-lead", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          delay: 0.28,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
        });

        // Atmospheric plates subtle arrival scale
        const plates = [veilInnerRef.current, watermarkInnerRef.current].filter(Boolean);
        if (plates.length) {
          gsap.from(plates, {
            scale: 1.06,
            duration: 1.25,
            ease: BJB_EASE.editorial,
            clearProps: "transform",
          });
        }

        // Monumental wordmark per-character architectural wave
        gsap.from(".bjb-hero-char-desktop", {
          yPercent: 105,
          duration: 0.85,
          stagger: 0.024,
          delay: 0.22,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
        });

        gsap.from(".bjb-hero-char-mobile", {
          yPercent: 105,
          duration: 0.8,
          stagger: 0.022,
          delay: 0.22,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
        });
      });

      // Desktop scroll choreography
      mm.add(MOTION_QUERIES.desktopMotion, () => {
        if (veilRef.current) {
          gsap.to(veilRef.current, {
            yPercent: 14,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.85,
            },
          });
        }

        if (watermarkRef.current) {
          gsap.to(watermarkRef.current, {
            yPercent: -9,
            rotate: 2.5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
            },
          });
        }

        gsap.to(".bjb-hero-desktop-scroll", {
          yPercent: -8,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.75,
          },
        });

        if (wordmarkRef.current) {
          gsap.to(wordmarkRef.current, {
            yPercent: -7,
            letterSpacing: "-0.022em",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.9,
            },
          });
        }
      });

      // Lighter tablet & mobile scroll parallax on veil only
      mm.add(MOTION_QUERIES.tabletMotion, () => {
        if (veilRef.current) {
          gsap.to(veilRef.current, {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });

      mm.add(MOTION_QUERIES.mobileMotion, () => {
        if (veilRef.current) {
          gsap.to(veilRef.current, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }
      });
    }, sectionRef);

    // Desktop fine-pointer subtle atmospheric depth
    let cleanupPointer: (() => void) | undefined;
    if (
      window.matchMedia(MOTION_QUERIES.finePointer).matches &&
      veilInnerRef.current &&
      watermarkInnerRef.current
    ) {
      const veilX = gsap.quickTo(veilInnerRef.current, "x", {
        duration: 1.1,
        ease: "power3.out",
      });
      const veilY = gsap.quickTo(veilInnerRef.current, "y", {
        duration: 1.1,
        ease: "power3.out",
      });
      const markX = gsap.quickTo(watermarkInnerRef.current, "x", {
        duration: 1.25,
        ease: "power3.out",
      });
      const markY = gsap.quickTo(watermarkInnerRef.current, "y", {
        duration: 1.25,
        ease: "power3.out",
      });

      const onPointerMove = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        veilX(nx * 12);
        veilY(ny * 8);
        markX(nx * -7);
        markY(ny * -5);
      };

      const onPointerLeave = () => {
        veilX(0);
        veilY(0);
        markX(0);
        markY(0);
      };

      section.addEventListener("pointermove", onPointerMove, { passive: true });
      section.addEventListener("pointerleave", onPointerLeave);

      cleanupPointer = () => {
        section.removeEventListener("pointermove", onPointerMove);
        section.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    return () => {
      cleanupPointer?.();
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
        <div ref={veilInnerRef} className="h-full w-full">
          <img
            src="/assets/plates/atmospheric-veil.png"
            alt=""
            className="h-full w-full object-cover object-top"
          />
        </div>
      </figure>

      {/* Cropped official symbol watermark plate */}
      <figure
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-24 m-0 h-[260px] w-[200px] opacity-30 sm:h-[340px] sm:w-[270px] lg:bottom-auto lg:left-[var(--r-symbol-watermark-x)] lg:top-[14%] lg:h-[var(--r-symbol-watermark-h)] lg:w-[var(--r-symbol-watermark-w)] lg:opacity-40"
      >
        <div ref={watermarkInnerRef} className="h-full w-full">
          <img
            src="/assets/plates/symbol-watermark.png"
            alt=""
            className="h-full w-full object-cover object-right-top"
          />
        </div>
      </figure>

      {/* Mobile & Tablet responsive composition (< 1024px) */}
      <div className="relative z-20 flex min-h-[760px] flex-col justify-between px-5 pt-28 pb-0 sm:px-8 sm:pt-32 lg:hidden">
        <div className="mx-auto w-full max-w-[760px] space-y-6">
          <SplitReveal
            as="h1"
            trigger="mount"
            variant="lines"
            delay={0.08}
            className="text-[clamp(2.4rem,8vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#EEE7D8]"
          >
            Menos rotina manual. Mais controle operacional.
          </SplitReveal>

          <p className="bjb-hero-lead max-w-[42ch] text-[17px] leading-[1.45] text-[#DDD1B9]">
            Desenvolvemos e integramos sites, automação de atendimento, IA e dashboards sob medida.
          </p>

          <div className="bjb-hero-lead flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href="#diagnostico"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#D9A566] px-7 text-[15px] font-medium text-[#2A211B] transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
            >
              Solicitar diagnóstico
            </a>
            <a
              href="#fluxo"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#DDD1B9]/30 bg-[#2A211B]/65 px-7 text-[14.5px] text-[#EEE7D8] transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
            >
              Ver fluxo ilustrativo
            </a>
          </div>

          <div className="bjb-hero-lead flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-[#DDD1B9]/15 pt-4 text-[12px] tracking-[0.05em] text-[#EEE7D8]/90 uppercase">
            <span>BUILD · JOIN · BUSINESS</span>
            <span>PMEs · SERVIÇOS E COMÉRCIOS</span>
          </div>
        </div>

        <div className="-mx-5 mt-10 overflow-hidden pt-4 sm:-mx-8">
          <div
            aria-hidden="true"
            className="relative z-20 -mb-[1.8vw] select-none whitespace-nowrap text-center text-[15.4vw] font-bold uppercase leading-[0.72] tracking-[-0.015em] text-[#EEE7D8]"
          >
            {WORDMARK_CHARS.map((ch, idx) => (
              <span key={`m-${idx}`} className="bjb-hero-char-mobile inline-block">
                {ch}
              </span>
            ))}
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
          className="bjb-hero-desktop-scroll absolute z-20 m-0 overflow-hidden font-normal uppercase text-[#DDD1B9]/85"
          style={{
            left: "var(--r-kicker-brand-x)",
            top: "var(--r-kicker-brand-y)",
            fontSize: "max(12px, 0.945cqw)",
            letterSpacing: "0.025em",
          }}
        >
          <span className="bjb-hero-kicker block">BUILD · JOIN · BUSINESS</span>
        </p>

        <p
          className="bjb-hero-desktop-scroll absolute z-20 m-0 overflow-hidden font-normal text-[#DDD1B9]/90"
          style={{
            left: "var(--r-kicker-index-x)",
            top: "var(--r-kicker-index-y)",
            fontSize: "max(12px, 1.017cqw)",
            letterSpacing: "0.005em",
          }}
        >
          <span className="bjb-hero-kicker block">01 / OPERAÇÃO INTEGRADA</span>
        </p>

        <p
          className="bjb-hero-desktop-scroll absolute z-20 m-0 overflow-hidden font-normal text-[#EEE7D8]/95"
          style={{
            left: "var(--r-kicker-segment-x)",
            top: "var(--r-kicker-segment-y)",
            fontSize: "max(12px, 1.017cqw)",
            letterSpacing: "0.005em",
            textShadow: "0 1px 10px rgba(33, 25, 20, 0.72)",
          }}
        >
          <span className="bjb-hero-kicker block">PMEs · SERVIÇOS E COMÉRCIOS</span>
        </p>

        <h1
          className="bjb-hero-desktop-scroll absolute z-20 m-0 font-medium text-[#EEE7D8]"
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
          className="bjb-hero-lead bjb-hero-desktop-scroll absolute z-20 m-0 font-normal text-[#DDD1B9]"
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

        <div
          className="bjb-hero-lead bjb-hero-desktop-scroll absolute z-20"
          style={{
            left: "var(--r-hero-cta-x)",
            top: "var(--r-hero-cta-y)",
            width: "var(--r-hero-cta-w)",
            height: "var(--r-hero-cta-h)",
          }}
        >
          <Magnetic className="h-full w-full" strength={0.22} maxDistance={8}>
            <a
              href="#diagnostico"
              data-cursor="action"
              className="bjb-roll-link inline-flex h-full w-full items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] font-medium text-[#2A211B] transition-[background-color,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8]"
              style={{
                fontSize: "max(13px, 1.126cqw)",
                letterSpacing: "-0.02em",
              }}
            >
              <RollText className="[&_.bjb-roll-link__clone]:text-[#2A211B]">
                Solicitar diagnóstico
              </RollText>
            </a>
          </Magnetic>
        </div>

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
          {WORDMARK_CHARS.map((ch, idx) => (
            <span key={`d-${idx}`} className="bjb-hero-char-desktop inline-block">
              {ch}
            </span>
          ))}
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
