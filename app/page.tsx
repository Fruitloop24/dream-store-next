'use client'

import { CONFIG, getAccentClasses, getThemeClasses } from '@/lib/config'
import { useStore } from '@/lib/store-context'

export default function HomePage() {
  const { tagline, description } = CONFIG
  const theme = getThemeClasses()
  const accent = getAccentClasses()
  const { products, loading, error, addToCart, setSelectedProduct } = useStore()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-20">
        <h2 className={`text-4xl md:text-5xl font-light ${theme.heading} mb-4 tracking-tight`}>
          {tagline}
        </h2>
        <p className={`text-lg ${theme.body} max-w-xl mx-auto`}>
          {description}
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className={`w-8 h-8 border-2 ${theme.divider} border-t-current rounded-full animate-spin ${theme.body}`}></div>
        </div>
      )}

      {error && (
        <div className="bg-red-950/50 border border-red-900 text-red-400 px-6 py-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.priceId}
              className={`group ${theme.cardBg} rounded-lg overflow-hidden ${theme.cardHover} transition-colors`}
            >
              {/* Product Image */}
              <div className={`aspect-square ${theme.imagePlaceholder} relative overflow-hidden`}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${theme.imagePlaceholder}`}>
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
                {product.soldOut && (
                  <div className={`absolute inset-0 ${theme.soldOutOverlay} flex items-center justify-center`}>
                    <span className={`${theme.soldOutText} text-sm font-medium tracking-wide uppercase`}>
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className={`text-lg font-medium ${theme.heading} mb-1`}>
                  {product.displayName || product.name}
                </h3>
                {product.description && (
                  <p className={`${theme.muted} text-sm mb-4 line-clamp-2`}>
                    {product.description}
                  </p>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-2xl font-light ${theme.price}`}>
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  {product.inventory !== null && product.inventory !== undefined && (
                    <span className={`text-xs ${theme.stockText}`}>
                      {product.inventory} in stock
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className={`flex-1 py-2.5 text-sm font-medium rounded ${theme.buttonSecondary} transition-colors`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.soldOut}
                    className={`flex-1 py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
                  >
                    {product.soldOut ? 'Unavailable' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20">
          <p className={theme.muted}>No products available yet.</p>
        </div>
      )}
    </div>
  )
}
