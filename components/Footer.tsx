import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-white font-black text-xl tracking-tight relative inline-block">
                Ricky&apos;s Driving
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              Orange County&apos;s trusted driving school — building confident,
              safe drivers one lesson at a time.
            </p>
            {/* Social placeholders */}
            <div className="flex gap-3 mt-5">
              {["Facebook", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-colors text-xs font-bold"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>Orange County, CA</li>
              <li>
                <a
                  href="mailto:info@rickysdriving.com"
                  className="hover:text-gold transition-colors"
                >
                  info@rickysdriving.com
                </a>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gold hover:text-gold-light font-semibold transition-colors"
                >
                  Book a Lesson →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Ricky&apos;s Driving. All rights reserved.</p>
          <p>Orange County, CA</p>
        </div>
      </div>
    </footer>
  );
}
