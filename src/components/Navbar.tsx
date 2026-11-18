"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/data/bjb-content";
import {
  BJB_EASE,
  ensureGsapPlugins,
  MOTION_QUERIES,
  prefersReducedMotion,
} from "@/lib/motion";
import { Magnetic } from "./motion/Magnetic";
import { RollText } from "./motion/RollText";

const CHAPTER_META: Record<string, { index: string; label: string }> = {
  "#topo": { index: "01", label: "Início" },
  "#problemas": { index: "02", label: "Problemas" },
  "#solucoes": { index: "03", label: "Soluções" },
  "#fluxo": { index: "04", label: "Fluxo" },
  "#metodo": { index: "05", label: "Método" },
  "#publico": { index: "06", label: "Público" },
  "#valor": { index: "07", label: "Valor" },
  "#equipe": { index: "08", label: "Equipe" },
  "#diagnostico": { index: "09", label: "Diagnóstico" },
};

const SPY_SECTIONS = Object.keys(CHAPTER_META);

const MOBILE_CHAPTERS = [
  { href: "#problemas", label: "O que trava a operação", index: "02" },
  ...NAV_LINKS.map((link, idx) => ({
    href: link.href,
    label: link.label,
    index: `0${idx + 3}`,
  })),
  { href: "#valor", label: "Valor e indicadores", index: "07" },
  { href: "#equipe", label: "Equipe", index: "08" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#topo");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const railRef = useRef<HTMLSpanElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterSwapRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const hasPlacedVernier = useRef(false);

  const activeChapter = CHAPTER_META[activeHref] ?? CHAPTER_META["#topo"];
  const showChapterCue = scrolled && activeHref !== "#topo";
  const isDiagnosticoActive = activeHref === "#diagnostico";

  // Hysteresis scroll state: eliminates 560px dead zone and up/down flicker
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > 72) return true;
        if (prev && y < 32) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full 9-chapter ScrollTrigger spy + integrated bottom reading-progress hairline
  useEffect(() => {
    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const triggers: ScrollTrigger[] = [];

    SPY_SECTIONS.forEach((selector) => {
      const el = document.querySelector(selector);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: selector === "#topo" ? "top top" : "top 42%",
          end: "bottom 42%",
          onEnter: () => setActiveHref(selector),
          onEnterBack: () => setActiveHref(selector),
        })
      );
    });

    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25,
              },
            }
          );
        }
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
      mm.revert();
    };
  }, []);

  // Glide continuous sliding Ocre vernier & pill rail across desktop nav links
  useEffect(() => {
    const navEl = navRef.current;
    const rail = railRef.current;
    const indicator = indicatorRef.current;
    if (!navEl || !rail || !indicator) return;

    ensureGsapPlugins();
    const reduced = prefersReducedMotion();

    const syncVernier = (immediate: boolean) => {
      const activeIdx = NAV_LINKS.findIndex((link) => link.href === activeHref);
      const activeLink = activeIdx >= 0 ? linkRefs.current[activeIdx] : null;

      gsap.killTweensOf([rail, indicator]);

      if (!activeLink) {
        if (immediate || reduced) {
          gsap.set([rail, indicator], { opacity: 0 });
        } else {
          gsap.to([rail, indicator], {
            opacity: 0,
            duration: 0.22,
            ease: "power2.out",
          });
        }
        return;
      }

      const left = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;

      if (immediate || reduced || !hasPlacedVernier.current) {
        gsap.set([rail, indicator], { x: left, width, opacity: 1 });
        hasPlacedVernier.current = true;
      } else {
        gsap.to([rail, indicator], {
          x: left,
          width,
          opacity: 1,
          duration: 0.46,
          ease: BJB_EASE.expoOut,
        });
      }
    };

    syncVernier(false);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        syncVernier(true);
      });
      observer.observe(navEl);
    }

    return () => observer?.disconnect();
  }, [activeHref, scrolled]);

  // Subtle chapter readout transition when active section changes while scrolled
  useEffect(() => {
    if (!showChapterCue || !chapterSwapRef.current || prefersReducedMotion()) return;
    ensureGsapPlugins();
    gsap.killTweensOf(chapterSwapRef.current);
    gsap.fromTo(
      chapterSwapRef.current,
      { y: 6, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        duration: 0.28,
        ease: BJB_EASE.editorial,
        clearProps: "transform,opacity",
      }
    );
  }, [activeHref, showChapterCue]);

  // Mobile drawer open/close state + Escape + Focus Trap + Body Scroll Lock
  useEffect(() => {
    if (mobileOpen) {
      setDrawerMounted(true);
      wasOpenRef.current = true;
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!drawerMounted) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerMounted]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawerMounted || !drawer) return;

    ensureGsapPlugins();

    if (mobileOpen) {
      closeBtnRef.current?.focus();

      if (prefersReducedMotion()) {
        gsap.set(drawer, { clearProps: "clipPath,opacity,transform" });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          drawer,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.46,
            ease: BJB_EASE.editorial,
            clearProps: "clipPath",
          }
        );

        gsap.from(".bjb-drawer-item", {
          y: 20,
          opacity: 0,
          duration: 0.42,
          stagger: 0.04,
          delay: 0.06,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,opacity",
        });
      }, drawerRef);

      return () => ctx.revert();
    }

    if (wasOpenRef.current) {
      if (prefersReducedMotion()) {
        setDrawerMounted(false);
        wasOpenRef.current = false;
        menuBtnRef.current?.focus();
        return;
      }

      const tween = gsap.to(drawer, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.3,
        ease: BJB_EASE.editorial,
        onComplete: () => {
          setDrawerMounted(false);
          wasOpenRef.current = false;
          requestAnimationFrame(() => {
            menuBtnRef.current?.focus();
          });
        },
      });

      return () => {
        tween.kill();
      };
    }
  }, [mobileOpen, drawerMounted]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:px-6 lg:px-14">
        <div
          data-scrolled={scrolled ? "true" : "false"}
          className={`bjb-nav-shell bjb-glass-nav pointer-events-auto relative flex w-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center ${
            scrolled
              ? "bjb-glass-nav--scrolled h-[58px] max-w-[920px] rounded-full pl-3.5 pr-2 sm:pl-4 sm:pr-2.5 lg:max-w-[880px] lg:translate-y-0 lg:pl-5 lg:pr-2.5"
              : "h-[60px] max-w-[996px] rounded-[14px] pl-3.5 pr-2 sm:pl-4 sm:pr-2.5 lg:h-[64px] lg:translate-y-2 lg:pl-5 lg:pr-3"
          }`}
        >
          {/* Left column: Official brand mark (min 96px) + desktop chapter cue */}
          <div className="flex items-center gap-3.5 lg:justify-self-start">
            <a
              href="#topo"
              aria-label="BJB Growth — Início"
              data-cursor="action"
              className="flex h-[44px] min-w-[96px] shrink-0 items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
            >
              <img
                src="/assets/plates/brand-logo.png"
                alt="BJB Growth — Build Join Business"
                className="h-[44px] w-auto min-w-[96px] object-contain object-left"
              />
            </a>

            <div
              aria-hidden="true"
              className={`hidden items-center gap-2.5 overflow-hidden transition-opacity duration-300 xl:flex ${
                showChapterCue ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="h-3.5 w-px bg-[#DDD1B9]/22" />
              <div ref={chapterSwapRef} className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="tabular-nums text-[11.5px] font-medium tracking-[0.06em] text-[#D9A566]">
                  {activeChapter.index}
                </span>
                <span className="text-[12px] tracking-[0.015em] text-[#DDD1B9]/85">
                  {activeChapter.label}
                </span>
              </div>
            </div>
          </div>

          {/* Center column: Optically centered navigation + continuous sliding vernier */}
          <nav
            ref={navRef}
            aria-label="Navegação principal"
            className="relative hidden items-center gap-1 lg:flex lg:justify-self-center"
          >
            <span
              ref={railRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0.5 left-0 rounded-full bg-[#EEE7D8]/[0.07] opacity-0"
            />
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0.5 left-0 h-[1.5px] rounded-full bg-[#D9A566] opacity-0"
            />

            {NAV_LINKS.map((link, idx) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    linkRefs.current[idx] = el;
                  }}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  data-cursor="action"
                  className={`bjb-roll-link relative z-10 rounded-full px-3.5 py-1.5 text-[14.5px] font-normal tracking-[-0.015em] transition-colors duration-200 hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] ${
                    isActive ? "text-[#D9A566]" : "text-[#EEE7D8]/92"
                  }`}
                >
                  <RollText
                    className={
                      isActive ? "[&_.bjb-roll-link__clone]:text-[#EEE7D8]" : undefined
                    }
                  >
                    {link.label}
                  </RollText>
                </a>
              );
            })}
          </nav>

          {/* Right column: Desktop concentric magnetic CTA */}
          <div className="hidden lg:block lg:justify-self-end">
            <Magnetic strength={0.16} maxDistance={6}>
              <a
                href="#diagnostico"
                data-cursor="action"
                aria-current={isDiagnosticoActive ? "location" : undefined}
                className={`bjb-roll-link inline-flex items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] px-5 text-[14px] font-medium tracking-[-0.02em] text-[#2A211B] transition-[background-color,box-shadow,transform,height] duration-200 hover:bg-[#E5B87E] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8] ${
                  scrolled ? "h-[38px]" : "h-[40px]"
                } ${
                  isDiagnosticoActive
                    ? "ring-2 ring-[#EEE7D8]/70 ring-offset-2 ring-offset-[#211914]"
                    : ""
                }`}
              >
                <RollText className="[&_.bjb-roll-link__clone]:text-[#2A211B]">
                  Solicitar diagnóstico
                </RollText>
              </a>
            </Magnetic>
          </div>

          {/* Mobile & Tablet right actions: persistent CTA + persistent menu button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href="#diagnostico"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#D9A566] px-3.5 text-[12.5px] font-medium tracking-[-0.015em] text-[#2A211B] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
            >
              Diagnóstico
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="bjb-mobile-menu"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD1B9]/25 bg-[#2A211B]/75 text-[#EEE7D8] transition-transform duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 6H17M3 10H17M3 14H17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>

          {/* Integrated reading-progress hairline inside the pill bottom edge */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 left-6 right-6 h-[1.5px] overflow-hidden rounded-full transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[#D9A566]/85" />
          </div>
        </div>
      </header>

      {drawerMounted && (
        <div
          id="bjb-mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#211914]/96 p-6 backdrop-blur-xl lg:hidden"
        >
          <div className="bjb-drawer-item flex items-center justify-between border-b border-[#DDD1B9]/15 pb-4">
            <img
              src="/assets/plates/brand-logo.png"
              alt="BJB Growth"
              className="h-[44px] w-auto min-w-[96px] object-contain"
            />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DDD1B9]/30 text-[#EEE7D8] transition-transform duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Capítulos da página" className="flex flex-col gap-3.5 py-6">
            {MOBILE_CHAPTERS.map((chapter) => {
              const isCurrent = activeHref === chapter.href;
              return (
                <a
                  key={chapter.href}
                  href={chapter.href}
                  aria-current={isCurrent ? "location" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`bjb-drawer-item flex items-baseline justify-between border-b border-[#DDD1B9]/12 pb-2.5 text-[22px] font-medium tracking-[-0.02em] transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] sm:text-[26px] ${
                    isCurrent ? "text-[#D9A566]" : "text-[#EEE7D8]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#D9A566]"
                      />
                    )}
                    <span>{chapter.label}</span>
                  </span>
                  <span className="tabular-nums text-[13px] text-[#D9A566]">{chapter.index}</span>
                </a>
              );
            })}
          </nav>

          <div className="bjb-drawer-item space-y-4">
            <a
              href="#diagnostico"
              onClick={() => setMobileOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#D9A566] text-[15px] font-medium text-[#2A211B] transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
            >
              Solicitar diagnóstico operacional
            </a>
            <p className="text-center text-[12px] tracking-[0.06em] text-[#DDD1B9]/75">
              BUILD · JOIN · BUSINESS
            </p>
          </div>
        </div>
      )}
    </>
  );
}
