"use client";

import { useState } from "react";
import { Product } from "@/lib/store/mockData";
import { useCartStore } from "@/lib/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  selectedColor?: string;
}

export default function AddToCartButton({ 
  product, 
  selectedSize, 
  quantity, 
  selectedColor = "Black" 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = () => {
    // Validate selection
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Show adding state
    setIsAdding(true);
    
    // Add to cart using Zustand store
    addItem(product, selectedSize, selectedColor, quantity);
    
    // Reset state after a short delay to show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
  return (
    <button 
      className={`w-full py-4 font-clash-display tracking-wide transition-colors ${
        isAdding 
          ? "bg-gold/70 text-black cursor-wait" 
          : "bg-gold text-black hover:bg-gold/90"
      }`}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? "ADDING..." : "ADD TO CART"}
    </button>
  );
} 