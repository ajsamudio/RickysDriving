"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Packages", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#FFFDF8]/95 backdrop-blur-md shadow-[0_1px_0_rgba(21,23,28,0.08),0_10px_30px_-20px_rgba(21,23,28,0.35)]"
          : "bg-[#FFFDF8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex-shrink-0 group" aria-label="Ricky's Driving home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rd-link text-[15px] font-semibold transition-colors ${
                    active ? "text-ink" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+15624248885"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink transition-colors"
            >
              <PhoneIcon />
              (562) 424-8885
            </a>
            <Link href="/booking" className="btn-primary btn-sm">
              Book a lesson
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-ink hover:bg-ink/5 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-[#FFFDF8]">
          <nav className="flex flex-col px-4 pt-3 pb-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between font-display text-2xl font-extrabold text-ink py-3 px-2 border-b border-ink/5"
              >
                {link.label}
                <span className="text-lane-dark text-lg">→</span>
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <a href="tel:+15624248885" className="btn-outline">
                <PhoneIcon />
                Call
              </a>
              <Link href="/booking" className="btn-primary">
                Book now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
