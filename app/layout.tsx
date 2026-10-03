import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiscal Fork — Modern Accounting & Financial Services",
  description:
    "Fiscal Fork provides modern accounting and financial services — bookkeeping, tax, payroll, reporting and CFO advisory — that give businesses clarity, control, and confidence to grow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
