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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-5 hover:shadow-md transition-shadow">
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-gold"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-gray-600 text-sm leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-navy font-semibold text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}
