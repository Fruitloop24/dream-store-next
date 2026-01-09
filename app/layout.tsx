import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getThemeClasses } from '@/lib/config'
import { StoreProvider } from '@/lib/store-context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ProductModal from '@/components/ProductModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dream Store',
  description: 'Digital goods and premium picks, checkout in seconds.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = getThemeClasses()

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className={`min-h-screen ${theme.pageBg} flex flex-col`}>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <ProductModal />
        </StoreProvider>
      </body>
    </html>
  )
}
