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
function getThemeFromDOM(): HeaderTheme {
  if (typeof document === "undefined") return "dark";
  const headerBottom = 80;
  const probe = headerBottom / 2;
  const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom > probe) {
      return (section.dataset.headerTheme as HeaderTheme) ?? "dark";
    }
  }
  return "dark";
}

export function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>(getThemeFromDOM);

  const recalculate = useCallback(() => {
    setTheme(getThemeFromDOM());
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
