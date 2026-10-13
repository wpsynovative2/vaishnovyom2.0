"use client";

import { useEffect } from "react";

/** Mounted once. Marks every [data-reveal] element as revealed when it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
