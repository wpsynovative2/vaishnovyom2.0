export type PlanType = "1 BHK" | "2 BHK" | "Jodi";

export type Layout = {
  id: string;
  type: PlanType;
  /** Label shown to visitors, e.g. "Jodi 2+1 BHK". */
  name: string;
  series: string;
  carpet: number;
  /** Value pre-selected in the enquiry form. */
  formOption: string;
  /** Path to the floor plan image once supplied, e.g. "/floor-plans/1bhk-series-5.jpg". */
  image?: string;
};

export const layouts: Layout[] = [
  { id: "1bhk-5", type: "1 BHK", name: "1 BHK", series: "5", carpet: 484, formOption: "1 BHK" },
  { id: "2bhk-6", type: "2 BHK", name: "2 BHK", series: "6", carpet: 628, formOption: "2 BHK" },
  { id: "2bhk-4", type: "2 BHK", name: "2 BHK", series: "4", carpet: 796, formOption: "2 BHK" },
  { id: "2bhk-2", type: "2 BHK", name: "2 BHK", series: "2", carpet: 807, formOption: "2 BHK" },
  { id: "2bhk-3", type: "2 BHK", name: "2 BHK", series: "3", carpet: 819, formOption: "2 BHK" },
  { id: "2bhk-1", type: "2 BHK", name: "2 BHK", series: "1", carpet: 839, formOption: "2 BHK" },
  { id: "jodi-56", type: "Jodi", name: "Jodi 2+1 BHK", series: "5 & 6", carpet: 1112, formOption: "Jodi (2+1 BHK)" },
  { id: "jodi-34", type: "Jodi", name: "Jodi 2+2 BHK", series: "3 & 4", carpet: 1615, formOption: "Jodi (2+2 BHK)" },
  { id: "jodi-12", type: "Jodi", name: "Jodi 2+2 BHK", series: "1 & 2", carpet: 1646, formOption: "Jodi (2+2 BHK)" },
];

export const summaries: Array<{ type: PlanType; range: string; note: string; formOption: string }> = [
  { type: "1 BHK", range: "484", note: "A smart first address", formOption: "1 BHK" },
  { type: "2 BHK", range: "628 – 839", note: "Five layouts to choose from", formOption: "2 BHK" },
  { type: "Jodi", range: "1112 – 1646", note: "Two homes, joined as one", formOption: "Jodi (2+2 BHK)" },
];
