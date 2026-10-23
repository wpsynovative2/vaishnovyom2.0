import Image from "next/image";
import { cn } from "../../_lib/cn";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** "gold": gold hairline outside the image. "aubergine": dark band with a gold hairline inside. */
  variant?: "gold" | "aubergine";
  position?: string;
  preload?: boolean;
  className?: string;
};

/** The brand's arch shape (brand kit: "place amenity images inside it"). Set width/aspect via className. */
export function ArchFrame({ src, alt, sizes, variant = "gold", position, preload, className }: Props) {
  const aubergine = variant === "aubergine";
  return (
    <div
      className={cn(
        "group relative aspect-[10/14] rounded-full",
        aubergine ? "bg-aubergine shadow-[0_30px_60px_-30px_rgba(53,21,0,0.7)]" : "border border-gold/70",
        className,
      )}
    >
      <div className="absolute inset-2.5 overflow-hidden rounded-full md:inset-3">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          style={{ objectPosition: position }}
          className="object-cover transition-transform duration-[1600ms] ease-grand group-hover:scale-[1.06]"
        />
      </div>
      {aubergine && (
        <div className="pointer-events-none absolute inset-[18px] rounded-full border border-gold/70 md:inset-[22px]" aria-hidden />
      )}
    </div>
  );
}
