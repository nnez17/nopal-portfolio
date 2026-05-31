"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  selector?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  stagger = 0.15,
  selector,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const fromMap: Record<AnimationType, gsap.TweenVars> = {
      fadeUp: { y: 60, opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      scaleIn: { scale: 0.9, opacity: 0 },
    };

    const targets = selector ? el.querySelectorAll(selector) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...fromMap[animation] },
        {
          ...(animation === "fadeUp"
            ? { y: 0, opacity: 1 }
            : animation === "fadeLeft" || animation === "fadeRight"
              ? { x: 0, opacity: 1 }
              : { scale: 1, opacity: 1 }),
          duration: 0.8,
          ease: "power3.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [animation, delay, stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
