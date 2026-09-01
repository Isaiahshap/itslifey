import type { CSSProperties, ReactNode } from "react";

type ClipRevealProps = {
  children: ReactNode;
  /** Delay in ms before the line lifts. */
  delay?: number;
  className?: string;
  as?: "span" | "div";
};

/** Masked line-lift: text rises through a clipped window. No opacity. */
export function ClipReveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "span",
}: ClipRevealProps) {
  const style = {
    ["--reveal-delay" as string]: `${delay}ms`,
  } as CSSProperties;

  return (
    <Tag className={`clip-reveal ${className}`.trim()} style={style}>
      <span className="clip-reveal__inner">{children}</span>
    </Tag>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms. */
  delay?: number;
  /** Extra class for variant: reveal-up | reveal-label | reveal-media */
  variant?: "up" | "label" | "media";
  as?: "div" | "span" | "p" | "figure";
};

const variantClass = {
  up: "reveal-up",
  label: "reveal-label",
  media: "reveal-media",
} as const;

/** Scroll/load rise — transform only, no opacity. Needs data-reveal (or hero is-ready). */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const style = {
    ["--reveal-delay" as string]: `${delay}ms`,
  } as CSSProperties;

  return (
    <Tag
      data-reveal=""
      className={`${variantClass[variant]} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
