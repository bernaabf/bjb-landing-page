"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/data/bjb-content";

const NAV_X_PERCENT: Record<string, string> = {
  "#solucoes": "32.98%",
  "#fluxo": "43.82%",
  "#metodo": "51.66%",
  "#publico": "61.42%",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      wasOpenRef.current = true;
      closeBtnRef.current?.focus();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuBtnRef.current?.focus();
    }
  }, [mobileOpen]);

  return (
    <>
      <header
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
          className={
            scrolled
              ? "flex h-[44px] min-w-[96px] items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              : "absolute left-4 top-1/2 flex h-[44px] min-w-[96px] -translate-y-1/2 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] lg:left-[3.11%] lg:h-[74%]"
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={!scrolled ? { left: NAV_X_PERCENT[link.href] } : undefined}
              className={`font-normal tracking-[-0.015em] text-[#EEE7D8]/92 transition-colors duration-200 hover:text-[#D9A566] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566] ${
                scrolled
                  ? "text-[15px]"
                  : "absolute top-1/2 -translate-y-1/2 text-[max(14px,1.235cqw)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#diagnostico"
          className={
            scrolled
              ? "hidden h-[38px] items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] px-5 text-[14.5px] font-medium tracking-[-0.02em] text-[#2A211B] transition-colors duration-200 hover:bg-[#E5B87E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8] lg:inline-flex"
              : "hidden lg:inline-flex absolute top-1/2 h-[61%] -translate-y-1/2 items-center justify-center rounded-full border border-[#2A211B]/25 bg-[#D69D63] text-[max(13px,1.126cqw)] font-medium tracking-[-0.02em] text-[#2A211B] transition-colors duration-200 hover:bg-[#E5B87E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EEE7D8]"
          }
          style={!scrolled ? { left: "78.69%", width: "19.70%" } : undefined}
        >
          Solicitar diagnóstico
        </a>

        {!scrolled && (
          <div className="flex h-full items-center justify-end gap-2.5 pr-3 lg:hidden">
            <a
              href="#diagnostico"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#D9A566] px-4 text-[13.5px] font-medium text-[#2A211B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDD1B9]/25 bg-[#2A211B]/75 text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DDD1B9]/25 bg-[#2A211B]/75 text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566] lg:hidden"
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

      {mobileOpen && (
        <div
          id="bjb-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#211914]/96 p-6 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#DDD1B9]/15 pb-4">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DDD1B9]/30 text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A566]"
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
              className="flex items-baseline justify-between border-b border-[#DDD1B9]/12 pb-3 text-[26px] font-medium tracking-[-0.02em] text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
            >
              <span>O que trava a operação</span>
              <span className="tabular-nums text-[13px] text-[#D9A566]">02</span>
            </a>
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline justify-between border-b border-[#DDD1B9]/12 pb-3 text-[26px] font-medium tracking-[-0.02em] text-[#EEE7D8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9A566]"
              >
                <span>{link.label}</span>
                <span className="tabular-nums text-[13px] text-[#D9A566]">0{idx + 3}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-4">
            <a
              href="#diagnostico"
              onClick={() => setMobileOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#D9A566] text-[15px] font-medium text-[#2A211B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EEE7D8]"
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
