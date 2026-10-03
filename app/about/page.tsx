import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Our Team — Fiscal Fork",
  description:
    "Meet the three founders of Fiscal Fork — the accountants and advisors behind your numbers.",
};

export default function Page() {
  return <Content />;
}
