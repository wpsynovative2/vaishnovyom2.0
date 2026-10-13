export const configurationOptions = [
  "1 BHK",
  "2 BHK",
  "Jodi (2+1 BHK)",
  "Jodi (2+2 BHK)",
  "Not sure yet",
] as const;

export type EnquiryValues = {
  name: string;
  mobile: string;
  email: string;
  configuration: string;
  message: string;
  source: string;
  pageUrl: string;
};

export type EnquiryErrors = Partial<Record<"name" | "mobile" | "email" | "consent", string>>;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors: EnquiryErrors;
  values: Partial<EnquiryValues>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", errors: {}, values: {} };

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateEnquiry(formData: FormData) {
  const values: EnquiryValues = {
    name: text(formData, "name", 80),
    mobile: text(formData, "mobile", 20).replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""),
    email: text(formData, "email", 120),
    configuration: text(formData, "configuration", 40),
    message: text(formData, "message", 1000),
    source: text(formData, "source", 60) || "website",
    pageUrl: text(formData, "pageUrl", 500),
  };

  const errors: EnquiryErrors = {};
  if (values.name.length < 2) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(values.mobile)) errors.mobile = "Enter a valid 10-digit mobile number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
    errors.email = "This email address doesn't look right.";
  if (formData.get("consent") !== "on") errors.consent = "Please tick the box so we can contact you.";

  return { values, errors };
}
