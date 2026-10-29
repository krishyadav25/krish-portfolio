import React, { useEffect, useRef } from 'react'
import { PROJECTS_DATA } from '../data/portfolioData'
import { ProjectCard } from './ProjectCard'
import { FolderGit2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const featuredProject = PROJECTS_DATA.find((p) => p.featured)
  const otherProjects = PROJECTS_DATA.filter((p) => !p.featured)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
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

      // Featured project card reveal
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Subsequent projects staggered reveal
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
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
      id="projects"
      className="relative py-28 sm:py-36 scroll-mt-16 bg-[#0B1020]"
      aria-label="Selected Engineering Projects"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-[#A9A7D9] mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F4FA] font-mono mb-4">
            Engineering & Neural Architectures
          </h2>
          <p className="text-base sm:text-lg text-[#B9C9DE] font-normal leading-relaxed">
            Technical systems spanning image-based forensic analysis, 3D volumetric medical segmentation, deterministic robotic teleoperation protocols, and multimodal vision-language generation.
          </p>
          <div className="w-12 h-1 bg-[#A9A7D9]/40 rounded-full mt-4" />
        </div>

        {/* Art-Directed Gallery Showcase */}
        <div className="space-y-10">
          {/* Prominent Featured Project (Deepfake Detection) */}
          {featuredProject && (
            <div ref={featuredRef} className="will-change-transform">
              <ProjectCard project={featuredProject} />
            </div>
          )}

          {/* Other Engineering Projects */}
          <div ref={listRef} className="grid grid-cols-1 gap-8 will-change-transform">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
