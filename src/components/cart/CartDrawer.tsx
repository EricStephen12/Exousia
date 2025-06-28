"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  
  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + shipping;

  // Close cart when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-black border-l border-gold/20 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-6 border-b border-gold/20 flex justify-between items-center">
          <h2 className="text-xl font-clash-display text-cream">YOUR CART</h2>
          <button 
            onClick={onClose}
            className="text-cream hover:text-gold transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto h-[calc(100vh-250px)]">
          {items.length > 0 ? (
            <div className="divide-y divide-gold/10">
              {items.map(item => (
                <div key={item.id} className="p-4 flex">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-black/30 flex-shrink-0 mr-4">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80} 
                        height={80} 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gold text-xs">Image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-satoshi font-semibold text-cream">{item.name}</h3>
                      <span className="text-gold">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-sm text-cream/70">Size: {item.size}</p>
                    <p className="text-sm text-cream/70">Color: {item.color}</p>
                    
                    {/* Quantity and Remove */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gold/30">
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-gold"
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-cream">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-gold"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="text-cream/50 hover:text-gold text-sm underline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6">
              <p className="text-gold text-lg mb-4">Your cart is empty</p>
              <p className="text-cream/70 text-center mb-6">Add some items to your cart to see them here.</p>
              <button 
                onClick={onClose}
                className="border border-gold text-gold px-6 py-2 hover:bg-gold hover:text-black transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}
        </div>
        
        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 p-6 bg-black">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-cream">Subtotal</span>
                <span className="text-cream">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-cream">Shipping</span>
                <span className="text-cream">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="h-px bg-gold/20 my-2"></div>
              
              <div className="flex justify-between font-semibold">
                <span className="text-cream">Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              href="/shop/checkout" 
              className="block w-full bg-gold text-black py-3 text-center font-clash-display tracking-wide hover:bg-gold/90 transition-colors"
            >
              CHECKOUT
            </Link>
            
            <button 
              onClick={onClose}
              className="block w-full text-cream underline text-sm mt-4"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 