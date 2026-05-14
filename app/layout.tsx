import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ricky's Driving | Orange County's Trusted Driving School",
    template: "%s | Ricky's Driving",
  },
  description:
    "Learn to drive with confidence. Ricky DeVera is Orange County's trusted driving instructor — flexible scheduling, personalized lessons, and a proven track record. Book your first lesson today.",
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
        <AnnouncementBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
