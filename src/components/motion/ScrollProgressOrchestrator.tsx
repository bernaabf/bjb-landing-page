"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapPlugins, MOTION_QUERIES, scrollToAnchor } from "@/lib/motion";

export function ScrollProgressOrchestrator() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapPlugins();

    // Smooth anchor navigation across the whole page
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      const target = e.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      if (scrollToAnchor(href)) {
        e.preventDefault();
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Desktop fine-pointer cursor halo
    const cursorEl = cursorRef.current;
    let cleanupCursor: (() => void) | undefined;

    if (cursorEl && window.matchMedia(MOTION_QUERIES.finePointer).matches) {
      const xTo = gsap.quickTo(cursorEl, "x", { duration: 0.28, ease: "power3.out" });
      const yTo = gsap.quickTo(cursorEl, "y", { duration: 0.28, ease: "power3.out" });
      const scaleTo = gsap.quickTo(cursorEl, "scale", { duration: 0.28, ease: "power3.out" });
      const opacityTo = gsap.quickTo(cursorEl, "opacity", { duration: 0.2, ease: "power2.out" });

      let currentState = "";

      const onPointerMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        opacityTo(1);

        const target = e.target as Element | null;
        const cursorHost = target?.closest<HTMLElement>("[data-cursor]");
        const nextState = cursorHost?.dataset.cursor ?? "";

        if (nextState !== currentState) {
          currentState = nextState;
          if (nextState) {
            cursorEl.dataset.state = nextState;
          } else {
            delete cursorEl.dataset.state;
          }
          scaleTo(nextState === "action" ? 2.15 : nextState === "inspect" ? 1.7 : 1);
        }
      };

      const onPointerLeave = () => {
        opacityTo(0);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);

      cleanupCursor = () => {
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    // Refresh ScrollTrigger once Space Grotesk finishes loading and on debounced resize
    let cancelled = false;
    let resizeTimer: number | undefined;

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", handleAnchorClick);
      cleanupCursor?.();
    };
  }, []);

  return <div ref={cursorRef} aria-hidden="true" className="bjb-cursor-follower" />;
}
