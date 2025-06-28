"use client";

import { useState, useEffect } from "react";
import { Collection } from "@/lib/store/mockData";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collection: Omit<Collection, "id">) => void;
  collection?: Collection; // If provided, we're editing an existing collection
}

export default function CollectionModal({ isOpen, onClose, onSave, collection }: CollectionModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with collection data if editing
  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setDescription(collection.description);
      setFeatured(collection.featured);
    } else {
      // Reset form for new collection
      setName("");
      setDescription("");
      setFeatured(false);
    }
  }, [collection, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        name,
        description,
        featured,
        image: ""
      });
      
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-black border border-gold/30 w-full max-w-lg mx-auto rounded-sm">
          {/* Header */}
          <div className="border-b border-gold/30 p-4 flex justify-between items-center">
            <h2 className="text-xl font-clash-display text-gold">
              {collection ? "Edit Collection" : "Add New Collection"}
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
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Collection Name */}
            <div>
              <label className="block text-cream mb-2">Collection Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-black/30 border ${errors.name ? 'border-red-500' : 'border-gold/30'} p-2 text-cream`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-cream mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full bg-black/30 border ${errors.description ? 'border-red-500' : 'border-gold/30'} p-2 text-cream`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mr-2 accent-gold"
              />
              <label htmlFor="featured" className="text-cream">
                Featured Collection
              </label>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gold/30">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gold/30 text-cream hover:bg-gold/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gold text-black hover:bg-gold/90"
              >
                {collection ? "Update Collection" : "Add Collection"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 