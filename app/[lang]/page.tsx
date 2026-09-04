"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePage from "./(home)/HomePage";


export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel-section");

      panels.forEach((panel, i) => {
        // Pin current panel when the next panel slides up to cover it
        if (i < panels.length - 1) {
          const nextPanel = panels[i + 1];

          ScrollTrigger.create({
            trigger: panel,
            start: () => (panel.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
            endTrigger: nextPanel,
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          // Smoothly scale down, blur, and fade out the pinned panel while it is being covered
          gsap.fromTo(
            panel,
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            {
              scale: 0.94,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: panel,
                start: () => (panel.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
                endTrigger: nextPanel,
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <HomePage />
  );
}
