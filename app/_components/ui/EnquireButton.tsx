"use client";

import type { ReactNode } from "react";
import { buttonClass, type ButtonVariant } from "./button";

export const ENQUIRE_EVENT = "enquire:open";

export type EnquireDetail = {
  /** Where on the page the visitor clicked — saved with the lead. */
  source: string;
  heading?: string;
  configuration?: string;
};

type Props = EnquireDetail & {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/** Opens the shared enquiry dialog. */
export function EnquireButton({ children, variant = "gold", className, source, heading, configuration }: Props) {
  return (
    <button
      type="button"
      className={buttonClass(variant, className)}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent<EnquireDetail>(ENQUIRE_EVENT, { detail: { source, heading, configuration } }),
        )
      }
    >
      {children}
    </button>
  );
}
