import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITU AI",
  description: "Project hosting website of ITU Artificial Intelligence Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <Analytics />
      <body className={font.className}>{children}</body>
    </html>
  );
}
