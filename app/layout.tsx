import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Ottoman Society — Werde Pascha",
  description: "Qualifiziere dich für die exklusive Mitgliedschaft der Royal Ottoman Society",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
