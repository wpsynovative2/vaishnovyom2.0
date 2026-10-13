"use server";

import { validateEnquiry, type EnquiryState } from "../_lib/validation";

const CALL_US = "Please call us on +91 96533 59559 and we'll help you right away.";

/**
 * Validates an enquiry and forwards it to the Google Apps Script web app
 * (google-apps-script/Code.gs), which writes it to the Sheet and emails the sales team.
 */
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("website")) return { status: "success", errors: {}, values: {} };

  const { values, errors } = validateEnquiry(formData);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values, message: "Please check the highlighted fields." };
  }

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    console.error("[enquiry] GOOGLE_SCRIPT_URL is not set — the lead was NOT delivered.", values);
    return {
      status: "error",
      errors: {},
      values,
      message: `Our enquiry form is not connected yet. ${CALL_US}`,
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      // text/plain keeps Apps Script happy; the body is still JSON.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...values,
        secret: process.env.GOOGLE_SCRIPT_SECRET ?? "",
        submittedAt: new Date().toISOString(),
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await response.json();
    const ok = typeof result === "object" && result !== null && (result as { ok?: unknown }).ok === true;
    if (!response.ok || !ok) throw new Error(`Apps Script replied ${response.status}: ${JSON.stringify(result)}`);
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      status: "error",
      errors: {},
      values,
      message: `We couldn't send your details just now. ${CALL_US}`,
    };
  }

  return { status: "success", errors: {}, values: { name: values.name } };
}
