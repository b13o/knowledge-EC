import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import PreviewBanner from "@/components/preview-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowledge EC",
  description: "Premium content marketplace for technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className}  antialiased`}>
        <PreviewBanner />
        <Header />
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
