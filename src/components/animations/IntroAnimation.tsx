"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    const sub = subRef.current;
    if (!overlay || !text || !glow || !sub) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    tl.set(overlay, { display: "flex" })
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      )
      .fromTo(
        text,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.2",
      )
      .fromTo(
        glow,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 1.2, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        sub,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .to(sub, { opacity: 0, y: -10, duration: 0.3, delay: 0.4 })
      .to(text, { opacity: 0, y: -20, duration: 0.4 }, "-=0.2")
      .to(glow, { opacity: 0, duration: 0.4 }, "-=0.4")
      .to(overlay, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.3")
      .set(overlay, { display: "none" });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-[var(--color-bg-primary)]"
    >
      <div className="relative flex flex-col items-center">
        <div
          ref={glowRef}
          className="absolute h-40 w-40 rounded-full bg-[var(--color-accent-blue)]/30 blur-[80px]"
        />
        <div ref={textRef} className="relative">
          <span className="text-5xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-7xl md:text-8xl">
            Noval
          </span>
        </div>
        <div
          ref={subRef}
          className="relative mt-4 text-sm tracking-widest uppercase text-[var(--color-text-muted)]"
        >
          Portfolio
        </div>
      </div>
    </div>
  );
}
