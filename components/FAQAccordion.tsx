"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group w-full flex items-center justify-between gap-6 text-left py-6"
              aria-expanded={isOpen}
            >
              <span
                className={`font-display text-lg sm:text-xl font-bold transition-colors ${
                  isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-lane text-ink rotate-45"
                    : "bg-paper text-ink group-hover:bg-lane/40"
                }`}
                aria-hidden="true"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14m-7-7h14" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-7 pr-14 text-ink-soft leading-relaxed text-base sm:text-[17px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
