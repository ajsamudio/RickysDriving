import Image from "next/image";
import Link from "next/link";

interface CtaSignProps {
  tab?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing call to action, drawn as an overhead freeway sign above the open road. */
export default function CtaSign({
  tab = "Next exit",
  title,
  body,
  primary = { label: "Book your lesson", href: "/booking" },
  secondary = { label: "Call (562) 424-8885", href: "tel:+15624248885" },
}: CtaSignProps) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src="/images/coast-road.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div data-reveal="zoom">
          {/* Exit tab */}
          <div className="flex justify-end pr-6 sm:pr-10">
            <span className="sign-plate !rounded-b-none !shadow-none px-5 pt-2.5 pb-2 text-white text-xs sm:text-sm font-display font-black uppercase tracking-[0.14em] -mb-[6px] relative z-10">
              {tab}
            </span>
          </div>

          <div className="sign-plate px-7 py-10 sm:px-14 sm:py-14 text-center">
            <div className="flex justify-center mb-5" aria-hidden="true">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M24 42V20m0 0l-9 9m9-9l9 9" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" transform="rotate(45 24 24)" />
              </svg>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-[1] text-balance">
              {title}
            </h2>
            <p className="text-white/80 text-lg mt-5 max-w-xl mx-auto leading-relaxed">{body}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
              <Link href={primary.href} className="btn-primary">
                {primary.label}
                <ArrowIcon />
              </Link>
              {secondary.href.startsWith("tel:") ? (
                <a href={secondary.href} className="btn-ghost-light">
                  {secondary.label}
                </a>
              ) : (
                <Link href={secondary.href} className="btn-ghost-light">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>

          {/* Sign posts */}
          <div className="flex justify-between px-[18%] -mt-px" aria-hidden="true">
            <span className="w-3 h-16 sm:h-24 bg-gradient-to-b from-[#9aa0a8] to-[#5d636b]" />
            <span className="w-3 h-16 sm:h-24 bg-gradient-to-b from-[#9aa0a8] to-[#5d636b]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
