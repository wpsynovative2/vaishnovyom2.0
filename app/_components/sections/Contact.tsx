import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { site } from "../../_content/site";
import { stagger } from "../../_lib/cn";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { EnquiryForm } from "../ui/EnquiryForm";

type Detail = { icon: LucideIcon; label: string; value: string; href: string; external?: boolean };

const details: Detail[] = [
  { icon: MapPin, label: "Sales Gallery", value: site.addressLines.join(" "), href: site.mapsHref, external: true },
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with our sales team", href: site.whatsappHref, external: true },
  { icon: ShieldCheck, label: "MahaRERA", value: site.rera, href: site.reraHref, external: true },
];

export function Contact() {
  return (
    <Section id="contact" tone="white">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="flex items-start gap-8">
            <Image
              data-reveal="zoom"
              src="/images/vaishno-vyom-badge.png"
              alt={`${site.name}, ${site.locality}`}
              width={600}
              height={847}
              className="hidden h-auto w-28 shrink-0 sm:block"
            />
            <SectionHeading eyebrow="Contact Us" title="Answer The Golden Call">
              <p>Visit the sales gallery, call us, or leave your details — we respond within one working hour.</p>
            </SectionHeading>
          </div>

          <ul className="mt-10">
            {details.map((detail, index) => (
              <li key={detail.label} data-reveal style={stagger(index, 70)} className="border-b border-gold/25">
                <a
                  href={detail.href}
                  {...(detail.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition duration-500 group-hover:border-aubergine group-hover:bg-aubergine group-hover:text-gold">
                    <detail.icon className="size-[1.1rem]" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="eyebrow block text-[0.6rem] text-gold-deep">{detail.label}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug text-brown">{detail.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal="zoom"
          className="rounded-[2rem] border border-gold/40 bg-cream p-6 shadow-[0_40px_80px_-50px_rgba(53,21,0,0.5)] sm:p-10"
        >
          <p className="eyebrow text-gold-deep">Register Your Interest</p>
          <h3 className="mt-3 font-serif text-3xl text-brown">Request A Call Back</h3>
          <div className="mt-7">
            <EnquiryForm source="contact" />
          </div>
        </div>
      </div>
    </Section>
  );
}
