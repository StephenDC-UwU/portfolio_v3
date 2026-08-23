"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Pinned Slides Wrapper */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Projects Section */}
        <Projects />

        {/* 4. Contact Section & Footer */}
        <Contact />
      </main>
    </div>
  );
}
