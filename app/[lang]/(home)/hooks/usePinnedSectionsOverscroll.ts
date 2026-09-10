import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const usePinnedSectionsOverscroll = (
  mainRef: React.RefObject<HTMLElement>,
) => {
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
            start: () =>
              panel.offsetHeight > window.innerHeight
                ? "bottom bottom"
                : "top top",
            endTrigger: nextPanel,
            end: "top top",
            pin: true,
            pinSpacing: false,
            onLeave: () => {
              // Hide completely once fully covered behind the next panel
              gsap.set(panel, { autoAlpha: 0 });
            },
            onEnterBack: () => {
              // Restore visibility when scrolling back up into it
              gsap.set(panel, { autoAlpha: 1 });
            },
          });

          // Smoothly scale down as a solid stacking card (preserving 100% opacity)
          gsap.fromTo(
            panel,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.96,
              filter: "brightness(0.9)",
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: panel,
                start: () =>
                  panel.offsetHeight > window.innerHeight
                    ? "bottom bottom"
                    : "top top",
                endTrigger: nextPanel,
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);
};
