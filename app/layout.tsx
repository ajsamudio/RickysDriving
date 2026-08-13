import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ScrollObserver from "@/components/ScrollObserver";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.startsWith("http") &&
  !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")
  ? process.env.NEXT_PUBLIC_APP_URL
  : "https://rickysdriving.com";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ricky's Driving | Orange County's Trusted Driving School",
    template: "%s | Ricky's Driving",
  },
  description:
    "Learn to drive with confidence. Ricky DeVera is Orange County's trusted driving instructor — flexible scheduling, personalized lessons, and a proven track record. Book your first lesson today.",
  applicationName: "Ricky's Driving",
  authors: [{ name: "Ricky's Driving" }],
  creator: "Ricky's Driving",
  publisher: "Ricky's Driving",
  category: "Driving School",
  keywords: [
    "driving school Orange County",
    "driving instructor OC",
    "learn to drive Irvine",
    "driving lessons Anaheim",
    "teen driving school CA",
  ],
  openGraph: {
    title: "Ricky's Driving | Orange County's Trusted Driving School",
    description:
      "Flexible, personalized driving lessons in Orange County, CA. 500+ students taught. Book today.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ricky's Driving",
    images: [
      {
        url: "/images/ricky.webp",
        width: 448,
        height: 560,
        alt: "Ricky DeVera, Orange County driving instructor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricky's Driving | Orange County Driving Lessons",
    description:
      "Patient, personalized driving lessons and DMV test preparation throughout Orange County, California.",
    images: ["/images/ricky.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": `${siteUrl}/#driving-school`,
  name: "Ricky's Driving",
  url: siteUrl,
  image: `${siteUrl}/images/ricky.webp`,
  telephone: "+1-562-424-8885",
  email: "info@rickysdriving.com",
  description:
    "Patient, personalized driving lessons and DMV test preparation throughout Orange County, California.",
  founder: {
    "@type": "Person",
    name: "Ricky DeVera",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Orange County, California",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-562-424-8885",
    contactType: "customer service",
    areaServed: "US-CA",
    availableLanguage: ["English", "Spanish"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased flex flex-col min-h-screen bg-white text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ScrollObserver />
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
