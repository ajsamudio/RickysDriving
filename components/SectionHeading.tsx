interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "text-center mx-auto" : ""} max-w-2xl ${className}`}
      data-reveal="up"
    >
      {eyebrow && (
        <span className={`eyebrow mb-4 ${tone === "light" ? "!text-lane" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-4xl sm:text-5xl font-black leading-[1.02] text-balance ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            tone === "light" ? "text-white/65" : "text-ink-soft"
          } ${centered ? "max-w-xl mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
