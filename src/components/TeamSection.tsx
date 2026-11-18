"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TEAM_MEMBERS } from "@/data/bjb-content";
import { BJB_EASE, ensureGsapPlugins, MOTION_QUERIES } from "@/lib/motion";
import { SplitReveal } from "./motion/SplitReveal";

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureGsapPlugins();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(MOTION_QUERIES.motionAllowed, () => {
        gsap.from(".bjb-team-hairline", {
          scaleX: 0,
          duration: 0.78,
          ease: BJB_EASE.expoOut,
          clearProps: "transform",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-team-intro", {
          y: 16,
          opacity: 0,
          duration: 0.72,
          ease: BJB_EASE.editorial,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".bjb-team-card", {
          y: 26,
          clipPath: "inset(8% 0% 0% 0% round 16px)",
          duration: 0.8,
          stagger: 0.11,
          ease: BJB_EASE.expoOut,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: ".bjb-team-grid",
            start: "top 82%",
            once: true,
          },
        });
      });

      mm.add(MOTION_QUERIES.desktopMotion, () => {
        gsap.fromTo(
          ".bjb-team-center-parallax",
          { y: 10 },
          {
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: ".bjb-team-grid",
              start: "top 85%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="equipe"
      ref={sectionRef}
      aria-labelledby="equipe-heading"
      className="bjb-linho-cross-ground relative border-t border-[#2A211B]/12 bg-[#EEE7D8] py-24 text-[#2A211B] lg:py-32"
    >
      <div className="mx-auto max-w-[1376px] px-5 sm:px-8 lg:px-14">
        <div className="relative grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitReveal
              as="h2"
              id="equipe-heading"
              variant="lines"
              className="m-0 text-[clamp(2rem,3.6vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
            >
              Desenvolvedores e proprietários à frente de cada entrega.
            </SplitReveal>
          </div>

          <div className="lg:col-span-5">
            <p className="bjb-team-intro m-0 max-w-[42ch] text-[17px] leading-[1.55] text-[#2A211B]/85">
              A BJB Growth combina desenvolvimento de software, automação e direção operacional
              diretamente pelos fundadores — do diagnóstico à entrada em operação.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="bjb-hairline bjb-team-hairline absolute bottom-0 left-0 right-0 h-px bg-[#2A211B]/18"
          />
        </div>

        <ul className="bjb-team-grid m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3 lg:gap-7">
          {TEAM_MEMBERS.map((member, idx) => (
            <li
              key={member.id}
              className={`bjb-team-card ${idx === 1 ? "bjb-team-center-parallax" : ""}`.trim()}
            >
              <div
                data-cursor="inspect"
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#2A211B]/18 bg-[#EEE7D8] p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#2A211B]/40 hover:shadow-[0_18px_36px_rgba(42,33,27,0.08)] sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#2A211B]/12 pb-5">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2A211B] text-[12.5px] font-medium tracking-[0.04em] text-[#EEE7D8] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:bg-[#9A4B30]"
                      >
                        {member.initials}
                      </span>
                      <span className="tabular-nums text-[14px] font-medium tracking-[0.04em] text-[#9A4B30]">
                        {member.index}
                      </span>
                    </div>

                    <span className="rounded-full border border-[#2A211B]/22 bg-[#DDD1B9]/55 px-3 py-1 text-[12px] font-medium text-[#2A211B] transition-colors duration-200 group-hover:border-[#2A211B]/35">
                      {member.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[24px] font-medium leading-[1.18] tracking-[-0.024em] text-[#2A211B]">
                    {member.name}
                  </h3>

                  <p className="mt-2.5 text-[16.5px] font-medium leading-[1.4] text-[#2A211B]/90">
                    {member.role}
                  </p>
                </div>

                <div className="mt-8 rounded-xl bg-[#DDD1B9]/60 p-4 transition-colors duration-250 group-hover:bg-[#DDD1B9]/85 lg:min-h-[96px]">
                  <p className="m-0 text-[11.5px] font-medium uppercase tracking-[0.06em] text-[#2A211B]/80">
                    {member.detailLabel}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-[1.45] text-[#2A211B]">
                    {member.detailText}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
