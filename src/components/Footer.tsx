import React from 'react'
import { PERSONAL_INFO } from '../data/portfolioData'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#B9C9DE]/15 bg-[#070B16] py-12 text-[#66758F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Identity & Wordmark */}
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-[#171D36] border border-[#A9A7D9]/30 text-[#F1F4FA] font-bold font-mono text-[10px] flex items-center justify-center">
                {PERSONAL_INFO.wordmark}
              </span>
              <span className="font-semibold text-[#F1F4FA] text-xs uppercase tracking-wider font-mono">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#66758F]">
              Designed and built with care. An intentional cinematic journey.
            </p>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col sm:items-end gap-2 text-xs">
            <div className="flex items-center justify-center sm:justify-end gap-5 text-[#B9C9DE]">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <span className="text-[#66758F]/40" aria-hidden="true">•</span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
              <span className="text-[#66758F]/40" aria-hidden="true">•</span>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
                aria-label="Instagram Profile"
              >
                Instagram
              </a>
            </div>
            <span className="text-[#66758F] font-mono text-[11px]">
              © {currentYear} {PERSONAL_INFO.name}. All project architectures verified from repository code.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
