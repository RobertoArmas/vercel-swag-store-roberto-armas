## Assignment: Vercel Swag Store

Build a storefront using Next.js 16 to demonstrate your understanding of modern React Server Component patterns, including the "use cache" directive, Suspense boundaries, Server Actions, and the distinction between static and dynamic data.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Architecture

A **Next.js 16 App Router + Cache Components** application built with **React 19**, leveraging React Server Components (RSC), the `"use cache"` directive, Suspense boundaries, and Server Actions. It consumes a remote REST API for all product and cart data, and deploys on Vercel.

### Layers

| Layer           | Location                                          | Purpose                                                          |
| --------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| App Shell       | `src/app/layout.tsx`                              | Root HTML, fonts (Geist / Inter), metadata, analytics, providers |
| Pages & Routing | `src/app/(website)/`                              | Route group for `/`, `/search`, `/products/[slug]`               |
| API Surface     | `src/app/api/`                                    | Route Handlers: health, cart proxy, revalidation webhook, vitals |
| Domain / Data   | `src/lib/swag-store/`                             | HTTP fetches to upstream API + cache directives                  |
| Client State    | `src/lib/cart-manager/`, `src/components/search/` | Cart context (`useReducer`) + Search context                     |
| Presentation    | `src/components/`                                 | Feature-based folders + shadcn `ui/` primitives                  |
| Styling         | `src/app/globals.css`                             | Tailwind CSS v4 + shadcn theme (OKLCH design tokens)             |
| Types           | `src/types/`                                      | DTOs for products, cart, categories, store config                |

### Routing

- **Route group `(website)`** groups public pages without affecting URL paths.
- `/products/[slug]` uses `generateStaticParams` from `getAllProducts()` for static generation.
- `/search` accepts query params, filtered client-side via `SearchProvider`.
- `error.tsx` and `not-found.tsx` provide custom error and 404 pages.

### Data Fetching & Caching

- All data comes from a remote REST API at `BASE_URL` (configured in `.env.local`).
- Server-side fetches live in `src/lib/swag-store/` (marked `server-only`).
- `"use cache"` with `cacheLife` and `cacheTag` on key pages and components (home, products, categories, promotions).
- On-demand revalidation via `POST /api/revalidate` with a shared secret token.
- Cart operations are fully dynamic — read/write via cookies and Server Actions.

### Component Organization

```
src/components/
├── banners/          → PromotionalBanner (Suspense-loaded)
├── home/             → HeroSection
├── navigation/       → Header, Footer
├── products/         → ProductCard, FeaturedProducts, StockIndicator
├── search/           → SearchInput, CategoryFilter, Pagination, SearchResults
├── shopping-cart/    → AddToCart, CartIndicator, ViewCart, CartContext
│   └── actions/      → Server Actions for cart mutations
└── ui/               → shadcn primitives (button, skeleton, alert, pagination)
```

Components follow a **server/client split**: server components by default, with explicit `.client.tsx` files for interactive pieces.

### State Management

- **Cart** — React Context + `useReducer` in `CartContextProvider`, with sessionStorage mirroring. Mutations flow through Server Actions → `lib/swag-store/cart.ts`.
- **Search** — `SearchProvider` + `SearchContext` syncing URL search params via `useRouter` / `useTransition`.

### Styling

- **Tailwind CSS v4** with `@theme inline` design tokens and OKLCH color variables.
- **shadcn/ui** component library (Radix primitives).
- `clsx` + `tailwind-merge` + `cva` for class composition (`lib/utils.ts`).

### External Integrations

| Integration           | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| Vercel Swag Store API | Primary backend for products, cart, categories, promotions |
| Vercel Blob Storage   | Product images (`*.public.blob.vercel-storage.com`)        |
| Vercel Analytics      | Usage analytics                                            |
| Vercel Speed Insights | Performance monitoring                                     |
| Web Vitals            | Client instrumentation → `POST /api/analytics/vitals`      |

### Request Flow: Add to Cart

```
User clicks "Add to Cart"
  → AddToCartButton.client.tsx
    → Server Action (cart-actions.ts)
      → lib/swag-store/cart.ts → HTTP POST to upstream API
        → Sets cart cookie
          → CartContext reloads
            → UI updates (cart indicator, drawer)
```
