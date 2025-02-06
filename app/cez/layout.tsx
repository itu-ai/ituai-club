import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cez | ITU AI",
};

export default function CezLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
