"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { site } from "../../_content/site";
import { ENQUIRE_EVENT, type EnquireDetail } from "./EnquireButton";
import { EnquiryForm } from "./EnquiryForm";

/** Mounted once. Any EnquireButton on the page opens it. */
export function EnquiryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<(EnquireDetail & { key: number }) | null>(null);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<EnquireDetail>).detail;
      setRequest((previous) => ({ ...detail, key: (previous?.key ?? 0) + 1 }));
      if (!ref.current?.open) ref.current?.showModal();
    };
    window.addEventListener(ENQUIRE_EVENT, open);
    return () => window.removeEventListener(ENQUIRE_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="enquiry-dialog-title"
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === ref.current) ref.current?.close();
      }}
      className="open:animate-dialog m-auto max-h-[92svh] w-[min(94vw,60rem)] overflow-hidden rounded-[2rem] bg-cream p-0 text-brown shadow-2xl"
    >
      <div className="grid max-h-[92svh] md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative hidden overflow-hidden bg-aubergine md:block">
          <Image
            src="/images/elevation-dusk.jpg"
            alt=""
            fill
            sizes="24rem"
            className="object-cover object-[22%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aubergine via-aubergine/30 to-transparent" />
          <div className="absolute inset-x-8 bottom-8">
            <Image src="/images/go-grand-lockup.webp" alt={`Codename ${site.codename}`} width={900} height={562} className="h-auto w-36" />
            <p className="mt-4 text-sm leading-relaxed text-cream/80">
              1 &amp; 2 BHK and Jodi residences at Kathiyawadi Chowk, Malad (East).
            </p>
          </div>
        </div>

        <div className="relative max-h-[92svh] overflow-y-auto p-6 sm:p-10">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-brown/15 text-brown transition hover:bg-aubergine hover:text-cream"
          >
            <X className="size-4" />
          </button>
          <p className="eyebrow text-gold-deep">Register Your Interest</p>
          <h2 id="enquiry-dialog-title" className="mt-3 pr-10 font-serif text-3xl leading-tight sm:text-4xl">
            {request?.heading ?? "Get Price & Floor Plans"}
          </h2>
          <p className="mt-3 text-sm text-brown/65">Share your details and our team will call you back.</p>
          <div className="mt-7">
            {request && (
              <EnquiryForm key={request.key} source={request.source} configuration={request.configuration} />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
