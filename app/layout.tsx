import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { default: "Aasiana Aerotech | Aviation Compliance & Clearances", template: "%s | Aasiana Aerotech" },
  description: "Airworthiness, DGCA liaison, aircraft induction and flight permission support for aviation operators in India.",
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Aasiana Aerotech",
    description: "Technical clarity for airworthy, compliant and operational aviation.",
    type: "website",
    url: "/",
    siteName: "Aasiana Aerotech",
    images: [{ url: "/images/og-aasiana.jpg", width: 1200, height: 630, alt: "Aasiana Aerotech aviation consultancy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aasiana Aerotech",
    description: "Airworthiness, regulatory liaison and operational permission support.",
    images: ["/images/og-aasiana.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: "Airworthiness, DGCA liaison, aircraft induction and flight permission support for aviation operators in India.",
  url: siteUrl.toString(),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: "India",
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  sameAs: [siteConfig.linkedIn].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://o4511596799262720.ingest.us.sentry.io" />
        <link rel="dns-prefetch" href="https://o4511596799262720.ingest.us.sentry.io" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
