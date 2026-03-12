'use client'

import { useState, useEffect, useRef } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      const difference = currentScrollY - lastScrollY.current

      if (Math.abs(difference) < threshold) return

      const direction = difference > 0 ? 'down' : 'up'
      setScrollDirection(direction)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [threshold])

  return scrollDirection
}
