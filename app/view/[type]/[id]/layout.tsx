import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View | ITU AI",
};

export default function ViewLayout({
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
