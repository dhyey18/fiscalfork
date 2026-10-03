import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Contact — Fiscal Fork",
  description:
    "Book a consultation with Fiscal Fork. Tell us about your business and we'll reply within one business day.",
};

export default function Page() {
  return <Content />;
}
