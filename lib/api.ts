import { DreamAPI } from '@dream-api/sdk'

// Lazy initialization to avoid build-time errors
let _api: DreamAPI | null = null

export function getApi(): DreamAPI {
  if (!_api) {
    const key = process.env.NEXT_PUBLIC_DREAM_PUBLISHABLE_KEY
    if (!key) {
      throw new Error('NEXT_PUBLIC_DREAM_PUBLISHABLE_KEY is required. Copy .env.example to .env.local and add your key.')
    }
    _api = new DreamAPI({ publishableKey: key })
  }
  return _api
}

// For backwards compatibility
export const api = {
  products: {
    list: () => getApi().products.list(),
    cartCheckout: (params: Parameters<DreamAPI['products']['cartCheckout']>[0]) =>
      getApi().products.cartCheckout(params),
  },
}
