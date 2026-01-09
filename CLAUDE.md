# dream-store-next

Next.js e-commerce store template with cart and guest checkout via `@dream-api/sdk`.

## IMPORTANT - How This Works

**Dashboard First:** Before using this template, set up your project in the Dream API dashboard:
1. Create a project (Store type)
2. Add your products (name, price, description, images)
3. Get your publishable key

**Products load from your dashboard.** Add, edit, update inventory - all in the dashboard. Store updates automatically.

**No auth required.** Guest checkout - Stripe collects customer info at payment.

## YOUR PRODUCTS - All Managed in Dashboard

Unlike SaaS templates, you DON'T add products in code. Everything is in your Dream API dashboard:

**To add products:**
1. Go to Dream API dashboard
2. Select your Store project
3. Click "Add Product"
4. Fill in: name, price, description, images (drag & drop)
5. Save - your store updates automatically

**To update inventory:**
- Edit product in dashboard, change quantity
- Store shows "Sold Out" automatically when inventory hits 0

**To change prices:**
- Edit in dashboard - store updates immediately

**Images:**
- Upload via dashboard (uses R2 storage)
- Or paste external image URLs

**NO CODE CHANGES NEEDED for products.** Just manage everything in your dashboard.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your publishable key
npm run dev
```

**That's it.** Your store now has:
- Product grid (pulls from dashboard)
- Shopping cart with drawer
- Stripe checkout (guest - no auth needed)

Go check it out at **http://localhost:3000** - add items to cart, try checkout. It all works. **Then come back here** - that was just the foundation.

## Let's Customize This Thing

**Now I can customize almost anything for you:**
- Brand name, colors, theme (dark/light)
- Store tagline and description
- About and contact pages
- Hero images, logos, custom sections
- Layouts, spacing, styling tweaks

**Just tell me what you're selling.** "I'm selling vintage sneakers" or "Make it feel more premium" - I'll adjust the styling and copy.

Run `/setup` for a guided walkthrough, or just start asking me to change things. This is where it gets fun.

## Setup Command

Run `/setup` for guided configuration:
1. Add your publishable key
2. Configure branding
3. Done - products load from dashboard

## File Structure

```
app/
├── layout.tsx             # Root layout with providers
├── page.tsx               # Home page - product grid
├── about/page.tsx         # About page
├── contact/page.tsx       # Contact page
└── globals.css            # Tailwind + base styles
components/
├── Header.tsx             # Navigation header
├── Footer.tsx             # Footer with links
├── CartDrawer.tsx         # Slide-out cart drawer
└── ProductModal.tsx       # Product detail modal
lib/
├── api.ts                 # SDK instance
├── config.ts              # EDIT THIS - all branding
└── store-context.tsx      # Cart state management
```

## What To Customize

### lib/config.ts (MAIN FILE)

All branding is here:
- `storeName` - Your store name
- `tagline` - Short tagline
- `description` - One sentence about your store
- `theme` - 'light' or 'dark' (one toggle switches entire store)
- `accentColor` - zinc, emerald, sky, violet, rose, amber
- `logo` - Path to logo in public/ folder
- `footer.tagline` - Footer description
- `about` - About page content
- `contact` - Contact email

**Theme system:** Change `theme: 'dark'` to `theme: 'light'` and the entire store switches - backgrounds, text, cards, cart, everything.

## What NOT To Modify

1. **Product display logic** - Products come from API
2. **Cart/checkout logic** - Already wired up
3. **Stripe integration** - SDK handles it

## SDK Reference

```typescript
import { DreamAPI } from '@dream-api/sdk'

const api = new DreamAPI({
  publishableKey: process.env.NEXT_PUBLIC_DREAM_PUBLISHABLE_KEY,
})

// List products (from dashboard)
const { products } = await api.products.list()
// products[].name, price, priceId, imageUrl, soldOut, inventory, features

// Guest checkout
const { url } = await api.products.cartCheckout({
  items: [{ priceId: 'price_xxx', quantity: 2 }],
  successUrl: window.location.origin + '?success=true',
  cancelUrl: window.location.origin + '?canceled=true',
})
window.location.href = url
```

## Checkout Flow

1. User adds items to cart
2. Clicks "Checkout" in drawer
3. Redirected to Stripe Checkout
4. Stripe collects payment + email
5. Success redirect back to store

No account needed. No auth required.

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect repo to Vercel, set NEXT_PUBLIC_DREAM_PUBLISHABLE_KEY env var
```

### Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy .next
```

Set `NEXT_PUBLIC_DREAM_PUBLISHABLE_KEY` in environment variables.

## Don't Do These Things

- Don't hardcode products (they come from API)
- Don't put secret key in frontend (only PK needed)
- Don't build custom checkout (SDK handles it)

## Use Cases

- Pop-up shops
- Merch drops
- Artist sales
- Event merchandise
- Small business storefronts

Minimal infrastructure. Just products + checkout.
