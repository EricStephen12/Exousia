"use client";

import { Collection } from "@/lib/store/mockData";
import { useState } from "react";

interface CollectionDetailsProps {
  collection: Collection;
  productCount: number;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CollectionDetails({ 
  collection, 
  productCount,
  onClose, 
  onEdit, 
  onDelete 
}: CollectionDetailsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-black border border-gold/30 w-full max-w-xl mx-auto rounded-sm">
          {/* Header */}
          <div className="border-b border-gold/30 p-4 flex justify-between items-center">
            <h2 className="text-xl font-clash-display text-gold">
              Collection Details
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
          <div className="p-6 space-y-6">
            {/* Collection Image */}
            <div className="border border-gold/30 h-48 flex items-center justify-center">
              {collection.image ? (
                <img 
                  src={collection.image} 
                  alt={collection.name} 
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
            
            {/* Collection Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-clash-display text-cream">{collection.name}</h3>
                <div className="flex items-center mt-2">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${collection.featured ? 'bg-gold' : 'bg-gray-500'}`}></span>
                  <span className="text-cream">{collection.featured ? 'Featured Collection' : 'Regular Collection'}</span>
                </div>
              </div>
              
              <div>
                <p className="text-cream/70">Description</p>
                <p className="text-cream">{collection.description}</p>
              </div>
              
              <div>
                <p className="text-cream/70">Products in Collection</p>
                <p className="text-cream">{productCount} products</p>
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