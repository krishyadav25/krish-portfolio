import React, { useEffect, useRef } from 'react'
import { EXPERIENCE_DATA } from '../data/portfolioData'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Timeline items staggered slide-in
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
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
      id="experience"
      className="relative py-28 sm:py-36 scroll-mt-16 bg-[#0B1020]"
      aria-label="Professional Experience"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-[#A9A7D9] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F4FA] font-mono mb-4">
            Internship Experience
          </h2>
          <p className="text-base sm:text-lg text-[#B9C9DE] font-normal leading-relaxed">
            Practical technical experience applying machine learning pipelines, volumetric preprocessing, and analytical data handling.
          </p>
          <div className="w-12 h-1 bg-[#A9A7D9]/40 rounded-full mt-4" />
        </div>

        {/* Clean Editorial Timeline */}
        <div
          ref={timelineRef}
          className="relative border-l border-[#B9C9DE]/15 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12 will-change-transform"
        >
          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0B1020] border-2 border-[#A9A7D9] group-hover:scale-125 group-hover:border-[#B9C9DE] transition-all duration-200"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#A9A7D9] m-auto mt-0.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#171D36]/60 border border-[#B9C9DE]/15 shadow-md hover:border-[#B9C9DE]/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#F1F4FA] tracking-tight font-mono">
                      {item.role}
                    </h3>
                    <span className="text-sm font-semibold text-[#A9A7D9]">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#66758F]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1020] border border-[#B9C9DE]/15 text-[#B9C9DE]">
                      <Calendar className="w-3 h-3 text-[#A9A7D9]" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B1020]/50 text-[#66758F]">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#B9C9DE] font-normal leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Responsibilities */}
                <ul className="space-y-2 pt-2 border-t border-[#B9C9DE]/15" aria-label="Key responsibilities">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F1F4FA] font-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#A9A7D9] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
