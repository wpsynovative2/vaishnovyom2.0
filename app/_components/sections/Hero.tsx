import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ShieldCheck, TramFront } from "lucide-react";
import { heroStats, site } from "../../_content/site";
import { buttonClass } from "../ui/button";
import { EnquireButton } from "../ui/EnquireButton";
import { ArchFrame } from "../ui/ArchFrame";

// Hero content rises in just as the preloader curtain lifts.
const after = (ms: number): CSSProperties => ({ animationDelay: `${1900 + ms}ms` });

export function Hero() {
  return (
    <section id="top" className="p-3 md:p-5">
      <div className="pattern-dark relative flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[2rem] bg-aubergine text-cream md:min-h-[calc(100svh-2.5rem)] md:rounded-[3rem]">
        {/* Warm glow behind the tower */}
        <div
          className="pointer-events-none absolute -right-40 top-1/2 size-[52rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,164,84,0.28),transparent_62%)]"
          aria-hidden
        />

        <div className="shell relative grid flex-1 items-center gap-12 pb-12 pt-28 md:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <div className="animate-rise flex items-center gap-4" style={after(0)}>
              <span className="h-px w-10 bg-gold" aria-hidden />
              <p className="eyebrow text-gold">Codename</p>
            </div>
            <Image
              src="/images/go-grand-lockup.webp"
              alt={site.codename}
              width={900}
              height={562}
              preload
              className="animate-rise mt-4 h-auto w-36 md:w-44"
              style={after(100)}
            />

            <h1 className="mt-8 font-serif text-[clamp(2.7rem,6vw,5rem)] leading-[1.02]">
              <span className="block overflow-hidden pb-1">
                <span className="animate-rise block" style={after(200)}>
                  Own A
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="animate-rise block" style={after(320)}>
                  <span className="text-gold-gradient">Higher Place</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="animate-rise block" style={after(440)}>
                  In The City
                </span>
              </span>
            </h1>

            <p className="animate-rise mt-6 max-w-xl text-base leading-[1.8] text-cream/75 md:text-lg" style={after(580)}>
              1 &amp; 2 BHK and Jodi residences of 484–1646 sq.ft. carpet, set above an elevated amenities deck at
              Kathiyawadi Chowk, Malad (East).
            </p>

            <div className="animate-rise mt-9 flex flex-wrap gap-4" style={after(700)}>
              <EnquireButton source="hero">Get Price &amp; Floor Plans</EnquireButton>
              <a href="#floor-plans" className={buttonClass("outline-light")}>
                Explore Floor Plans
                <ArrowDown className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="animate-fade relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-[26rem]" style={after(300)}>
            {/* Slowly turning dashed ring around the arch */}
            <div
              className="animate-spin-slow absolute -inset-10 rounded-full border border-dashed border-gold/25 max-sm:hidden"
              aria-hidden
            />
            <ArchFrame
              src="/images/elevation-clouds.jpg"
              alt="Artist's impression of the Vaishno Vyom tower rising above the clouds"
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 19rem"
              preload
            />
            <div className="animate-float absolute -left-4 top-[16%] flex items-center gap-3 rounded-full border border-gold/40 bg-aubergine/85 py-2 pl-2 pr-5 backdrop-blur-md md:-left-12">
              <span className="bg-gold-gradient flex size-9 items-center justify-center rounded-full text-brown">
                <TramFront className="size-4" />
              </span>
              <span className="text-xs leading-tight">
                <span className="block font-serif text-lg leading-none text-gold">2 min</span>
                <span className="text-cream/70">Dindoshi Metro</span>
              </span>
            </div>
            <div
              className="animate-float absolute -right-3 bottom-[14%] flex items-center gap-3 rounded-full border border-gold/40 bg-aubergine/85 py-2 pl-2 pr-5 backdrop-blur-md [animation-delay:-3.5s] md:-right-10"
            >
              <span className="bg-gold-gradient flex size-9 items-center justify-center rounded-full text-brown">
                <ShieldCheck className="size-4" />
              </span>
              <span className="text-xs leading-tight">
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">MahaRERA</span>
                <span className="font-semibold tracking-wider text-gold">{site.rera}</span>
              </span>
            </div>
          </div>
        </div>

        <dl className="animate-rise relative grid grid-cols-2 border-t border-gold/20 lg:grid-cols-4" style={after(860)}>
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-gold/20 px-5 py-6 text-center md:py-8 ${index % 2 === 1 ? "border-l" : ""} ${index === 2 ? "lg:border-l" : ""} ${index < 2 ? "max-lg:border-b" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="text-gold-gradient block font-serif text-2xl md:text-4xl">{stat.value}</span>
                <span className="eyebrow mt-2 block text-[0.6rem] text-cream/60">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="chevron" aria-hidden />
      </div>
    </section>
  );
}
