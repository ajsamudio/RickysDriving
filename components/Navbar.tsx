"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <span className="text-navy font-black text-xl tracking-tight relative inline-block">
              Ricky&apos;s Driving
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full transition-transform origin-left group-hover:scale-x-105" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rd-link text-navy/70 hover:text-navy text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-gold hover:bg-gold-dark text-navy font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-navy font-medium py-3 px-3 rounded-lg hover:bg-off-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-gold hover:bg-gold-dark text-navy font-bold text-center py-3 rounded-lg transition-colors"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
