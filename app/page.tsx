import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col w-full selection:bg-red-800 selection:text-white">
      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Main Single Page Application Content */}
      <main className="flex-1 flex flex-col w-full">
        {/* 1. Hero Section (Detailed with GSAP & Visual Assets) */}
        <Hero />

        {/* 2. About Me Section (Structured Template) */}
        <About />

        {/* 3. Projects Section (Structured Template) */}
        <Projects />

        {/* 4. Contact Section (Structured Template) */}
        <Contact />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
