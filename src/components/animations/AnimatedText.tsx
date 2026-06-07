"use client";

import { useEffect, useRef, useId } from "react";
import gsap from "gsap";

type AnimatedTextProps = {
  text: string;
  type?: "chars" | "words";
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  y?: number;
};

export default function AnimatedText({
  text,
  type = "chars",
  stagger = 0.02,
  duration = 0.6,
  delay = 0,
  className = "",
  y = 40,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const raw = type === "words" ? text.split(" ") : [...text];
  const units = raw.map((unit, i) => ({
    unit,
    id: `${uid}-${unit}-${i}`,
    space: type === "words" && i < raw.length - 1,
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.style.opacity = "1";
      return;
    }

    const spans = el.querySelectorAll<HTMLSpanElement>(".char-span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
          delay,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, delay, y]);

  return (
    <div ref={containerRef} className={className}>
      {units.map(({ unit, id, space }) => (
        <span
          key={id}
          className="char-span inline-block"
          style={{ opacity: 0 }}
        >
          {unit}
          {space ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}
