import { ArrowUpRight } from "lucide-react";
import { layouts, summaries } from "../../_content/configurations";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquireButton } from "../ui/EnquireButton";

export function Configuration() {
  return (
    <Section id="configuration" tone="white">
      <div className="shell">
        <SectionHeading eyebrow="Configuration" title="Nine Layouts. One Address." align="center">
          <p>From a smart 1 BHK to a sprawling Jodi residence, there is a home here for every stage of life.</p>
        </SectionHeading>

        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {summaries.map((item, index) => (
            <li
              key={item.type}
              data-reveal
              style={stagger(index)}
              className="group relative overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-gold/40 bg-cream px-8 pb-9 pt-16 text-center transition duration-700 ease-grand hover:-translate-y-2 hover:bg-aubergine hover:text-cream"
            >
              <p className="eyebrow text-gold-deep transition-colors duration-700 group-hover:text-gold">{item.note}</p>
              <h3 className="mt-4 font-serif text-5xl">{item.type}</h3>
              <p className="mt-5 font-serif text-2xl text-gold-deep transition-colors duration-700 group-hover:text-gold">
                {item.range}
                <span className="ml-2 font-sans text-xs font-semibold uppercase tracking-[0.18em]">sq.ft.</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] opacity-60">RERA carpet area</p>
              <div className="mt-7">
                <EnquireButton
                  source={`configuration-card-${item.type}`}
                  heading={`Enquire About ${item.type}`}
                  configuration={item.formOption}
                  variant="link"
                  className="group-hover:text-gold!"
                >
                  Get price
                  <ArrowUpRight className="size-3.5" />
                </EnquireButton>
              </div>
            </li>
          ))}
        </ul>

        {/* Table on desktop */}
        <div data-reveal className="mt-14 hidden overflow-hidden rounded-[2rem] border border-gold/30 bg-white md:block">
          <table className="w-full text-left">
            <thead className="bg-aubergine text-gold">
              <tr>
                {["Configuration", "Series", "RERA Carpet Area", "Price"].map((heading) => (
                  <th key={heading} scope="col" className="eyebrow px-8 py-5 last:text-right">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {layouts.map((layout) => (
                <tr key={layout.id} className="border-t border-gold/15 transition-colors hover:bg-cream/70">
                  <th scope="row" className="px-8 py-5 font-serif text-xl font-normal text-brown">
                    {layout.name}
                  </th>
                  <td className="px-8 py-5 text-sm text-brown/70">Series {layout.series}</td>
                  <td className="px-8 py-5 font-serif text-xl text-brown">
                    {layout.carpet} <span className="font-sans text-xs text-brown/60">sq.ft.</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <EnquireButton
                      source={`configuration-table-${layout.id}`}
                      heading={`Price For ${layout.name}`}
                      configuration={layout.formOption}
                      variant="link"
                    >
                      On request
                    </EnquireButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards on phones */}
        <ul className="mt-10 space-y-3 md:hidden">
          {layouts.map((layout, index) => (
            <li
              key={layout.id}
              data-reveal
              style={stagger(index % 3)}
              className="flex items-center justify-between gap-4 rounded-3xl border border-gold/30 bg-white px-5 py-4"
            >
              <div>
                <p className="font-serif text-lg text-brown">{layout.name}</p>
                <p className="text-xs text-brown/60">
                  Series {layout.series} · {layout.carpet} sq.ft.
                </p>
              </div>
              <EnquireButton
                source={`configuration-list-${layout.id}`}
                heading={`Price For ${layout.name}`}
                configuration={layout.formOption}
                variant="link"
                className="shrink-0"
              >
                Price
              </EnquireButton>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-brown/60">Jodi homes are available on select floors only.</p>
          <EnquireButton source="configuration" heading="Check Availability" variant="dark">
            Check Availability
          </EnquireButton>
        </div>
      </div>
    </Section>
  );
}
