'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from './api'

export interface Product {
  name: string
  displayName?: string
  description?: string
  price: number
  priceId: string
  productId: string
  imageUrl?: string
  inventory?: number | null
  soldOut?: boolean
  features?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

interface StoreContextType {
  products: Product[]
  loading: boolean
  error: string | null
  cart: CartItem[]
  cartOpen: boolean
  selectedProduct: Product | null
  cartCount: number
  cartTotal: number
  checkingOut: boolean
  setCartOpen: (open: boolean) => void
  setSelectedProduct: (product: Product | null) => void
  addToCart: (product: Product) => void
  removeFromCart: (priceId: string) => void
  updateQuantity: (priceId: string, delta: number) => void
  handleCheckout: () => Promise<void>
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkingOut, setCheckingOut] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setCart([])
      alert('Payment successful! Thank you for your order.')
      window.history.replaceState({}, '', window.location.pathname)
    }
    if (params.get('canceled') === 'true') {
      alert('Payment was canceled.')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      const response = await api.products.list()
      setProducts(response.products || [])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load products'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.priceId === product.priceId)
      if (existing) {
        return prev.map(item =>
          item.priceId === product.priceId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function removeFromCart(priceId: string) {
    setCart(prev => prev.filter(item => item.priceId !== priceId))
  }

  function updateQuantity(priceId: string, delta: number) {
    setCart(prev =>
      prev
        .map(item =>
          item.priceId === priceId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  async function handleCheckout() {
    if (cart.length === 0) return

    setCheckingOut(true)
    try {
      const items = cart.map(item => ({
        priceId: item.priceId,
        quantity: item.quantity,
      }))

      const result = await api.products.cartCheckout({
        items,
        successUrl: window.location.origin + '?success=true',
        cancelUrl: window.location.origin + '?canceled=true',
      })

      if (result.url) {
        window.location.href = result.url
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      alert('Checkout failed: ' + message)
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        loading,
        error,
        cart,
        cartOpen,
        selectedProduct,
        cartCount,
        cartTotal,
        checkingOut,
        setCartOpen,
        setSelectedProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        handleCheckout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
