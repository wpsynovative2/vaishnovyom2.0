import type { CSSProperties } from "react";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Stagger delay for [data-reveal] elements. */
export function stagger(index: number, step = 90): CSSProperties {
  return { "--d": `${index * step}ms` } as CSSProperties;
}
