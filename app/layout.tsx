import type { Metadata } from "next";
import { PT_Mono } from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics";

const font = PT_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITU AI",
  description: "Project hosting website of ITU Artificial Intelligence Club",
  applicationName: "ITU AI",
  generator: "Next.js",
  keywords: ["ITU", "AI", "Artificial Intelligence", "Projects"],
  robots: "index, follow",
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
