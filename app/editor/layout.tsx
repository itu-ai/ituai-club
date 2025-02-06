import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor | ITU AI",
};

export default function EditorLayout({
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
