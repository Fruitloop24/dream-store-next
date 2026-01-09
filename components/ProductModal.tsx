'use client'

import { getAccentClasses, getThemeClasses } from '@/lib/config'
import { useStore } from '@/lib/store-context'

export default function ProductModal() {
  const theme = getThemeClasses()
  const accent = getAccentClasses()
  const { selectedProduct, setSelectedProduct, addToCart } = useStore()

  if (!selectedProduct) return null

  return (
    <>
      <div
        className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-[60]`}
        onClick={() => setSelectedProduct(null)}
      />
      <div className={`fixed inset-4 md:inset-10 lg:inset-20 ${theme.modalBg} rounded-lg z-[60] overflow-hidden flex flex-col md:flex-row`}>
        <div className={`md:w-1/2 ${theme.imagePlaceholder} flex items-center justify-center p-8`}>
          {selectedProduct.imageUrl ? (
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <svg className={`w-32 h-32 ${theme.muted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
        </div>

        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <button
            onClick={() => setSelectedProduct(null)}
            className={`absolute top-4 right-4 ${theme.muted} ${theme.link} transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className={`text-2xl font-medium ${theme.heading} mb-2`}>
            {selectedProduct.displayName || selectedProduct.name}
          </h2>

          <div className={`text-3xl font-light ${theme.price} mb-6`}>
            ${(selectedProduct.price / 100).toFixed(2)}
          </div>

          {selectedProduct.description && (
            <p className={`${theme.body} mb-6 leading-relaxed`}>
              {selectedProduct.description}
            </p>
          )}

          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-xs font-medium ${theme.muted} uppercase tracking-wider mb-3`}>
                Features
              </h3>
              <ul className="space-y-2">
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 ${theme.body} text-sm`}>
                    <span className={`w-1 h-1 ${theme.featureDot} rounded-full`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedProduct.inventory !== null && selectedProduct.inventory !== undefined && (
            <p className={`${theme.stockText} text-sm mb-6`}>
              {selectedProduct.inventory > 0 ? `${selectedProduct.inventory} available` : 'Out of stock'}
            </p>
          )}

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => {
                addToCart(selectedProduct)
                setSelectedProduct(null)
              }}
              disabled={selectedProduct.soldOut}
              className={`flex-1 py-3 rounded font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
            >
              {selectedProduct.soldOut ? 'Sold Out' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className={`px-6 py-3 rounded font-medium ${theme.buttonSecondary} transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
