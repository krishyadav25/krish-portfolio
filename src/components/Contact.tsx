import React, { useEffect, useRef } from 'react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { Mail, MessageSquare, ExternalLink, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Recognizable SVG Brand Icons in cool tones
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Content reveal on scroll
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Cinematic closing landscape parallax scrub
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
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
      id="contact"
      className="relative py-32 sm:py-40 scroll-mt-16 bg-[#0B1020] overflow-hidden"
      aria-label="Contact Krish Yadav"
    >
      {/* Cinematic Twilight Closing Scene Visual Backdrop with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 will-change-transform"
      >
        <img
          src="/assets/contact-bg.jpg"
          alt="Cinematic twilight horizon with tranquil distant hills under a deep midnight indigo sky"
          className="w-full h-full object-cover object-bottom"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/75 to-[#0B1020]" />
      </div>

      {/* Atmospheric misty lavender glow */}
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A9A7D9]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center will-change-transform"
      >
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-[#A9A7D9] mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F1F4FA] font-mono mb-6">
          Connect & Collaborate
        </h2>

        <p className="text-base sm:text-lg text-[#B9C9DE] max-w-xl mx-auto mb-12 font-normal leading-relaxed">
          Open to technical discussions regarding machine learning architectures, computer vision research, software engineering, and internship opportunities.
        </p>

        {/* Primary Action: Direct Email Contact */}
        <div className="mb-14">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#F1F4FA] text-[#0B1020] font-semibold text-base sm:text-lg tracking-wide shadow-xl hover:bg-[#B9C9DE] hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all duration-200"
            aria-label={`Send email to ${PERSONAL_INFO.email}`}
          >
            <Mail className="w-5 h-5 text-[#0B1020] group-hover:rotate-6 transition-transform duration-200" />
            <span className="font-mono">{PERSONAL_INFO.email}</span>
            <ArrowUpRight className="w-5 h-5 text-[#0B1020] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </a>
        </div>

        {/* Social Profile Cards */}
        <div className="pt-10 border-t border-[#B9C9DE]/15 max-w-2xl mx-auto">
          <span className="block text-xs font-mono uppercase tracking-widest text-[#66758F] mb-6">
            Verified Profiles & Repositories
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* GitHub */}
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#171D36]/80 border border-[#B9C9DE]/15 hover:border-[#A9A7D9]/60 hover:bg-[#1E2644] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all flex items-center justify-between"
              aria-label="Visit Krish Yadav's GitHub profile"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#0B1020] text-[#B9C9DE] group-hover:text-[#F1F4FA] transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#F1F4FA] group-hover:text-white">GitHub</span>
                  <span className="block text-[11px] text-[#66758F] font-mono">@krishyadav25</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#66758F] group-hover:text-[#A9A7D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#171D36]/80 border border-[#B9C9DE]/15 hover:border-[#A9A7D9]/60 hover:bg-[#1E2644] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all flex items-center justify-between"
              aria-label="Visit Krish Yadav's LinkedIn profile"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#0B1020] text-[#B9C9DE] group-hover:text-[#F1F4FA] transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#F1F4FA] group-hover:text-white">LinkedIn</span>
                  <span className="block text-[11px] text-[#66758F] font-mono">krish-yadav-cse</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#66758F] group-hover:text-[#A9A7D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>

            {/* Instagram */}
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#171D36]/80 border border-[#B9C9DE]/15 hover:border-[#A9A7D9]/60 hover:bg-[#1E2644] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-all flex items-center justify-between"
              aria-label="Visit Krish Yadav's Instagram profile"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#0B1020] text-[#B9C9DE] group-hover:text-[#F1F4FA] transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#F1F4FA] group-hover:text-white">Instagram</span>
                  <span className="block text-[11px] text-[#66758F] font-mono">@krish_25k</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#66758F] group-hover:text-[#A9A7D9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
