import socialLinks from '@/config/social.json'
import siteConfig from '@/config/site.json'

type SocialLink = { platform: string; url: string; label: string }

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 px-6 md:px-8 lg:px-12 py-12 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row md:justify-between md:items-end">
        <div className="space-y-2">
          <p className="font-mono text-cream/50 text-[11px] md:text-xs leading-relaxed max-w-sm">
            {siteConfig.footerLine}
          </p>
          <p className="font-mono text-cream/25 text-[10px] md:text-[11px]">
            {siteConfig.copyright}
          </p>
        </div>

        <nav aria-label="Social links" className="flex gap-5 md:gap-6">
          {(socialLinks as SocialLink[]).map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] md:text-xs text-gold hover:text-cream transition-colors duration-300"
              aria-label={link.label}
            >
              [{link.label.toUpperCase()}]
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
