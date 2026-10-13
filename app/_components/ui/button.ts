import { cn } from "../../_lib/cn";

export type ButtonVariant = "gold" | "outline-light" | "outline-dark" | "dark" | "link";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] transition duration-500 ease-grand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

const variants: Record<ButtonVariant, string> = {
  gold: `${base} btn-shine bg-gold-gradient text-brown shadow-[0_14px_34px_-14px_rgba(205,164,84,0.9)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(205,164,84,1)]`,
  "outline-light": `${base} border border-gold/60 text-cream hover:border-gold hover:bg-gold/10`,
  "outline-dark": `${base} border border-brown/25 text-brown hover:border-aubergine hover:bg-aubergine hover:text-cream`,
  dark: `${base} bg-aubergine text-cream hover:-translate-y-0.5 hover:bg-aubergine-soft`,
  link: "inline-flex cursor-pointer items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep underline decoration-gold/50 underline-offset-4 transition hover:text-brown hover:decoration-brown",
};

export function buttonClass(variant: ButtonVariant = "gold", className?: string) {
  return cn(variants[variant], className);
}
