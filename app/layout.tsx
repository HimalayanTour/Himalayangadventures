import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://himalayangadventures.vercel.app"),

  title: {
    default: "Himalayan Adventures | Tibet Tours & Private Journeys",
    template: "%s | Himalayan Adventures",
  },

  description:
    "Explore thoughtfully designed Tibet tours and private journeys through Lhasa, Shigatse, Everest, Mount Kailash, Namtso and the Tibetan Plateau, with AI-assisted trip planning and human guidance.",

  keywords: [
    "Tibet tours",
    "Tibet travel",
    "Tibet private tours",
    "Tibet tour 2026",
    "Lhasa tours",
    "Tibet Everest Base Camp",
    "Mount Kailash tour",
    "Kailash Kora",
    "Namtso Lake tour",
    "Tibetan Plateau",
    "Tibet cultural tours",
    "Tibet photography tours",
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
    title: "Himalayan Adventures | Tibet Tours & Private Journeys",
    description:
      "Explore Tibet through thoughtfully designed journeys to Lhasa, Everest, Mount Kailash, Namtso and across the Tibetan Plateau.",
    images: [
      {
        url: "/ChatGPT Image Sep 7, 2026, 12_42_57 AM.png",
        width: 1200,
        height: 630,
        alt: "Tibet journeys with Himalayan Adventures",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Himalayan Adventures | Tibet Tours & Private Journeys",
    description:
      "Explore thoughtfully designed journeys through Lhasa, Everest, Mount Kailash and the Tibetan Plateau.",
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
            <Link href="/tibet">Explore Tibet</Link>
            <Link href="/tours">Tibet Tours</Link>
            <Link href="/ai-trip-planner">AI Planner</Link>
            <Link href="/weather-conditions">Conditions</Link>
            <Link href="/about">About</Link>
          </nav>

          <Link href="/contact-book" className="btn desktopPlanButton">
            Plan my Tibet trip
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
              Thoughtfully designed journeys across Tibet, combining cultural
              understanding, high-altitude landscapes, smarter planning and
              human guidance.
            </p>
          </div>

          <div className="list">
            <strong>Explore Tibet</strong>

            <Link href="/tibet">Discover Tibet</Link>
            <Link href="/tours">Tibet Tours</Link>
            <Link href="/culture-heritage">Culture &amp; Heritage</Link>
            <Link href="/photography-tours">Photography</Link>
            <Link href="/weather-conditions">Travel Conditions</Link>
          </div>

          <div className="list">
            <strong>Plan your journey</strong>

            <Link href="/ai-trip-planner">AI Trip Planner</Link>
            <Link href="/compare-trips">Compare Journeys</Link>
            <Link href="/custom-journey">Private Journey</Link>
            <Link href="/contact-book">Contact &amp; Book</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
