import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Resources — Fiscal Fork",
  description:
    "Guides, checklists and answers on bookkeeping, tax, cash flow and growth from the Fiscal Fork team.",
};

export default function Page() {
  return <Content />;
}
