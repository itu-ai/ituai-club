import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turing | ITU AI",
};

export default function TuringLayout({
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
