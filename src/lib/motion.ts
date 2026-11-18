"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export const BJB_EASE = {
  editorial: "bjb-editorial",
  expoOut: "bjb-expo",
  tactile: "bjb-tactile",
  scroll: "bjb-scroll",
} as const;

export const MOTION_QUERIES = {
  motionAllowed: "(prefers-reduced-motion: no-preference)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  tabletMotion:
    "(min-width: 640px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  mobileMotion: "(max-width: 639px) and (prefers-reduced-motion: no-preference)",
  finePointer:
    "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

let registered = false;

export function ensureGsapPlugins(): void {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrollToPlugin);
  CustomEase.create(BJB_EASE.editorial, "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create(BJB_EASE.expoOut, "M0,0 C0.19,1 0.22,1 1,1");
  CustomEase.create(BJB_EASE.tactile, "M0,0 C0.25,0.8 0.25,1 1,1");
  CustomEase.create(BJB_EASE.scroll, "M0,0 C0.65,0 0.35,1 1,1");
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOTION_QUERIES.reducedMotion).matches;
}

export function scrollToAnchor(href: string, offsetY = 88): boolean {
  if (typeof window === "undefined" || !href.startsWith("#")) return false;
  ensureGsapPlugins();

  const isTop = href === "#topo";
  const target = isTop ? null : document.getElementById(href.slice(1));
  if (!isTop && !target) return false;

  if (prefersReducedMotion()) {
    if (isTop) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else if (target) {
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offsetY);
      window.scrollTo({ top, behavior: "auto" });
    }
  } else {
    gsap.to(window, {
      duration: 0.95,
      ease: BJB_EASE.scroll,
      scrollTo: {
        y: isTop ? 0 : target!,
        offsetY: isTop ? 0 : offsetY,
        autoKill: true,
      },
    });
  }

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", href);
  }
  return true;
}
