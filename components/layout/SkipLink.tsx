'use client'

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed left-4 top-4 z-[70] rounded bg-gold px-4 py-2 font-mono text-sm text-dark focus:fixed"
    >
      Skip to main content
    </a>
  )
}
