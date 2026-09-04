"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";

export function useHeroAnimation() {
  const { theme, toggleTheme } = useTheme();
  const [isInside, setIsInside] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const rosesRef = useRef<HTMLDivElement>(null);
  const splattersRef = useRef<HTMLDivElement>(null);
  const petalsContainerRef = useRef<HTMLDivElement>(null);
  const swordRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  const isDark = theme === "crimson";

  const handleSwordClick = () => {
    toggleTheme();

    if (swordRef.current) {
      isClickingRef.current = true;

      gsap.timeline({
        onComplete: () => {
          isClickingRef.current = false;
        },
      })
        .to(swordRef.current, {
          scale: 1.25,
          y: -35,
          rotation: -6,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(swordRef.current, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.4)",
        });
    }
  };

  // GSAP Entrance Timeline & Petal Physics
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (rosesRef.current) {
        tl.fromTo(
          rosesRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" },
          0.7
        );
      }

      if (petalsContainerRef.current) {
        const petals = petalsContainerRef.current.querySelectorAll(".drifting-petal");
        petals.forEach((petal, i) => {
          gsap.to(petal, {
            y: 700 + i * 30,
            x: i % 2 === 0 ? 80 : -80,
            rotation: i % 2 === 0 ? 180 : -180,
            duration: 10 + (i % 5) * 1.5,
            repeat: -1,
            ease: "none",
            delay: i * 0.8,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Sword Proximity Scaling Effect (MouseEnter, MouseMove & MouseLeave)
  useEffect(() => {
    const heroEl = heroRef.current;
    const swordEl = swordRef.current;
    if (!heroEl || !swordEl) return;

    let isMouseInside = false;

    const handleMouseEnter = () => {
      isMouseInside = true;
      setIsInside(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseInside || !swordEl || isClickingRef.current) return;

      const rect = swordEl.getBoundingClientRect();
      const swordCenterX = rect.left + rect.width / 2;
      const swordCenterY = rect.top + rect.height * 0.5;

      const distance = Math.hypot(e.clientX - swordCenterX, e.clientY - swordCenterY);
      const maxDistance = 650; // Influence area

      const proximity = Math.max(0, 1 - distance / maxDistance);
      const easedProximity = Math.pow(proximity, 1.4);

      const targetScale = 1 + easedProximity * 0.18; // Scales up to ~1.18x
      const targetY = -easedProximity * 28; // Subtle upward lift
      const targetRotate = ((e.clientX - swordCenterX) / maxDistance) * 3.5; // Organic tilt

      gsap.to(swordEl, {
        scale: targetScale,
        y: targetY,
        rotation: targetRotate,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
      setIsInside(false);
      if (!swordEl) return;

      gsap.to(swordEl, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    heroEl.addEventListener("mouseenter", handleMouseEnter);
    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mouseenter", handleMouseEnter);
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return {
    heroRef,
    headlineRef,
    rosesRef,
    splattersRef,
    petalsContainerRef,
    swordRef,
    isDark,
    isInside,
    handleSwordClick,
  };
}
