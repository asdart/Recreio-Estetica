"use client";

import { useEffect, useState, useCallback } from "react";

export type HeaderTheme = "light" | "dark";

/**
 * Monitors scroll position to determine whether the fixed header is overlapping
 * a dark or light background section. Sections opt-in via `data-header-theme`.
 *
 * Returns "light" when the header sits on a dark background (light text),
 * and "dark" when it sits on a light background (dark text).
 */
export function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("light");

  const recalculate = useCallback(() => {
    const headerBottom = 80;
    const probe = headerBottom / 2;

    const sections = document.querySelectorAll<HTMLElement>(
      "[data-header-theme]"
    );

    let result: HeaderTheme = "dark";

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) {
        result = (section.dataset.headerTheme as HeaderTheme) ?? "dark";
        break;
      }
    }

    setTheme(result);
  }, []);

  useEffect(() => {
    recalculate();

    window.addEventListener("scroll", recalculate, { passive: true });
    window.addEventListener("resize", recalculate, { passive: true });

    return () => {
      window.removeEventListener("scroll", recalculate);
      window.removeEventListener("resize", recalculate);
    };
  }, [recalculate]);

  return theme;
}
