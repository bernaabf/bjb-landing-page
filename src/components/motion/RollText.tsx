"use client";

import type { ReactNode } from "react";

export function RollText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`bjb-roll-link__track ${className ?? ""}`.trim()}>
      <span className="bjb-roll-link__primary">{children}</span>
      <span aria-hidden="true" className="bjb-roll-link__clone">
        {children}
      </span>
    </span>
  );
}
