"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { BJB_EASE, ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";

type SplitTag = "h1" | "h2" | "h3" | "p" | "div" | "span";
type SplitVariant = "lines" | "words" | "chars";

interface SplitRevealProps {
  as?: SplitTag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  variant?: SplitVariant;
  trigger?: "scroll" | "mount";
  start?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  children: ReactNode;
}

const DEFAULT_TIMING: Record<SplitVariant, { duration: number; stagger: number }> = {
  lines: { duration: 0.85, stagger: 0.085 },
  words: { duration: 0.72, stagger: 0.032 },
  chars: { duration: 0.65, stagger: 0.018 },
};

export function SplitReveal({
  as = "div",
  id,
  className,
  style,
  variant = "lines",
  trigger = "scroll",
  start = "top 85%",
  delay = 0,
  duration,
  stagger,
  children,
}: SplitRevealProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    ensureGsapPlugins();
    let cancelled = false;
    let splitInstance: SplitText | null = null;
    const mm = gsap.matchMedia();

    const defaults = DEFAULT_TIMING[variant];
    const animDuration = duration ?? defaults.duration;
    const animStagger = stagger ?? defaults.stagger;

    const initSplit = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Proceed with layout metrics if FontFaceSet check fails
      }

      if (cancelled || !elRef.current) return;

      mm.add(MOTION_QUERIES.motionAllowed, () => {
        splitInstance?.revert();
        splitInstance = SplitText.create(el, {
          type: variant,
          mask: variant,
          aria: "auto",
          autoSplit: true,
          onSplit(self) {
            const targets =
              variant === "lines"
                ? self.lines
                : variant === "words"
                  ? self.words
                  : self.chars;

            if (!targets.length) return;

            return gsap.from(targets, {
              yPercent: 108,
              rotate: variant === "lines" ? 0.5 : 0,
              opacity: 0.001,
              duration: animDuration,
              stagger: animStagger,
              delay,
              ease: BJB_EASE.expoOut,
              clearProps: "transform,opacity",
              scrollTrigger:
                trigger === "scroll"
                  ? {
                      trigger: el,
                      start,
                      once: true,
                    }
                  : undefined,
            });
          },
        });
      });
    };

    void initSplit();

    return () => {
      cancelled = true;
      splitInstance?.revert();
      mm.revert();
    };
  }, [variant, trigger, start, delay, duration, stagger]);

  return createElement(
    as,
    {
      ref: elRef,
      id,
      className,
      style,
    },
    children
  );
}
