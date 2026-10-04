import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Industries — Fiscal Fork",
  description:
    "Specialized accounting for fine dining, hotels and resorts, fast casual, bars, cafes, catering, food trucks and ghost kitchens.",
};

export default function Page() {
  return <Content />;
}
