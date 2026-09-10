"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type CascadeElement =
  | RefObject<HTMLElement | null>
  | RefObject<HTMLElement | null>[];

export interface UseAnimationFadeOptions {
  /** The main section container ref (or root of the panel) */
  sectionRef: RefObject<HTMLElement | null>;
  /**
   * Array of refs to animate in sequential cascade order.
   * - A single ref: animates as one step in the waterfall.
   * - An array of refs [refA, refB]: animates those elements together in that step.
   */
  elements?: CascadeElement[];
  /** Optional legacy headerRef support */
  headerRef?: RefObject<HTMLElement | null>;
  /** Optional legacy contentRef support */
  contentRef?: CascadeElement;
  /** ScrollTrigger start position, default is "top 60%" */
  start?: string;
  /** ScrollTrigger toggle actions, default is "play none none reverse" */
  toggleActions?: string;
  /** Duration of each element animation in seconds, default is 0.8 */
  duration?: number;
  /** Delay / timeline position offset between each step in the cascade (e.g. "-=0.4" for overlap, "+=0.1" for pause), default is "-=0.4" */
  staggerDelay?: string | number;
  /** Y displacement in pixels, default is 35 */
  yOffset?: number;
  /** GSAP ease curve, default is "power3.out" */
  ease?: string;
}

/**
 * Reusable GSAP ScrollTrigger hook for smooth cascade animations.
 * Animates elements in the exact order specified in the `elements` array.
 */
export function useAnimationFade({
  sectionRef,
  elements,
  headerRef,
  contentRef,
  start = "top 60%",
  toggleActions = "play none none reverse",
  duration = 0.8,
  staggerDelay = "-=0.4",
  yOffset = 35,
  ease = "power3.out",
}: UseAnimationFadeOptions) {
  // Use refs to avoid recreating the GSAP timeline on every re-render when inline arrays are passed
  const elementsRef = useRef(elements);
  elementsRef.current = elements;

  const headerRefRef = useRef(headerRef);
  headerRefRef.current = headerRef;

  const contentRefRef = useRef(contentRef);
  contentRefRef.current = contentRef;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panel =
        sectionRef.current?.closest(".panel-section") || sectionRef.current;
      if (!panel) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start,
          toggleActions,
        },
      });

      const currentElements = elementsRef.current;

      // Build the ordered cascade steps
      let cascadeSteps: (HTMLElement | HTMLElement[])[] = [];

      if (currentElements && currentElements.length > 0) {
        cascadeSteps = currentElements
          .map((item) => {
            if (Array.isArray(item)) {
              return item
                .map((ref) => ref.current)
                .filter(Boolean) as HTMLElement[];
            }
            return item.current;
          })
          .filter((item): item is HTMLElement | HTMLElement[] => {
            if (Array.isArray(item)) return item.length > 0;
            return Boolean(item);
          });
      } else {
        // Fallback for headerRef + contentRef
        if (headerRefRef.current?.current) {
          cascadeSteps.push(headerRefRef.current.current);
        }
        if (contentRefRef.current) {
          const raw = Array.isArray(contentRefRef.current) ? contentRefRef.current : [contentRefRef.current];
          const elList = raw
            .map((r) => r.current)
            .filter(Boolean) as HTMLElement[];
          if (elList.length > 0) {
            cascadeSteps.push(elList.length === 1 ? elList[0] : elList);
          }
        }
      }

      // Animate each step sequentially in the timeline
      cascadeSteps.forEach((step, index) => {
        const position = index === 0 ? undefined : staggerDelay;
        tl.fromTo(
          step,
          { opacity: 0, y: yOffset },
          { opacity: 1, y: 0, duration, ease },
          position
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [
    sectionRef,
    start,
    toggleActions,
    duration,
    staggerDelay,
    yOffset,
    ease,
  ]);
}

export default useAnimationFade;
