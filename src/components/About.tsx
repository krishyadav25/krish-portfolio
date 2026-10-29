import React, { useEffect, useRef } from 'react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { GraduationCap, Compass } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Heading and text scroll entrance reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 2. Parallax scrub on About artwork image
      if (imgContainerRef.current && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -10, scale: 1.08 },
          {
            yPercent: 10,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: imgContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 sm:py-36 scroll-mt-16 bg-[#0B1020]"
      aria-label="About Krish Yadav"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-[#A9A7D9] mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Profile</span>
        </div>

        {/* Editorial Layout: Asymmetrical split with generous whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F4FA] font-mono leading-tight will-change-transform"
            >
              An engineer's perspective, grounded in code and computation.
            </h2>

            <div
              ref={textRef}
              className="space-y-4 text-base sm:text-lg text-[#B9C9DE] font-normal leading-relaxed pt-2 will-change-transform"
            >
              <p>
                I'm Krish Yadav, a Computer Science Engineering student specialising in AI and Machine Learning at UPES Dehradun.
              </p>
              <p>
                My technical focus centres on understanding how models extract patterns from images, process sequential data, and interact reliably across networked systems.
              </p>
              <p className="text-[#66758F] text-sm sm:text-base">
                I spend most of my time implementing architectures directly from code, examining where pipelines break, and building software with care.
              </p>
            </div>

            {/* Academic Credential Card */}
            <div ref={cardRef} className="pt-6 will-change-transform">
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-5 rounded-xl bg-[#171D36]/50 border border-[#B9C9DE]/15 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#0B1020] border border-[#B9C9DE]/15 text-[#A9A7D9]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-[#66758F] uppercase tracking-wider">Education</span>
                    <span className="text-sm font-semibold text-[#F1F4FA]">B.Tech CSE (AI & ML)</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-[#B9C9DE]/10 hidden sm:block" />

                <div>
                  <span className="block text-xs font-mono text-[#66758F] uppercase tracking-wider">Institution</span>
                  <span className="text-sm font-medium text-[#B9C9DE]">{PERSONAL_INFO.education.institution}</span>
                </div>

                <div className="h-8 w-px bg-[#B9C9DE]/10 hidden sm:block" />

                <div>
                  <span className="block text-xs font-mono text-[#66758F] uppercase tracking-wider">CGPA</span>
                  <span className="text-sm font-mono font-bold text-[#F1F4FA]">{PERSONAL_INFO.education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Atmospheric Anime Scenery Frame with Parallax */}
          <div className="lg:col-span-5">
            <div
              ref={imgContainerRef}
              className="relative rounded-2xl overflow-hidden border border-[#B9C9DE]/15 bg-[#171D36] shadow-2xl group"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <img
                  ref={imgRef}
                  src="/assets/about-bg.jpg"
                  alt="Atmospheric twilight lane in painterly anime style under a cool midnight sky"
                  className="w-full h-full object-cover object-center will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-[#0B1020]/20 to-transparent pointer-events-none" />

                {/* Subtle caption */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="text-[11px] font-mono text-[#A9A7D9] tracking-widest uppercase block mb-1">
                    Environment
                  </span>
                  <p className="text-xs text-[#B9C9DE] font-medium leading-snug">
                    Tranquil twilight, quiet study, and systematic exploration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
