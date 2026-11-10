import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { brand, contact } from "@/data/site";
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

// Set NEXT_PUBLIC_SITE_URL in the environment (e.g. on Vercel) so canonical
// and social-image URLs resolve absolutely in production.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const TITLE = "Velmont Estates — From Vision to Reality";
const DESCRIPTION =
  "Velmont Estates crafts bespoke residences and architectural masterpieces — an immersive, cinematic journey through ultra-luxury living, walked room by room.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Velmont Estates",
  },
  description: DESCRIPTION,
  applicationName: brand.name,
  keywords: [
    "luxury real estate",
    "bespoke residences",
    "architectural masterpieces",
    "Velmont Estates",
    "premium villas",
    "ultra-prime property",
    "cinematic real estate",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: TITLE,
    description: "An immersive cinematic journey through ultra-luxury living.",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A Velmont Estates residence — a frame from the cinematic tour.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "An immersive cinematic journey through ultra-luxury living.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

// Structured data — RealEstateAgent schema for SEO.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: brand.name,
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  slogan: brand.tagline,
  email: contact.email,
  telephone: contact.phone,
  areaServed: contact.offices,
  foundingDate: "2004",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain antialiased">
        {/* Skip link for keyboard users — the preloader locks scroll briefly,
            so this lets them jump straight into the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-marble focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
