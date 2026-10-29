import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { initSmoothScroll } from './utils/smoothScroll'

export default function App() {
  // Initialize Lenis smooth scroll coordinated with GSAP ScrollTrigger
  useEffect(() => {
    const cleanup = initSmoothScroll()
    return () => cleanup()
  }, [])

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F1F4FA] flex flex-col font-sans selection:bg-[#A9A7D9]/25 selection:text-[#F1F4FA]">
      {/* Accessible Skip Link */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F1F4FA] focus:text-[#0B1020] focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
