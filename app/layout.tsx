import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PaisaCaddy — AI Golf Caddy Over Text",
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
    title: "PaisaCaddy — AI Golf Caddy Over Text",
    description:
      "Learn every round, track your handicap, manage your clubs, and get on-course caddy advice — all over text.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaisaCaddy — AI Golf Caddy Over Text",
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
        className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
