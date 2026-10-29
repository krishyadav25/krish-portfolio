import React, { useState, useRef, useEffect } from 'react'
import { ProjectItem } from '../data/portfolioData'
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GitBranch,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
} from 'lucide-react'

// GitHub SVG Icon in cool tones
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

interface ProjectCardProps {
  project: ProjectItem
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 })
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef<HTMLElement>(null)
  const detailsId = `project-details-${project.id}`

  // Desktop restrained 3D pointer perspective & inner image parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Card tilt: max 2.2 deg
    const rotateX = -((y - centerY) / centerY) * 2.0
    const rotateY = ((x - centerX) / centerX) * 2.0
    setTilt({ x: rotateX, y: rotateY })

    // Inner image parallax (moves slightly counter to mouse for depth)
    setImgOffset({
      x: -((x - centerX) / centerX) * 6,
      y: -((y - centerY) / centerY) * 6,
    })

    // Radial gradient glow position
    setMouseGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setImgOffset({ x: 0, y: 0 })
    setMouseGlow((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={`group relative rounded-2xl bg-[#171D36]/60 border overflow-hidden shadow-xl ${
        project.featured
          ? 'border-[#A9A7D9]/40 shadow-[#A9A7D9]/5 hover:border-[#B9C9DE]/70'
          : 'border-[#B9C9DE]/12 hover:border-[#B9C9DE]/40'
      }`}
    >
      {/* Subtle radial pointer glow following mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 350px at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(185, 201, 222, 0.08), transparent 70%)`,
          opacity: mouseGlow.opacity,
        }}
        aria-hidden="true"
      />

      {/* Featured Project Label */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#171D36]/90 text-[#F1F4FA] border border-[#A9A7D9]/40 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A9A7D9] animate-pulse" />
            Featured Project
          </span>
        </div>
      )}

      {/* Main Card Grid: Visual + Summary */}
      <div className={`grid grid-cols-1 ${project.featured ? 'lg:grid-cols-12' : 'md:grid-cols-12'} gap-6 p-6 sm:p-8 relative z-10`}>
        {/* Project Visual with Depth Parallax */}
        <div className={`${project.featured ? 'lg:col-span-5' : 'md:col-span-5'} flex flex-col justify-between`}>
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0B1020] border border-[#B9C9DE]/15">
            <img
              src={project.image}
              alt={project.imageAlt}
              style={{
                transform: `scale(1.06) translate3d(${imgOffset.x}px, ${imgOffset.y}px, 0)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="w-full h-full object-cover object-center will-change-transform"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Quick Action Links with Micro-Interactions */}
          <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0B1020]/80 text-xs font-medium text-[#F1F4FA] border border-[#B9C9DE]/20 hover:bg-[#1E2644] hover:border-[#B9C9DE]/50 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200"
              aria-label={`View ${project.title} repository on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#B9C9DE] group-hover/link:scale-110 transition-transform duration-200" />
              <span>Repository</span>
              <ExternalLink className="w-3 h-3 text-[#66758F] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
            </a>

            {project.secondaryUrl && (
              <a
                href={project.secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/branch inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1020]/40 text-xs font-medium text-[#B9C9DE] border border-[#B9C9DE]/15 hover:bg-[#1E2644] hover:text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200"
                aria-label={`View ${project.secondaryUrlLabel || 'secondary link'} on GitHub`}
              >
                <GitBranch className="w-3.5 h-3.5 text-[#A9A7D9] group-hover/branch:rotate-12 transition-transform duration-200" />
                <span>{project.secondaryUrlLabel || 'Branch'}</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#20294A] text-xs font-medium text-[#F1F4FA] border border-[#A9A7D9]/30 hover:bg-[#2A3764] hover:border-[#B9C9DE]/60 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200"
                aria-label={`Open ${project.title} demo web interface`}
              >
                <Activity className="w-3.5 h-3.5 text-[#B9C9DE] group-hover/demo:animate-pulse" />
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 text-[#A9A7D9] group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
          </div>
        </div>

        {/* Project Meta & Description */}
        <div className={`${project.featured ? 'lg:col-span-7' : 'md:col-span-7'} flex flex-col justify-between`}>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F4FA] mb-1 font-mono">
              {project.title}
            </h3>

            <p className="text-xs font-mono text-[#A9A7D9] tracking-wider uppercase mb-3">
              {project.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#B9C9DE] leading-relaxed mb-4 font-normal">
              {project.shortDescription}
            </p>

            {/* Reported Experimental Metrics Highlights */}
            {project.details.reportedResults.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-[#0B1020]/60 border border-[#B9C9DE]/15">
                {project.details.reportedResults.map((res) => (
                  <div key={res.label} className="text-left">
                    <span className="block text-[11px] font-mono text-[#66758F] leading-tight mb-0.5">
                      {res.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#F1F4FA] font-mono">
                      {res.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#0B1020]/70 text-[#B9C9DE] border border-[#B9C9DE]/15 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Inline Expandable Details Button */}
          <div className="pt-3 border-t border-[#B9C9DE]/15 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1020] text-xs sm:text-sm font-medium text-[#F1F4FA] border border-[#B9C9DE]/20 hover:bg-[#1E2644] hover:border-[#B9C9DE]/50 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200"
            >
              <span>{isExpanded ? 'Hide project details' : 'View project details'}</span>
              <span
                className="transition-transform duration-300 ease-out"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ChevronDown className="w-4 h-4 text-[#A9A7D9]" />
              </span>
            </button>

            <span className="text-xs text-[#66758F] font-mono">
              {isExpanded ? 'Full technical breakdown' : 'Click to inspect architecture'}
            </span>
          </div>
        </div>
      </div>

      {/* Fluid Accordion Grid Container: Animates height smoothly via CSS grid-template-rows */}
      <div
        id={detailsId}
        className={`accordion-grid ${isExpanded ? 'is-expanded' : ''}`}
      >
        <div className="accordion-grid-inner border-t border-[#B9C9DE]/15 bg-[#0B1020]/80">
          <div className="px-6 pb-8 pt-5 sm:px-8 space-y-6 text-[#B9C9DE]">
            {/* Overview & Problem Addressed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9A7D9] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Project Overview
                </h4>
                <p className="text-sm leading-relaxed text-[#B9C9DE] font-normal">
                  {project.details.overview}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9A7D9] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  Problem Addressed
                </h4>
                <p className="text-sm leading-relaxed text-[#B9C9DE] font-normal">
                  {project.details.problem}
                </p>
              </div>
            </div>

            {/* Technical Approach */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9A7D9] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Technical Approach
              </h4>
              <p className="text-sm leading-relaxed text-[#B9C9DE] font-normal">
                {project.details.technicalApproach}
              </p>
            </div>

            {/* Key Implementation Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9A7D9]">
                Key Implementation Details
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#F1F4FA]">
                {project.details.keyImplementation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A9A7D9] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Reported Results Table */}
            <div className="space-y-2 pt-2 border-t border-[#B9C9DE]/15">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A9A7D9] flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                Reported Experimental Results
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.details.reportedResults.map((result) => (
                  <div
                    key={result.label}
                    className="p-3 rounded-lg bg-[#171D36]/80 border border-[#B9C9DE]/15"
                  >
                    <span className="block text-xs font-mono text-[#66758F]">{result.label}</span>
                    <span className="text-base font-bold text-[#F1F4FA] font-mono">{result.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#66758F] font-normal italic pt-1">
                * {project.details.resultsDisclaimer}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#B9C9DE]/15">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A9A7D9] hover:text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Hide project details</span>
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/repo inline-flex items-center gap-1.5 text-xs text-[#B9C9DE] hover:text-[#F1F4FA] transition-colors"
              >
                <span>Explore full repository</span>
                <ExternalLink className="w-3 h-3 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
