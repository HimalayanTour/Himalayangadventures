import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://himalayangadventures.vercel.app"),

  title: {
    default: "Himalayan Adventures | Nepal, Bhutan, Tibet & India",
    template: "%s | Himalayan Adventures",
  },

  description:
    "Plan Himalayan journeys across Nepal, Bhutan, Tibet and the Indian Himalaya. Explore trekking routes, cultural journeys, current conditions and AI-assisted trip planning.",

  keywords: [
    "Himalayan tours",
    "Himalaya travel",
    "Nepal trekking",
    "Everest Base Camp",
    "Annapurna trekking",
    "Bhutan tours",
    "Tibet tours",
    "India Himalaya tours",
    "Ladakh tours",
    "Himalayan adventure",
    "Himalayan trekking",
  ],

  authors: [
    {
      name: "Himalayan Adventures",
    },
  ],

  creator: "Himalayan Adventures",
  publisher: "Himalayan Adventures",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Himalayan Adventures",
    title: "Himalayan Adventures | Nepal, Bhutan, Tibet & India",
    description:
      "Explore Himalayan journeys, trekking routes and cultural experiences across Nepal, Bhutan, Tibet and the Indian Himalaya.",
    images: [
      {
        url: "/ChatGPT Image Sep 7, 2026, 12_42_57 AM.png",
        width: 1200,
        height: 630,
        alt: "Himalayan Adventures",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Himalayan Adventures | Nepal, Bhutan, Tibet & India",
    description:
      "Explore Himalayan journeys across Nepal, Bhutan, Tibet and the Indian Himalaya.",
    images: ["/ChatGPT Image Sep 7, 2026, 12_42_57 AM.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell">
      <header className="nav">
        <div className="container navin">
          <Link href="/" className="brand">
            HIMALAYAN<span>26</span>
          </Link>

          <nav className="navlinks" aria-label="Main navigation">
            <Link href="/explore">Explore</Link>
            <Link href="/tours">Tours</Link>
            <Link href="/ai-trip-planner">AI Planner</Link>
            <Link href="/weather-conditions">Conditions</Link>
            <Link href="/about">About</Link>
          </nav>

          <Link href="/contact-book" className="btn desktopPlanButton">
            Plan my trip
          </Link>

          <MobileNav />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container footergrid">
          <div>
            <div className="brand">
              HIMALAYAN<span>26</span>
            </div>

            <p>
              Thoughtful journeys through the world&apos;s highest mountains,
              designed with current information and human guidance.
            </p>
          </div>

          <div className="list">
            <strong>Explore</strong>

            <Link href="/nepal">Nepal</Link>
            <Link href="/bhutan">Bhutan</Link>
            <Link href="/tibet">Tibet</Link>
            <Link href="/india-himalaya">India Himalaya</Link>
          </div>

          <div className="list">
            <strong>Plan</strong>

            <Link href="/ai-trip-planner">AI Trip Planner</Link>
            <Link href="/custom-journey">Custom Journey</Link>
            <Link href="/contact-book">Contact &amp; Book</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
