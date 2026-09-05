import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Himalayan Adventures 2026",
  description: "AI-powered Himalayan journeys across Nepal, Bhutan, Tibet and the Indian Himalaya."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <div className="shell">
    <header className="nav">
      <div className="container navin">
        <Link href="/" className="brand">HIMALAYAN<span>26</span></Link>
        <nav className="navlinks">
          <Link href="/explore">Explore</Link><Link href="/tours">Tours</Link><Link href="/ai-trip-planner">AI Planner</Link><Link href="/weather-conditions">Conditions</Link><Link href="/about">About</Link>
        </nav>
        <Link href="/contact-book" className="btn">Plan my trip</Link>
      </div>
    </header>
    <main>{children}</main>
    <footer className="footer"><div className="container footergrid"><div><div className="brand">HIMALAYAN<span>26</span></div><p>Thoughtful journeys through the world's highest mountains, designed with current information and human guidance.</p></div><div className="list"><strong>Explore</strong><Link href="/nepal">Nepal</Link><Link href="/bhutan">Bhutan</Link><Link href="/tibet">Tibet</Link><Link href="/india-himalaya">India Himalaya</Link></div><div className="list"><strong>Plan</strong><Link href="/ai-trip-planner">AI Trip Planner</Link><Link href="/custom-journey">Custom Journey</Link><Link href="/contact-book">Contact & Book</Link><Link href="/admin">Admin</Link></div></div></footer>
  </div>
}
