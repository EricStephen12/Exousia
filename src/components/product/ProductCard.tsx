"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  scripture: {
    verse: string;
    reference: string;
  };
  image: string;
}

export default function ProductCard({ id, name, price, scripture, image }: ProductCardProps) {
  return (
    <div className="product-card group cursor-pointer">
      {/* Image with overlay */}
      <Link href={`/shop/products/${id}`}>
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Product Image */}
          <div className="w-full h-full relative">
            {image ? (
              <Image 
                src={image} 
                alt={name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-gold font-italiana">Product Image</p>
              </div>
            )}
          </div>
          
          {/* Scripture overlay on hover */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
            <p className="text-gold font-italiana text-center px-4">
              "{scripture.verse}"
            </p>
          </div>
          
          {/* Quick actions */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-gold text-black py-2 font-satoshi font-semibold">
              QUICK ADD
            </button>
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <h3 className="font-satoshi font-semibold text-cream">{name}</h3>
        <p className="text-sm text-cream/70">{scripture.reference}</p>
        <p className="text-gold font-semibold mt-2">${price}</p>
      </div>
    </div>
  );
} 