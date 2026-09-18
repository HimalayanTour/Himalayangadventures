
"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobileNav">
      <button
        type="button"
        className="mobileMenuButton"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="mobileMenu"
        >
          <Link href="/explore" onClick={closeMenu}>
            Explore
          </Link>

          <Link href="/tours" onClick={closeMenu}>
            Tours
          </Link>

          <Link href="/ai-trip-planner" onClick={closeMenu}>
            AI Planner
          </Link>

          <Link href="/weather-conditions" onClick={closeMenu}>
            Conditions
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link
            href="/contact-book"
            className="btn mobilePlanButton"
            onClick={closeMenu}
          >
            Plan my trip
          </Link>
        </div>
      )}
    </div>
  );
}
