import Link from "next/link";
import Logo from "@/components/Logo";

const footerLinks = [
  { label: "About Ricky", href: "/about" },
  { label: "Lesson packages", href: "/services" },
  { label: "Book a lesson", href: "/booking" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const areas = ["Irvine", "Anaheim", "Santa Ana", "Costa Mesa", "Huntington Beach", "Tustin"];

export default function Footer() {
  return (
    <footer className="asphalt text-white relative overflow-hidden">
      {/* Center line running along the top edge */}
      <div className="lane-dash opacity-90" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block group" aria-label="Ricky's Driving home">
              <Logo tone="light" />
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed mt-6 max-w-sm">
              Patient, one-on-one driving lessons that turn nervous beginners
              into calm, licensed drivers — all across Orange County.
            </p>
            <div className="flex gap-2.5 mt-7">
              {["Facebook", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-lane hover:bg-lane hover:text-ink transition-colors text-xs font-bold"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-lane uppercase tracking-[0.18em] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-[15px] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-lane uppercase tracking-[0.18em] mb-5">
              Get in touch
            </h4>
            <a
              href="tel:+15624248885"
              className="block font-display text-3xl font-black tracking-tight hover:text-lane transition-colors"
            >
              (562) 424-8885
            </a>
            <a
              href="mailto:info@rickysdriving.com"
              className="block mt-2 text-white/70 hover:text-white text-[15px] transition-colors"
            >
              info@rickysdriving.com
            </a>
            <p className="mt-6 text-sm text-white/50 leading-relaxed">
              Serving {areas.join(", ")} &amp; all of OC.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Ricky&apos;s Driving. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lane" />
            Licensed California driving instruction
          </p>
        </div>
      </div>
    </footer>
  );
}
