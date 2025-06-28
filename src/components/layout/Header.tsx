"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartStore } from "@/lib/store/cartStore";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const itemCount = getTotalItems();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-clash-display text-cream">
              EXOUSIA
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors font-satoshi">
                COLLECTIONS
              </Link>
              <Link href="/shop/products" className="text-cream hover:text-gold transition-colors font-satoshi">
                PRODUCTS
              </Link>
              <Link href="/about" className="text-cream hover:text-gold transition-colors font-satoshi">
                ABOUT
              </Link>
              <Link href="/track-order" className="text-cream hover:text-gold transition-colors font-satoshi">
                TRACK ORDER
              </Link>
            </nav>

            {/* Cart and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button 
                onClick={() => setCartOpen(true)}
                className="text-cream hover:text-gold transition-colors relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {/* Cart Item Count Badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-black text-xs flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-cream hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gold/20 animate-fade-in">
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link 
                href="/shop/collections" 
                className="text-cream hover:text-gold transition-colors py-2 font-satoshi"
                onClick={() => setMobileMenuOpen(false)}
              >
                COLLECTIONS
              </Link>
              <Link 
                href="/shop/products" 
                className="text-cream hover:text-gold transition-colors py-2 font-satoshi"
                onClick={() => setMobileMenuOpen(false)}
              >
                PRODUCTS
              </Link>
              <Link 
                href="/about" 
                className="text-cream hover:text-gold transition-colors py-2 font-satoshi"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link 
                href="/track-order" 
                className="text-cream hover:text-gold transition-colors py-2 font-satoshi"
                onClick={() => setMobileMenuOpen(false)}
              >
                TRACK ORDER
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
} 