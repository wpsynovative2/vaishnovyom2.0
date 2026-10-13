import type { ReactNode } from "react";
import { cn } from "../../_lib/cn";

type Tone = "cream" | "white" | "brown" | "aubergine";

type Props = {
  id: string;
  tone: Tone;
  children: ReactNode;
  className?: string;
};

const panelTone: Record<Exclude<Tone, "cream">, string> = {
  white: "pattern-light bg-white text-brown ring-1 ring-gold/25",
  brown: "pattern-dark bg-brown text-cream",
  aubergine: "pattern-dark bg-aubergine text-cream",
};

/**
 * Page section. "cream" sits directly on the page; every other tone is a
 * rounded panel inset from the viewport edge, dark ones edged with the chevron border.
 */
export function Section({ id, tone, children, className }: Props) {
  if (tone === "cream") {
    return (
      <section id={id} className={cn("scroll-mt-24 py-20 md:py-32", className)}>
        {children}
      </section>
    );
  }

  const dark = tone !== "white";
  return (
    <section id={id} className="scroll-mt-24 px-3 py-1.5 md:px-5 md:py-2.5">
      <div className={cn("overflow-hidden rounded-[2rem] md:rounded-[3rem]", panelTone[tone])}>
        {dark && <div className="chevron" aria-hidden />}
        <div className={cn("py-20 md:py-28", className)}>{children}</div>
        {dark && <div className="chevron rotate-180" aria-hidden />}
      </div>
    </section>
  );
}
