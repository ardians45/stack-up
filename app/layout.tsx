import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// TAMBAHKAN ATAU MODIFIKASI BAGIAN INI
export const metadata: Metadata = {
  title: "Tower of Hanoi by Ardian", // Judul baru untuk tab browser
  description: "A classic puzzle game, Tower of Hanoi, built by Ardian Setiawan with Next.js.",
};
// ------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}