"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { layouts, type PlanType } from "../../_content/configurations";
import { cn } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";

const tabs: Array<"All" | PlanType> = ["All", "1 BHK", "2 BHK", "Jodi"];

export function FloorPlans() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [selectedId, setSelectedId] = useState(layouts[0].id);

  const visible = tab === "All" ? layouts : layouts.filter((layout) => layout.type === tab);
  const selected = visible.find((layout) => layout.id === selectedId) ?? visible[0];

  return (
    <Section id="floor-plans" tone="cream">
      <div className="shell">
        <SectionHeading eyebrow="Floor Plans" title="Walk Through Every Layout" align="center">
          <p>Choose a layout to see its details, then ask for the full plan set.</p>
        </SectionHeading>

        <div data-reveal className="mt-12 flex justify-center">
          <div role="tablist" aria-label="Filter layouts" className="flex rounded-full border border-gold/40 bg-white/70 p-1.5">
            {tabs.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={tab === name}
                onClick={() => setTab(name)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition duration-500 ease-grand sm:px-7",
                  tab === name ? "bg-aubergine text-gold shadow-lg" : "text-brown/60 hover:text-brown",
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ul className="no-scrollbar flex gap-3 overflow-x-auto pb-1 lg:max-h-[34rem] lg:flex-col lg:overflow-y-auto lg:pr-1">
            {visible.map((layout) => {
              const isSelected = layout.id === selected.id;
              return (
                <li key={layout.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(layout.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-8 rounded-3xl border px-6 py-4 text-left transition duration-500 ease-grand",
                      isSelected
                        ? "border-aubergine bg-aubergine text-cream"
                        : "border-gold/30 bg-white/60 text-brown hover:border-gold hover:bg-white",
                    )}
                  >
                    <span>
                      <span className="block font-serif text-xl">{layout.name}</span>
                      <span className={cn("text-xs", isSelected ? "text-cream/60" : "text-brown/55")}>
                        Series {layout.series}
                      </span>
                    </span>
                    <span className={cn("whitespace-nowrap font-serif text-lg", isSelected ? "text-gold" : "text-gold-deep")}>
                      {layout.carpet} <span className="font-sans text-[0.65rem] uppercase tracking-widest">sq.ft.</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* key restarts the entrance animation whenever the selection changes */}
          <div
            key={selected.id}
            className="animate-rise relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2rem] border border-gold/40 bg-white lg:min-h-[34rem]"
            role="tabpanel"
          >
            {selected.image ? (
              <div className="relative flex-1">
                <Image
                  src={selected.image}
                  alt={`Floor plan: ${selected.name}, series ${selected.series}, ${selected.carpet} sq.ft. carpet`}
                  fill
                  sizes="(min-width: 1024px) 44rem, 92vw"
                  className="object-contain p-6"
                />
              </div>
            ) : (
              <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                {/* Drafting-paper grid until the plan drawing is supplied */}
                <div
                  className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(205,164,84,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(205,164,84,0.22)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
                  aria-hidden
                />
                <span className="relative flex size-14 items-center justify-center rounded-full bg-aubergine text-gold">
                  <Lock className="size-5" strokeWidth={1.5} />
                </span>
                <p className="eyebrow relative mt-6 text-gold-deep">Series {selected.series}</p>
                <h3 className="relative mt-3 font-serif text-4xl text-brown md:text-5xl">{selected.name}</h3>
                <p className="relative mt-4 font-serif text-6xl text-gold-deep md:text-7xl">
                  {selected.carpet}
                  <span className="ml-2 font-sans text-sm font-semibold uppercase tracking-[0.2em]">sq.ft.</span>
                </p>
                <p className="relative mt-2 text-xs uppercase tracking-[0.2em] text-brown/50">RERA carpet area</p>
                <p className="relative mt-6 max-w-sm text-sm leading-relaxed text-brown/65">
                  The detailed plan for this layout is shared by our sales team.
                </p>
              </div>
            )}
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-gold/25 bg-cream/60 px-6 py-5">
              <p className="text-sm text-brown/70">
                <span className="font-semibold text-brown">{selected.name}</span> · Series {selected.series} ·{" "}
                {selected.carpet} sq.ft.
              </p>
              <EnquireButton
                source={`floor-plans-${selected.id}`}
                heading="Request Full Plan Set"
                configuration={selected.formOption}
                className="px-6 py-3.5"
              >
                Request This Plan
              </EnquireButton>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-brown/50">
          Plans and areas are indicative and subject to approval by the relevant authorities.
        </p>
      </div>
    </Section>
  );
}
