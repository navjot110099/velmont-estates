import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velmont Estates — From Vision to Reality",
  description:
    "Velmont Estates crafts bespoke residences and architectural masterpieces. An immersive cinematic journey through ultra-luxury living.",
  keywords: [
    "luxury real estate",
    "bespoke residences",
    "architectural masterpieces",
    "Velmont Estates",
    "premium villas",
  ],
  authors: [{ name: "Velmont Estates" }],
  openGraph: {
    title: "Velmont Estates — From Vision to Reality",
    description:
      "An immersive cinematic journey through ultra-luxury living.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
