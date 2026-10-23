"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "../../_content/site";
import { cn } from "../../_lib/cn";
import { EnquireButton } from "../ui/EnquireButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of nav) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
        <div
          className={cn(
            "mx-auto flex max-w-[1320px] items-center min-[1640px]:max-w-[1560px] justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-700 ease-grand md:pl-6",
            scrolled || menuOpen
              ? "border-gold/30 bg-aubergine/90 shadow-[0_18px_40px_-20px_rgba(53,21,0,0.8)] backdrop-blur-md"
              : "border-transparent bg-transparent md:mt-3",
          )}
        >
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} — back to top`}>
            <Image src="/images/vaishno-vyom-mark.png" alt="" width={400} height={357} className="h-9 w-auto md:h-10" />
            <span className="whitespace-nowrap leading-none">
              <span className="block font-sans text-[0.8rem] font-medium uppercase tracking-[0.3em] text-gold-gradient md:text-sm">
                {site.name}
              </span>
              <span className="mt-1 block text-[0.55rem] font-medium uppercase tracking-[0.32em] text-cream/60">
                {site.locality}
              </span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden min-[1360px]:block">
            <ul className="flex items-center gap-6 whitespace-nowrap">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "relative py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 hover:text-gold",
                      active === item.id ? "text-gold after:scale-x-100" : "text-cream/80 after:scale-x-0",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap px-3 text-xs font-semibold tracking-[0.08em] text-cream transition hover:text-gold md:max-[1359px]:flex min-[1640px]:flex"
            >
              <Phone className="size-3.5 text-gold" />
              {site.phoneDisplay}
            </a>
            <div className="hidden sm:block">
              <EnquireButton source="header" className="whitespace-nowrap px-6 py-3.5">
                Enquire Now
              </EnquireButton>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-gold/40 text-gold min-[1360px]:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "pattern-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-aubergine px-7 pb-28 pt-28 transition-[clip-path,opacity] duration-700 ease-grand min-[1360px]:hidden",
          menuOpen ? "opacity-100 [clip-path:inset(0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Sections">
          <ul>
            {nav.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "border-b border-gold/15 transition-all duration-700 ease-grand",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: menuOpen ? `${120 + index * 50}ms` : "0ms" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-5 py-4 font-serif text-3xl text-cream"
                >
                  <span className="eyebrow w-6 text-gold">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={site.phoneHref} className="mt-8 flex items-center gap-3 text-sm font-semibold tracking-[0.08em] text-cream">
          <Phone className="size-4 text-gold" />
          {site.phoneDisplay}
        </a>
      </div>
    </>
  );
}
