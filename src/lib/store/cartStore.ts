"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './mockData';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size, color, quantity) => {
        const { items } = get();
        
        // Check if item already exists with same product, size, and color
        const existingItemIndex = items.findIndex(
          item => item.productId === product.id && item.size === size && item.color === color
        );
        
        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${size}-${color}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            size,
            color,
            image: product.image
          };
          
          set({ items: [...items, newItem] });
        }
      },
      
      updateItemQuantity: (id, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          set({ items: items.filter(item => item.id !== id) });
        } else {
          // Update quantity
          const updatedItems = items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
          set({ items: updatedItems });
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'exousia-cart',
      skipHydration: true,
    }
  )
);

// Helper function to calculate shipping cost
export const calculateShipping = (subtotal: number): number => {
  // Free shipping over $100
  return subtotal >= 100 ? 0 : 10;
};

// Helper function to calculate total
export const calculateTotal = (subtotal: number): number => {
  return subtotal + calculateShipping(subtotal);
}; 