
import { useEffect, useRef } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar/Navbar";

const HomePage = () => {
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
        <div className="relative w-full min-h-screen bg-bg-primary overflow-x-hidden">
            {/* Floating Pill Navigation */}
            <Navbar />

            {/* Main Content Wrapper */}
            <main ref={mainRef} className="slides-wrapper relative w-full">
                {/* 1. Hero Section (Strictly 100dvh pinned cover) */}
                <div className="panel-section relative z-10 w-full min-h-dvh bg-bg-primary">
                    <Hero />
                </div>

                {/* 2. About Me Section (Strictly 100dvh pinned slide with shadow) */}
                <div className="panel-section relative z-20 w-full min-h-dvh bg-bg-primary shadow-[0_-25px_50px_rgba(0,0,0,0.35)]">
                    <About />
                </div>

                {/* 3. Projects Section (Full natural scrollable content with shadow) */}
                <div className="panel-section relative z-30 w-full bg-bg-primary shadow-[0_-25px_50px_rgba(0,0,0,0.35)]">
                    <Projects />
                </div>

                {/* 4. Contact Section (100dvh pinned slide with shadow) */}
                <div className="panel-section relative z-40 w-full min-h-dvh bg-bg-primary shadow-[0_-25px_50px_rgba(0,0,0,0.35)]">
                    <Contact />
                </div>

                {/* 5. Footer Section (100dvh pinned slide with shadow) */}
                <div className="panel-section relative z-50 w-full min-h-dvh bg-bg-primary shadow-[0_-25px_50px_rgba(0,0,0,0.35)]">
                    <Footer />
                </div>
            </main>
        </div>
    )
}

export default HomePage