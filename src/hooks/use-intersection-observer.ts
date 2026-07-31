"use client";

import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  onIntersect: () => void,
  enabled: boolean,
) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    const target = targetRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [onIntersect, enabled]);

  return targetRef;
}
