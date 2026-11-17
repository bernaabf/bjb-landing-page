"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM_MEMBERS } from "@/data/bjb-content";

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bjb-team-card", {
          y: 18,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          clearProps: "transform",
        });
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
        <div className="grid grid-cols-1 gap-8 border-b border-[#2A211B]/18 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="equipe-heading"
              className="m-0 text-[clamp(2rem,3.6vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.032em] text-[#2A211B] [text-wrap:balance]"
            >
              Desenvolvedores e proprietários à frente de cada entrega.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="m-0 max-w-[42ch] text-[17px] leading-[1.55] text-[#2A211B]/85">
              A BJB Growth combina desenvolvimento de software, automação e direção operacional
              diretamente pelos fundadores — do diagnóstico à entrada em operação.
            </p>
          </div>
        </div>

        <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3 lg:gap-7">
          {TEAM_MEMBERS.map((member) => (
            <li
              key={member.id}
              className="bjb-team-card flex flex-col justify-between rounded-2xl border border-[#2A211B]/18 bg-[#EEE7D8] p-7 transition-colors duration-200 hover:border-[#2A211B]/35 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-[#2A211B]/12 pb-5">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2A211B] text-[12.5px] font-medium tracking-[0.04em] text-[#EEE7D8]"
                    >
                      {member.initials}
                    </span>
                    <span className="tabular-nums text-[14px] font-medium tracking-[0.04em] text-[#9A4B30]">
                      {member.index}
                    </span>
                  </div>

                  <span className="rounded-full border border-[#2A211B]/22 bg-[#DDD1B9]/55 px-3 py-1 text-[12px] font-medium text-[#2A211B]">
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

              <div className="mt-8 rounded-xl bg-[#DDD1B9]/60 p-4 lg:min-h-[96px]">
                <p className="m-0 text-[11.5px] font-medium uppercase tracking-[0.06em] text-[#2A211B]/80">
                  {member.detailLabel}
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.45] text-[#2A211B]">
                  {member.detailText}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
