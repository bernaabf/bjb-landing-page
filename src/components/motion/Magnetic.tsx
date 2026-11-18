"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  strength?: number;
  maxDistance?: number;
}

export function Magnetic({
  children,
  className,
  style,
  strength = 0.22,
  maxDistance = 9,
}: MagneticProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    ensureGsapPlugins();
    const mq = window.matchMedia(MOTION_QUERIES.finePointer);
    if (!mq.matches) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.42, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.42, ease: "power3.out" });

    const clamp = (val: number) => Math.max(-maxDistance, Math.min(maxDistance, val));

    const handleMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const relY = (e.clientY - (rect.top + rect.height / 2)) * strength;
      xTo(clamp(relX));
      yTo(clamp(relY));
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      gsap.set(node, { clearProps: "x,y" });
    };
  }, [strength, maxDistance]);

  return (
    <div ref={wrapRef} className={className} style={style}>
      {children}
    </div>
  );
}
