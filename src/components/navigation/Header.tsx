import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import CartIndicator from "../shopping-cart/CartIndicator";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="w-full">
      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <svg
                  aria-label="Vercel logomark"
                  height="18"
                  role="img"
                  viewBox="0 0 74 64"
                  className="text-foreground"
                >
                  <path
                    d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="text-lg font-bold text-black">Swag Store</span>
              </Link>

              {/* Left Aligned Navigation Links */}
              <div className="hidden md:flex gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/search"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              {/* Cart Icon */}
              <Suspense
                fallback={<ShoppingCart className="w-5 h-5 text-gray-700" />}
              >
                <CartIndicator />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
