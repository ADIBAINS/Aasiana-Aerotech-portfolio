import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { default: "Aasiana Aerotech | Aviation Compliance & Clearances", template: "%s | Aasiana Aerotech" },
  description: "Airworthiness, DGCA liaison, aircraft induction and flight permission support for aviation operators in India.",
  metadataBase: siteUrl,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
