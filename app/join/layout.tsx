import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link | ITU AI",
};

export default function LinkLayout({
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
