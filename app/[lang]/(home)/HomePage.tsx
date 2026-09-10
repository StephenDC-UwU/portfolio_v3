
import { useEffect, useRef } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { usePinnedSectionsOverscroll } from "./hooks/usePinnedSectionsOverscroll";

const HomePage = () => {
    const mainRef = useRef<HTMLElement>(null);
    usePinnedSectionsOverscroll(mainRef);


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