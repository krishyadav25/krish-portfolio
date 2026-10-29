import React, { useState, useEffect } from 'react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { Menu, X } from 'lucide-react'

interface NavItem {
  name: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section observer for accurate, smooth active link indication
  useEffect(() => {
    const sectionIds = ['about', 'projects', 'experience', 'skills', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-20% 0px -60% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1020]/80 backdrop-blur-md border-b border-[#B9C9DE]/10 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Personal wordmark with smooth micro-interaction */}
          <a
            href="#"
            className="group flex items-center gap-3 rounded-lg px-2 py-1 text-[#F1F4FA] focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
            aria-label={`${PERSONAL_INFO.name} Home`}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#171D36] border border-[#A9A7D9]/30 text-[#F1F4FA] font-bold font-mono text-xs tracking-wider group-hover:scale-105 group-hover:border-[#B9C9DE]/70 transition-all duration-200">
              {PERSONAL_INFO.wordmark}
            </span>
            <span className="font-semibold text-sm tracking-wider text-[#F1F4FA] uppercase font-mono group-hover:text-white transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Navigation Links (Pill Container with active indicator) */}
          <div className="hidden md:flex items-center gap-1 bg-[#171D36]/60 border border-[#B9C9DE]/15 px-2 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#20294A] text-[#F1F4FA] border border-[#A9A7D9]/40 shadow-sm'
                      : 'text-[#B9C9DE] hover:text-[#F1F4FA] hover:bg-[#171D36]/80'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#B9C9DE] hover:text-[#F1F4FA] hover:bg-[#171D36] border border-[#B9C9DE]/15 focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 rotate-90 transition-transform duration-200" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>
        </nav>
      </div>

      {/* Accessible Mobile Drawer with smooth slide-down */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[62px] bg-[#0B1020]/95 backdrop-blur-xl border-b border-[#B9C9DE]/15 px-6 shadow-2xl transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-96 py-6 opacity-100'
            : 'max-h-0 py-0 opacity-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-[#B9C9DE] focus-visible:outline-none ${
                  isActive
                    ? 'bg-[#171D36] text-[#F1F4FA] border border-[#A9A7D9]/40 font-semibold'
                    : 'text-[#B9C9DE] hover:text-[#F1F4FA] hover:bg-[#171D36]/60'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  )
}
