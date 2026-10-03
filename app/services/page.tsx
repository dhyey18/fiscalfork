import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Services — Fiscal Fork",
  description:
    "Bookkeeping, tax, payroll, financial reporting, CFO advisory, AP/AR, financial planning and business advisory from Fiscal Fork.",
};

export default function Page() {
  return <Content />;
}
