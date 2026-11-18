export function ArrowIcon({
  direction = "right",
  className = "h-3.5 w-3.5 shrink-0",
  kinetic = false,
}: {
  direction?: "right" | "left" | "up" | "down";
  className?: string;
  kinetic?: boolean;
}) {
  const rotation =
    direction === "left"
      ? "rotate-180"
      : direction === "up"
        ? "-rotate-90"
        : direction === "down"
          ? "rotate-90"
          : "";

  const svgNode = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`${rotation} ${className}`.trim()}
    >
      <path
        d="M2 7H12M8 3L12 7L8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );

  if (!kinetic) {
    return svgNode;
  }

  return (
    <span className="bjb-arrow-swap" data-dir={direction} aria-hidden="true">
      <span className="bjb-arrow-swap__primary">{svgNode}</span>
      <span className="bjb-arrow-swap__clone">{svgNode}</span>
    </span>
  );
}
