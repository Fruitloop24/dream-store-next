'use client'

import { getAccentClasses, getThemeClasses } from '@/lib/config'
import { useStore } from '@/lib/store-context'

export default function CartDrawer() {
  const theme = getThemeClasses()
  const accent = getAccentClasses()
  const {
    cart,
    cartOpen,
    cartCount,
    cartTotal,
    checkingOut,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    handleCheckout,
  } = useStore()

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-50`}
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md ${theme.drawerBg} z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className={`flex justify-between items-center p-6 border-b ${theme.divider}`}>
            <h2 className={`text-lg font-medium ${theme.heading}`}>
              Cart {cartCount > 0 && <span className={`${theme.muted} font-normal`}>({cartCount})</span>}
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className={`${theme.muted} ${theme.link} transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className={`${theme.muted} mb-4`}>Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className={`${theme.link} text-sm transition-colors`}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.priceId}
                    className={`flex gap-4 p-4 ${theme.cartItemBg} rounded`}
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    ) : (
                      <div className={`w-16 h-16 rounded ${theme.imagePlaceholder} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className={`${theme.heading} font-medium text-sm truncate`}>
                        {item.displayName || item.name}
                      </h4>
                      <p className={`${theme.muted} text-sm`}>${(item.price / 100).toFixed(2)}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.priceId, -1)}
                          className={`w-6 h-6 rounded ${theme.quantityButton} flex items-center justify-center text-sm transition-colors`}
                        >
                          -
                        </button>
                        <span className={`${theme.heading} text-sm w-4 text-center`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.priceId, 1)}
                          className={`w-6 h-6 rounded ${theme.quantityButton} flex items-center justify-center text-sm transition-colors`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.priceId)}
                          className="ml-auto text-red-500 hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className={`${theme.heading} font-medium text-sm`}>
                      ${(item.price * item.quantity / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className={`p-6 border-t ${theme.divider}`}>
              <div className="flex justify-between items-center mb-4">
                <span className={theme.muted}>Subtotal</span>
                <span className={`text-xl font-medium ${theme.heading}`}>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className={`w-full py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
              >
                {checkingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Checkout'
                )}
              </button>
              <p className={`text-center ${theme.muted} text-xs mt-3`}>
                Secure checkout via Stripe
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
