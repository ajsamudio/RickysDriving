interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <figure className="relative h-full bg-white/[0.04] rounded-[28px] ring-1 ring-white/10 p-8 flex flex-col gap-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
      <span
        className="absolute top-4 right-7 font-display font-black text-[96px] leading-none text-lane/20 select-none"
        aria-hidden="true"
      >
        &rdquo;
      </span>

      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-5 h-5 text-lane" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-white/85 text-[17px] leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-5 border-t border-white/10">
        <div className="w-11 h-11 rounded-full bg-lane flex items-center justify-center text-ink font-display font-black flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-bold">{name}</p>
          <p className="text-white/50 text-sm">{location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
