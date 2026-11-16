"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  scrollDirection: "up" | "down";
}

export function useScroll(threshold = 48): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    scrollDirection: "up",
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      setState({
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
        scrollDirection: direction,
      });
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
