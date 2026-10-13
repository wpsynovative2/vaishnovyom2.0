"use client";

import { useActionState, useId } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "../../actions/enquiry";
import { configurationOptions, initialEnquiryState } from "../../_lib/validation";
import { site } from "../../_content/site";
import { cn } from "../../_lib/cn";
import { buttonClass } from "./button";

type Props = {
  source: string;
  configuration?: string;
  submitLabel?: string;
  /** Tighter two-column layout so the whole form fits in the dialog without scrolling. */
  compact?: boolean;
};

const fieldBase =
  "w-full border border-brown/15 bg-white px-4 text-brown placeholder:text-brown/35 transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 aria-[invalid=true]:border-red-700";
const label = "eyebrow text-[0.62rem] text-brown/70";

export function EnquiryForm({ source, configuration, submitLabel = "Request A Call Back", compact = false }: Props) {
  const field = cn(fieldBase, compact ? "mt-1.5 rounded-xl py-2.5 text-sm" : "mt-2 rounded-2xl py-3.5 text-[0.95rem]");
  // In compact mode, name and configuration share rows with mobile and email.
  const wide = compact ? undefined : "sm:col-span-2";
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const id = useId();

  if (state.status === "success") {
    return (
      <div className="animate-rise flex flex-col items-center py-10 text-center" role="status">
        <span className="bg-gold-gradient flex size-16 items-center justify-center rounded-full text-brown">
          <Check className="size-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-serif text-3xl text-brown">
          Thank you{state.values.name ? `, ${state.values.name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-brown/70">
          Your details are with our sales team. Expect a call from us shortly.
        </p>
        <a href={site.phoneHref} className={buttonClass("link", "mt-6")}>
          Or call {site.phoneDisplay}
        </a>
      </div>
    );
  }

  const { errors, values } = state;

  return (
    <form
      action={(formData) => {
        formData.set("pageUrl", window.location.href);
        formAction(formData);
      }}
      className={cn("grid sm:grid-cols-2", compact ? "gap-x-4 gap-y-3" : "gap-5")}
      noValidate
    >
      <input type="hidden" name="source" value={source} />
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={wide}>
        <label htmlFor={`${id}-name`} className={label}>
          Full name *
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={field}
        />
        <FieldError id={`${id}-name-error`} message={errors.name} />
      </div>

      <div>
        <label htmlFor={`${id}-mobile`} className={label}>
          Mobile number *
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-[0.95rem] text-brown/60">
            +91
          </span>
          <input
            id={`${id}-mobile`}
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={14}
            required
            defaultValue={values.mobile}
            aria-invalid={Boolean(errors.mobile)}
            aria-describedby={errors.mobile ? `${id}-mobile-error` : undefined}
            className={cn(field, "pl-14")}
          />
        </div>
        <FieldError id={`${id}-mobile-error`} message={errors.mobile} />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={field}
        />
        <FieldError id={`${id}-email-error`} message={errors.email} />
      </div>

      <div className={wide}>
        <label htmlFor={`${id}-configuration`} className={label}>
          Configuration
        </label>
        <select
          id={`${id}-configuration`}
          name="configuration"
          defaultValue={values.configuration ?? configuration ?? ""}
          className={field}
        >
          <option value="">Select an option</option>
          {configurationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={compact ? 1 : 3}
          defaultValue={values.message}
          className={cn(field, "resize-none")}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={cn("flex cursor-pointer items-start gap-3 text-brown/65", compact ? "text-[0.68rem] leading-snug" : "text-xs leading-relaxed")}>
          <input
            type="checkbox"
            name="consent"
            // Keep the tick when the form comes back with a different error.
            defaultChecked={state.status === "error" && !errors.consent}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[#8a6a24]"
          />
          <span>
            I authorise {site.developer} and its representatives to contact me by call, SMS, email and WhatsApp about
            this project. This overrides my registration on DNC / NDNC.
          </span>
        </label>
        <FieldError id={`${id}-consent-error`} message={errors.consent} />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-800 sm:col-span-2">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={buttonClass("gold", cn("w-full disabled:opacity-70 sm:col-span-2", compact && "py-3.5"))}>
        {pending && <LoaderCircle className="size-4 animate-spin" />}
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-700">
      {message}
    </p>
  );
}
