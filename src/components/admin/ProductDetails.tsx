"use client";

import { Product } from "@/lib/store/mockData";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductDetails({ product, onClose, onEdit, onDelete }: ProductDetailsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Determine which images to display
  const imagesToDisplay = product.images && product.images.length > 0 
    ? product.images 
    : [product.image].filter(img => img);
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-black border border-gold/30 w-full max-w-2xl mx-auto rounded-sm">
          {/* Header */}
          <div className="border-b border-gold/30 p-4 flex justify-between items-center">
            <h2 className="text-xl font-clash-display text-gold">
              Product Details
            </h2>
            <button 
              onClick={onClose}
              className="text-cream hover:text-gold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Product Image */}
              <div className="space-y-4">
                <div className="border border-gold/30 aspect-square flex items-center justify-center">
                  {imagesToDisplay.length > 0 ? (
                    <img 
                      src={imagesToDisplay[activeImageIndex]} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-gold/50 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      <p className="mt-2">No Image</p>
                    </div>
                  )}
                </div>
                
                {/* Image thumbnails */}
                {imagesToDisplay.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {imagesToDisplay.map((img, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 border ${index === activeImageIndex ? 'border-gold' : 'border-gold/30'}`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right column - Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-clash-display text-cream">{product.name}</h3>
                  <p className="text-xl text-gold mt-1">${product.price.toFixed(2)}</p>
                </div>
                
                {product.description && (
                  <div>
                    <p className="text-cream/70">Description</p>
                    <p className="text-cream">{product.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-cream/70">Category</p>
                    <p className="text-cream">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-cream/70">Stock</p>
                    <p className="text-cream">{product.stock}</p>
                  </div>
                </div>
                
                {product.cut && (
                  <div>
                    <p className="text-cream/70">Cut/Fit</p>
                    <p className="text-cream">{product.cut}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-cream/70">Scripture</p>
                  <p className="text-cream italic">"{product.scripture.verse}"</p>
                  <p className="text-gold text-sm mt-1">{product.scripture.reference}</p>
                </div>
              </div>
            </div>
            
            {/* Additional Details */}
            <div className="space-y-6">
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-gold font-semibold mb-2">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span 
                        key={size} 
                        className="bg-black border border-gold/30 text-cream px-3 py-1"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-gold font-semibold mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span 
                        key={color} 
                        className="bg-black border border-gold/30 text-cream px-3 py-1"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Care Instructions */}
              {product.careInstructions && (
                <div>
                  <h3 className="text-gold font-semibold mb-2">Care Instructions</h3>
                  <p className="text-cream">{product.careInstructions}</p>
                </div>
              )}
              
              {/* Collections */}
              <div>
                <h3 className="text-gold font-semibold mb-2">Collections</h3>
                {product.collectionIds.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.collectionIds.map((id) => (
                      <span 
                        key={id} 
                        className="bg-black border border-gold/30 text-cream px-2 py-1 text-sm"
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-cream/70">Not in any collections</p>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gold/30">
              {showDeleteConfirm ? (
                <>
                  <p className="text-red-500 mr-auto self-center">Are you sure?</p>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-gold/30 text-cream hover:bg-gold/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={onEdit}
                    className="px-4 py-2 bg-gold text-black hover:bg-gold/90"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 