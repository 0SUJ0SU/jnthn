'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/info', label: 'Info' },
] as const

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]

const overlayReveal = {
  hidden: { clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' },
  visible: {
    clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)',
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
  exit: {
    clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)',
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
}

const linkReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (staggerIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + staggerIndex * 0.08, duration: 0.5, ease: EASE_OUT_EXPO },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

interface NavOverlayProps {
  onClose: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement>
}

export default function NavOverlay({ onClose, menuButtonRef }: NavOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const trapFocus = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !overlayRef.current) return

      const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', trapFocus)
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => firstLinkRef.current?.focus(), 100)

    return () => {
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = ''
      clearTimeout(focusTimer)
      menuButtonRef.current?.focus()
    }
  }, [trapFocus, menuButtonRef])

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-dark"
      variants={overlayReveal}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
        {NAV_LINKS.map((link, index) => (
          <motion.div
            key={link.href}
            variants={linkReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
          >
            <Link
              href={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              className="group relative font-display text-[clamp(2.5rem,min(10vw,12vh),8rem)] uppercase leading-none tracking-tight text-cream transition-colors duration-300 hover:text-gold"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        ))}
      </nav>

      <button
        onClick={onClose}
        className="absolute right-6 top-5 border border-cream/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors duration-300 hover:border-gold hover:text-gold md:right-8 md:top-6 lg:right-12"
        aria-label="Close navigation menu"
      >
        Close
      </button>
    </motion.div>
  )
}
