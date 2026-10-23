import Image from "next/image";
import RoadStrip from "@/components/RoadStrip";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}

/** Interior-page hero: copy on a paper grid, optional photo, road along the bottom. */
export default function PageHero({ eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-6 animate-rd-fade-up">{eyebrow}</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-ink leading-[0.98] text-balance animate-rd-fade-up delay-100">
                {title}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl animate-rd-fade-up delay-200">
                {description}
              </p>
              {children && (
                <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-rd-fade-up delay-300">
                  {children}
                </div>
              )}
            </div>

            {!image && <HeroSigns />}

            {image && (
              <div className="lg:col-span-5 animate-rd-fade-up delay-200">
                <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(21,23,28,0.55)] ring-1 ring-ink/10 rotate-[1.5deg]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RoadStrip />
    </section>
  );
}

/** Decorative winding-road warning sign for heroes without a photo. */
function HeroSigns() {
  return (
    <div className="hidden lg:flex lg:col-span-5 justify-center animate-rd-fade-up delay-200" aria-hidden="true">
      <div className="relative w-72 h-72 animate-rd-float">
        <div className="absolute inset-6 rotate-45 rounded-[36px] bg-ink/10 translate-x-5 translate-y-5" />
        <div className="absolute inset-6 rotate-45 rounded-[36px] bg-lane ring-[8px] ring-inset ring-ink shadow-[0_30px_50px_-20px_rgba(196,143,0,0.7)]" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto w-28 h-28 text-ink">
          <path
            d="M50 92 V74 C50 64 34 62 34 50 C34 38 66 38 66 26 V18"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M66 2 L83 24 H49 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
