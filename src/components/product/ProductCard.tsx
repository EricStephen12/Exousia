"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/store/mockData";

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  
  // Handle case where product is undefined
  if (!product) {
    console.error("ProductCard received undefined product");
    return (
      <div className="bg-black border border-gold/20 p-4 flex items-center justify-center aspect-[3/4]">
        <p className="text-gold">Product data unavailable</p>
      </div>
    );
  }
  
  // Choose the image source - first try main image, then first from images array, then use placeholder
  let imageSource = product.image;
  if (!imageSource && product.images && product.images.length > 0) {
    imageSource = product.images[0];
  }
  
  // Use a placeholder image based on category if no image is available
  const getPlaceholderImage = () => {
    switch (product.category) {
      case 'T-Shirts':
        return '/placeholders/tshirt.jpg';
      case 'Hoodies':
        return '/placeholders/hoodie.jpg';
      case 'Caps':
        return '/placeholders/cap.jpg';
      case 'Accessories':
        return '/placeholders/accessory.jpg';
      default:
        return '/placeholders/product.jpg';
    }
  };

  return (
    <Link 
      href={`/shop/products/${product.id}`}
      className="bg-black border border-gold/20 group cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {!imageError && (
          <Image
            src={imageSource || getPlaceholderImage()}
            alt={product.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        )}
        
        {imageError && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gold font-italiana text-xl mb-2">{product.name}</p>
              <p className="text-cream/70 text-sm">{product.category}</p>
              <p className="text-gold mt-2">${product.price}</p>
            </div>
          </div>
        )}
        
        {/* Scripture overlay on hover */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
          <p className="text-gold font-italiana text-center px-4">
            {product.scripture?.verse || ""}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-satoshi font-semibold text-cream">{product.name}</h3>
        <p className="text-sm text-cream/70">{product.scripture?.reference || ""}</p>
        <p className="text-gold font-semibold mt-2">${product.price}</p>
      </div>
    </Link>
  );
} 