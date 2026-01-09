'use client'

import Link from 'next/link'
import { CONFIG, getThemeClasses } from '@/lib/config'

export default function Footer() {
  const { storeName, footer } = CONFIG
  const theme = getThemeClasses()

  return (
    <footer className={`${theme.footerBg} mt-auto`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className={`text-lg font-medium ${theme.heading} mb-3`}>{storeName}</h3>
            <p className={`${theme.body} text-sm leading-relaxed max-w-sm`}>
              {footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className={`text-xs font-medium ${theme.muted} uppercase tracking-wider mb-4`}>Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/" className={`${theme.link} text-sm transition-colors`}>All Products</Link></li>
              <li><Link href="/about" className={`${theme.link} text-sm transition-colors`}>About</Link></li>
              <li><Link href="/contact" className={`${theme.link} text-sm transition-colors`}>Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-xs font-medium ${theme.muted} uppercase tracking-wider mb-4`}>Support</h4>
            <ul className="space-y-2">
              {footer.links.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className={`${theme.link} text-sm transition-colors`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={`border-t ${theme.divider} mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`${theme.muted} text-xs`}>
            &copy; {new Date().getFullYear()} {storeName}
          </p>
          <p className={`${theme.muted} text-xs opacity-60`}>
            Powered by dream-api
          </p>
        </div>
      </div>
    </footer>
  )
}
