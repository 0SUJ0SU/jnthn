'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import NavOverlay from './NavOverlay'

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]

const navBarSlide = {
  visible: { y: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
  hidden: { y: '-100%', transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
}

export default function Nav() {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null!)
  const scrollDirection = useScrollDirection()

  const navIsVisible = scrollDirection === 'up' || overlayIsOpen

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-8 md:py-6 lg:px-12"
        variants={navBarSlide}
        initial="visible"
        animate={navIsVisible ? 'visible' : 'hidden'}
      >
        <Link
          href="/"
          className="font-display text-2xl uppercase tracking-tight text-gold transition-opacity duration-300 hover:opacity-70"
          aria-label="JNTHN — Home"
        >
          JNTHN
        </Link>

        <button
          ref={menuButtonRef}
          onClick={() => setOverlayIsOpen(true)}
          className="border border-cream/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          aria-expanded={overlayIsOpen}
          aria-controls="nav-overlay"
        >
          Menu
        </button>
      </motion.header>

      <AnimatePresence>
        {overlayIsOpen && (
          <NavOverlay
            onClose={() => setOverlayIsOpen(false)}
            menuButtonRef={menuButtonRef}
          />
        )}
      </AnimatePresence>
    </>
  )
}
