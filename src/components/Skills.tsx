import React, { useEffect, useRef } from 'react'
import { SKILL_CATEGORIES } from '../data/portfolioData'
import { Terminal, Globe, BrainCircuit, Database } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Programming: <Terminal className="w-4 h-4 text-[#A9A7D9]" />,
  'Web Development': <Globe className="w-4 h-4 text-[#A9A7D9]" />,
  'AI, Machine Learning and Computer Vision': <BrainCircuit className="w-4 h-4 text-[#A9A7D9]" />,
  'Data and Tools': <Database className="w-4 h-4 text-[#A9A7D9]" />,
}

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      // Skill categories entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="skills"
      className="relative py-28 sm:py-36 scroll-mt-16 bg-[#0B1020]"
      aria-label="Technical Skills"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-[#A9A7D9] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F4FA] font-mono mb-4">
            Skills & Frameworks
          </h2>
          <p className="text-base sm:text-lg text-[#B9C9DE] font-normal leading-relaxed">
            Core languages, machine learning frameworks, computer vision libraries, and software engineering tools utilized across implementations.
          </p>
          <div className="w-12 h-1 bg-[#A9A7D9]/40 rounded-full mt-4" />
        </div>

        {/* Grouped Skills Matrix */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 will-change-transform">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.category}
              className="p-6 sm:p-7 rounded-2xl bg-[#171D36]/60 border border-[#B9C9DE]/15 shadow-md hover:border-[#B9C9DE]/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[#0B1020] border border-[#B9C9DE]/15">
                  {CATEGORY_ICONS[cat.category] || <Terminal className="w-4 h-4 text-[#A9A7D9]" />}
                </div>
                <h3 className="text-base font-bold text-[#F1F4FA] tracking-tight font-mono">
                  {cat.category}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#B9C9DE]/15">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#0B1020]/90 text-xs sm:text-sm font-mono text-[#F1F4FA] border border-[#B9C9DE]/20 hover:border-[#A9A7D9]/60 hover:text-[#A9A7D9] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
