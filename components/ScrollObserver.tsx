"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that watches every element with
 * `data-reveal` and adds `is-revealed` once it enters the viewport.
 *
 * Pair with these CSS rules (in globals.css):
 *   [data-reveal]:not(.is-revealed) { opacity: 0; transform: translateY(20px); ... }
 *   [data-reveal].is-revealed       { opacity: 1; transform: none; }
 *
 * Optional per-element delay:
 *   <div data-reveal data-reveal-delay="120">
 */
export default function ScrollObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (el: Element) => {
      const delay = (el as HTMLElement).dataset.revealDelay;
      if (delay && !reduceMotion) {
        (el as HTMLElement).style.transitionDelay = `${Number(delay)}ms`;
      }
      el.classList.add("is-revealed");
    };

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (reduceMotion) {
      // Show everything instantly for users who prefer reduced motion.
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Watch for nodes inserted later (e.g., client-rendered booking wizard steps).
    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.("[data-reveal]")) observer.observe(node);
          node.querySelectorAll?.("[data-reveal]:not(.is-revealed)").forEach(
            (el) => observer.observe(el)
          );
        });
      }
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
