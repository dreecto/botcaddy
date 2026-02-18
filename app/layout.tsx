import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BotCaddy — AI Golf Caddy Over Text",
  description:
    "Learn every round, track your handicap, manage your clubs, and get on-course caddy advice — all over text. No app needed.",
  keywords: [
    "golf",
    "caddy",
    "AI caddy",
    "handicap tracker",
    "golf stats",
    "golf improvement",
    "text messaging",
    "SMS golf",
  ],
  openGraph: {
    title: "BotCaddy — AI Golf Caddy Over Text",
    description:
      "Learn every round, track your handicap, manage your clubs, and get on-course caddy advice — all over text.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BotCaddy — AI Golf Caddy Over Text",
    description:
      "Learn every round, track your handicap, manage your clubs, and get on-course caddy advice — all over text.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
