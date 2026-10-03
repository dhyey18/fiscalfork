import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Industries — Fiscal Fork",
  description:
    "Specialized accounting for restaurants, healthcare, professional services, e-commerce, real estate and technology startups.",
};

export default function Page() {
  return <Content />;
}
