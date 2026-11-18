"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/data/bjb-content";
import { BJB_EASE, ensureGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import { Magnetic } from "./motion/Magnetic";
import { RollText } from "./motion/RollText";

const NAV_X_PERCENT: Record<string, string> = {
  "#solucoes": "32.98%",
  "#fluxo": "43.82%",
  "#metodo": "51.66%",
  "#publico": "61.42%",
};

const SPY_SECTIONS = [
  "#topo",
  "#problemas",
  "#solucoes",
  "#fluxo",
  "#metodo",
  "#publico",
  "#equipe",
  "#diagnostico",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#topo");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const prevScrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section spy via ScrollTrigger
  useEffect(() => {
    ensureGsapPlugins();
    const triggers: ScrollTrigger[] = [];

    SPY_SECTIONS.forEach((selector) => {
      const el = document.querySelector(selector);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 42%",
          end: "bottom 42%",
          onEnter: () => setActiveHref(selector),
          onEnterBack: () => setActiveHref(selector),
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Subtle entrance micro-shift when transitioning to floating scrolled pill
  useEffect(() => {
    const didChangeToScrolled = scrolled && !prevScrolledRef.current;
    prevScrolledRef.current = scrolled;
    if (!didChangeToScrolled || !headerRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      headerRef.current,
      { y: -10, opacity: 0.88 },
      {
        y: 0,
        opacity: 1,
        duration: 0.42,
        ease: BJB_EASE.editorial,
        clearProps: "y,opacity",
      }
    );
  }, [scrolled]);

  // Mobile drawer open/close animation + accessible focus restoration
  useEffect(() => {
    if (mobileOpen) {
      setDrawerMounted(true);
      wasOpenRef.current = true;

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [mobileOpen]);

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
          y: 22,
          opacity: 0,
          duration: 0.45,
          stagger: 0.045,
          delay: 0.08,
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
      <header
        ref={headerRef}
        data-scrolled={scrolled ? "true" : "false"}
        className={`bjb-glass-nav z-40 rounded-[12px] transition-all duration-300 ${
          scrolled
            ? "fixed left-1/2 top-4 flex h-[62px] w-[min(92vw,995px)] -translate-x-1/2 items-center justify-between px-4 sm:px-6"
            : "fixed left-4 right-4 top-4 h-[62px] lg:absolute lg:left-[var(--r-nav-bar-x)] lg:right-auto lg:top-[var(--r-nav-bar-y)] lg:h-[var(--r-nav-bar-h)] lg:w-[var(--r-nav-bar-w)]"
        }`}
      >
        <a
          href="#topo"
          aria-label="BJB Growth — Início"
          data-cursor="action"
          className={
            scrolled
              ? "flex h-[44px] min-w-[96px] items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              : "absolute left-4 top-1/2 flex h-[44px] min-w-[96px] -translate-y-1/2 items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] lg:left-[3.11%] lg:h-[74%]"
          }
        >
          <img
            src="/assets/plates/brand-logo.png"
            alt="BJB Growth — Build Join Business"
            className="h-full w-auto min-w-[96px] object-contain object-left"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className={scrolled ? "hidden items-center gap-7 lg:flex" : "hidden lg:contents"}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                data-cursor="action"
                style={!scrolled ? { left: NAV_X_PERCENT[link.href] } : undefined}
                className={`bjb-roll-link font-normal tracking-[-0.015em] transition-colors duration-200 hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] ${
                  isActive ? "text-[#D9A566]" : "text-[#EEE7D8]/92"
                } ${
                  scrolled
                    ? "relative text-[15px]"
                    : "absolute top-1/2 -translate-y-1/2 text-[max(14px,1.235cqw)]"
                }`}
              >
                <RollText>{link.label}</RollText>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-1.5 left-0 right-0 h-[1.5px] origin-left bg-[#D9A566] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div
          className={
            scrolled
              ? "hidden lg:block"
              : "hidden lg:block absolute top-1/2 h-[61%] -translate-y-1/2"
          }
          style={!scrolled ? { left: "78.69%", width: "19.70%" } : undefined}
        >
          <Magnetic className="h-full w-full" strength={0.18} maxDistance={7}>
            <a
              href="#diagnostico"
              data-cursor="action"
              className={
                scrolled
                  ? "bjb-roll-link inline-flex h-[38px] items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] px-5 text-[14.5px] font-medium tracking-[-0.02em] text-[#2A211B] transition-[background-color,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8]"
                  : "bjb-roll-link inline-flex h-full w-full items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] text-[max(13px,1.126cqw)] font-medium tracking-[-0.02em] text-[#2A211B] transition-[background-color,transform] duration-200 hover:bg-[#E5B87E] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8]"
              }
            >
              <RollText className="[&_.bjb-roll-link__clone]:text-[#2A211B]">
                Solicitar diagnóstico
              </RollText>
            </a>
          </Magnetic>
        </div>

        {!scrolled && (
          <div className="flex h-full items-center justify-end gap-2.5 pr-3 lg:hidden">
            <a
              href="#diagnostico"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#D9A566] px-4 text-[13.5px] font-medium text-[#2A211B] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDD1B9]/25 bg-[#2A211B]/75 text-[#EEE7D8] transition-transform duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 6H17M3 10H17M3 14H17"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        )}

        {scrolled && (
          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="bjb-mobile-menu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDD1B9]/25 bg-[#2A211B]/75 text-[#EEE7D8] transition-transform duration-150 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M3 6H17M3 10H17M3 14H17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </svg>
          </button>
        )}
      </header>

      {drawerMounted && (
        <div
          id="bjb-mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#211914]/96 p-6 backdrop-blur-xl lg:hidden"
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

          <nav className="flex flex-col gap-5 py-8">
            <a
              href="#problemas"
              onClick={() => setMobileOpen(false)}
              className="bjb-drawer-item flex items-baseline justify-between border-b border-[#DDD1B9]/12 pb-3 text-[26px] font-medium tracking-[-0.02em] text-[#EEE7D8] transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
            >
              <span>O que trava a operação</span>
              <span className="tabular-nums text-[13px] text-[#D9A566]">02</span>
            </a>
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="bjb-drawer-item flex items-baseline justify-between border-b border-[#DDD1B9]/12 pb-3 text-[26px] font-medium tracking-[-0.02em] text-[#EEE7D8] transition-colors hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              >
                <span>{link.label}</span>
                <span className="tabular-nums text-[13px] text-[#D9A566]">0{idx + 3}</span>
              </a>
            ))}
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
