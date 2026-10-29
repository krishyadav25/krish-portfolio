import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function initSmoothScroll(): () => void {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return () => {}
  }

  // Create Lenis instance
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
  })

  // Connect Lenis to ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  const tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000)
  }

  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // Return cleanup function
  return () => {
    gsap.ticker.remove(tickerCallback)
    lenisInstance?.destroy()
    lenisInstance = null
    ScrollTrigger.getAll().forEach((st) => st.kill())
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

