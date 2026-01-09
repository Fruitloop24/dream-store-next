'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONFIG, getAccentClasses, getThemeClasses } from '@/lib/config'
import { useStore } from '@/lib/store-context'

const NAV_LINKS = [
  { path: '/', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const { storeName } = CONFIG
  const theme = getThemeClasses()
  const accent = getAccentClasses()
  const { cartCount, cartTotal, setCartOpen } = useStore()

  return (
    <header className={`${theme.headerBg} sticky top-0 z-40`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className={`text-xl font-medium ${theme.heading} transition-colors`}>
            {storeName}
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm transition-colors ${
                    isActive ? theme.heading : theme.link
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className={`flex items-center gap-3 ${theme.link} transition-colors`}
          >
            <span className="text-sm">${cartTotal.toFixed(2)}</span>
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 ${accent.bg} ${accent.buttonText} text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium`}>
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden gap-6 pb-3 -mt-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition-colors ${
                  isActive ? theme.heading : theme.link
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
