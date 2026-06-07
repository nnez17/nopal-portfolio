"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "reveal";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  selector?: string;
  start?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SectionReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  selector,
  start = "top 85%",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const fromMap: Record<AnimationType, gsap.TweenVars> = {
      fadeUp: { y: 60, opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      scaleIn: { scale: 0.9, opacity: 0 },
      reveal: { scaleY: 0, transformOrigin: "top center" },
    };

    const toMap: Record<AnimationType, gsap.TweenVars> = {
      fadeUp: { y: 0, opacity: 1 },
      fadeLeft: { x: 0, opacity: 1 },
      fadeRight: { x: 0, opacity: 1 },
      scaleIn: { scale: 1, opacity: 1 },
      reveal: { scaleY: 1, transformOrigin: "top center" },
    };

    const targets = selector ? el.querySelectorAll(selector) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromMap[animation], {
        ...toMap[animation],
        duration,
        ease: "power3.out",
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, selector, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
