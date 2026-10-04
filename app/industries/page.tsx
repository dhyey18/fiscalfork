import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Industries — Fiscal Fork",
  description:
    "Specialized accounting for restaurants and hotels, construction, healthcare, professional services and e-commerce businesses.",
};

export default function Page() {
  return <Content />;
}
