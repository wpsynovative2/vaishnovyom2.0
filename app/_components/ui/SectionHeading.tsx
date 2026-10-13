import type { ReactNode } from "react";
import { cn, stagger } from "../../_lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
};

/** Small ornament rule that sits under every section title. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={cn("h-3 w-[120px] text-gold", className)} aria-hidden>
      <path d="M0 6h44M76 6h44" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1l5 5-5 5-5-5z" fill="currentColor" />
      <circle cx="49" cy="6" r="1.5" fill="currentColor" />
      <circle cx="71" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({ eyebrow, title, children, align = "left", onDark = false, className }: Props) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <p data-reveal className={cn("eyebrow", onDark ? "text-gold" : "text-gold-deep")}>
        {eyebrow}
      </p>
      <h2
        data-reveal
        style={stagger(1)}
        className={cn(
          "mt-5 text-balance font-serif text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.08]",
          onDark ? "text-gold-gradient" : "text-brown",
        )}
      >
        {title}
      </h2>
      <div data-reveal style={stagger(2)} className={cn("mt-7", centered && "flex justify-center")}>
        <Ornament />
      </div>
      {children && (
        <div
          data-reveal
          style={stagger(3)}
          className={cn(
            "mt-7 space-y-4 text-base leading-[1.8] md:text-[1.05rem]",
            onDark ? "text-cream/75" : "text-brown/75",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
