import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACM SVNIT",
  description: "Association for Computing Machinery — SVNIT Student Chapter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
