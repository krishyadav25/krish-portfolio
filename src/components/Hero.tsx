import React, { useEffect, useRef } from 'react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { ArrowDown, Code2, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const nameLine1Ref = useRef<HTMLSpanElement>(null)
  const nameLine2Ref = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Entrance Timeline (Crisp, fast, 0.9s sequence)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Background landscape settles from gentle scale
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.1, opacity: 0.7 },
          { scale: 1.0, opacity: 1, duration: 1.4, ease: 'power2.out' },
          0
        )
      }

      // Badge floats up
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.1
        )
      }

      // Oversized name masked reveal (masked words slide up)
      const nameElements = [nameLine1Ref.current, nameLine2Ref.current].filter(Boolean)
      if (nameElements.length > 0) {
        tl.fromTo(
          nameElements,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power4.out' },
          0.2
        )
      }

      // Tagline reveal
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.4
        )
      }

      // Factual subtext reveal
      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.52
        )
      }

      // Action buttons stagger
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
          0.62
        )
      }

      // Scroll cue
      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8
        )
      }

      // 2. Scroll-Driven Scrub: As user scrolls away, hero gracefully recedes
      if (heroRef.current && contentRef.current && bgRef.current) {
        gsap.to(contentRef.current, {
          y: -80,
          opacity: 0,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })

        gsap.to(bgRef.current, {
          yPercent: 20,
          scale: 0.95,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      aria-label="Introduction"
    >
      {/* Background Anime Landscape with Parallax Depth */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        <img
          src="/assets/hero-bg.jpg"
          alt="Cinematic twilight anime landscape with silver-rimmed dusk clouds, silhouetted rooftops, and distant mountains"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Layered dark indigo atmospheric overlays for crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/75 via-[#0B1020]/50 to-[#0B1020]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B1020]/25 to-[#0B1020]/95" />
      </div>

      {/* Atmospheric misty lavender glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[#A9A7D9]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center will-change-transform"
      >
        {/* Academic Affiliation Pill Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171D36]/80 border border-[#B9C9DE]/20 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A9A7D9] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono font-medium text-[#B9C9DE] tracking-wider uppercase">
            B.Tech CSE (AI & ML) • UPES Dehradun
          </span>
        </div>

        {/* Oversized Name with Masked Text Reveals */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#F1F4FA] mb-6 uppercase font-mono drop-shadow-sm flex flex-wrap justify-center gap-x-4">
          <span className="overflow-hidden inline-block py-1">
            <span ref={nameLine1Ref} className="inline-block will-change-transform">
              KRISH
            </span>
          </span>
          <span className="overflow-hidden inline-block py-1">
            <span ref={nameLine2Ref} className="inline-block will-change-transform">
              YADAV
            </span>
          </span>
        </h1>

        {/* Supporting Line */}
        <p
          ref={taglineRef}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-[#B9C9DE] tracking-wide max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          “{PERSONAL_INFO.tagline}”
        </p>

        {/* Short Introduction */}
        <p
          ref={subtextRef}
          className="text-sm sm:text-base text-[#66758F] max-w-xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {PERSONAL_INFO.heroSubtext}
        </p>

        {/* Call to Actions */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#F1F4FA] text-[#0B1020] font-semibold text-sm tracking-wide shadow-md hover:bg-[#B9C9DE] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200 group"
          >
            <Code2 className="w-4 h-4 text-[#0B1020] group-hover:rotate-12 transition-transform duration-200" />
            <span>Explore Projects</span>
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#171D36]/80 border border-[#B9C9DE]/25 text-[#F1F4FA] font-medium text-sm tracking-wide hover:bg-[#1E2644] hover:border-[#A9A7D9]/40 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none backdrop-blur-sm transition-all duration-200 group"
          >
            <Sparkles className="w-4 h-4 text-[#A9A7D9] group-hover:scale-125 transition-transform duration-200" />
            <span>About Me</span>
          </a>
        </div>

        {/* Minimal Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-[#66758F]"
        >
          <span className="text-[11px] tracking-widest uppercase font-mono text-[#66758F]">
            Scroll
          </span>
          <a
            href="#about"
            className="p-1.5 rounded-full hover:text-[#B9C9DE] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
            aria-label="Scroll to About section"
          >
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}
