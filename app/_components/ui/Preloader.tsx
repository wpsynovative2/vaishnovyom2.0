import Image from "next/image";
import { site } from "../../_content/site";

/** Opening curtain. Pure CSS (see .preloader in globals.css), so it never waits on JavaScript. */
export function Preloader() {
  return (
    <div
      className="preloader pattern-dark fixed inset-0 z-[100] flex flex-col items-center justify-center bg-aubergine"
      aria-hidden
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={400}
        height={374}
        loading="eager"
        className="preloader-mark h-auto w-28 md:w-36"
      />
      <p className="preloader-word mt-8 font-sans text-sm font-medium uppercase tracking-[0.5em] text-gold-gradient md:text-base">
        {site.name}
      </p>
      <div className="mt-8 h-px w-44 overflow-hidden bg-gold/20">
        <div className="preloader-bar bg-gold-gradient h-full w-full" />
      </div>
      <p className="preloader-word eyebrow mt-6 text-cream/50">Codename {site.codename}</p>
    </div>
  );
}
