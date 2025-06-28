"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Product } from "@/lib/store/mockData";
import { getCloudinaryConfig, checkCloudinaryConfig } from "@/lib/cloudinary/client";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, "id">) => void;
  product?: Product;
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    collectionIds: [],
    scripture: {
      verse: "",
      reference: ""
    },
    image: "",
    images: [],
    sizes: [],
    colors: []
  });
  
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [cloudinaryError, setCloudinaryError] = useState<string | null>(null);
  
  // Check Cloudinary configuration on component mount
  useEffect(() => {
    if (!checkCloudinaryConfig()) {
      setCloudinaryError("Cloudinary is not configured. Please set the required environment variables.");
    } else {
      setCloudinaryError(null);
    }
  }, []);
  
  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description || "",
        category: product.category,
        stock: product.stock,
        collectionIds: product.collectionIds,
        scripture: product.scripture,
        image: product.image,
        images: product.images || [],
        sizes: product.sizes || [],
        colors: product.colors || [],
        cut: product.cut,
        careInstructions: product.careInstructions
      });
      
      setUploadedImages(product.images || [product.image].filter(Boolean) as string[]);
    }
  }, [product]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "scripture") {
        setFormData(prev => ({
          ...prev,
          scripture: {
            ...prev.scripture,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };
  
  // Handle array input changes (comma-separated values)
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const array = value.split(",").map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [name]: array }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update image fields with uploaded images
    const updatedFormData = {
      ...formData,
      image: uploadedImages[0] || "",
      images: uploadedImages
    };
    
    onSave(updatedFormData);
    onClose();
  };
  
  // Handle image upload success
  const handleUploadSuccess = (result: any) => {
    if (result.info && result.info.secure_url) {
      setUploadedImages(prev => [...prev, result.info.secure_url]);
    }
  };
  
  // Remove an uploaded image
  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  if (!isOpen) return null;
  
  // Get Cloudinary configuration
  const cloudinaryConfig = getCloudinaryConfig();
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
        
        <div className="relative bg-black border border-gold/30 p-6 w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-clash-display text-gold">
              {product ? "EDIT PRODUCT" : "ADD PRODUCT"}
            </h2>
            <button 
              onClick={onClose}
              className="text-cream hover:text-gold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-cream mb-1">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-cream mb-1">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-cream mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Caps">Caps</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="stock" className="block text-cream mb-1">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleNumberChange}
                    min="0"
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="sizes" className="block text-cream mb-1">Sizes (comma-separated)</label>
                  <input
                    type="text"
                    id="sizes"
                    name="sizes"
                    value={formData.sizes?.join(", ") || ""}
                    onChange={handleArrayChange}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="colors" className="block text-cream mb-1">Colors (comma-separated)</label>
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    value={formData.colors?.join(", ") || ""}
                    onChange={handleArrayChange}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-cream mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="scripture.verse" className="block text-cream mb-1">Scripture Verse</label>
                  <textarea
                    id="scripture.verse"
                    name="scripture.verse"
                    value={formData.scripture.verse}
                    onChange={handleChange}
                    rows={2}
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="scripture.reference" className="block text-cream mb-1">Scripture Reference</label>
                  <input
                    type="text"
                    id="scripture.reference"
                    name="scripture.reference"
                    value={formData.scripture.reference}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="cut" className="block text-cream mb-1">Cut/Fit</label>
                  <input
                    type="text"
                    id="cut"
                    name="cut"
                    value={formData.cut || ""}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="careInstructions" className="block text-cream mb-1">Care Instructions</label>
                  <textarea
                    id="careInstructions"
                    name="careInstructions"
                    value={formData.careInstructions || ""}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Product Images */}
            <div className="space-y-4">
              <label className="block text-cream mb-1">Product Images</label>
              
              {cloudinaryError ? (
                <div className="p-4 border border-red-500 bg-red-500/10 text-red-400 mb-4">
                  {cloudinaryError}
                  <p className="mt-2 text-sm">
                    To fix this, add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your .env.local file.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative w-24 h-24 border border-gold/30">
                        <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-black text-gold rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <CldUploadWidget
                    {...cloudinaryConfig}
                    onSuccess={handleUploadSuccess}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="bg-black/30 border border-gold/30 text-gold p-2 hover:bg-gold/10"
                      >
                        Upload Images
                      </button>
                    )}
                  </CldUploadWidget>
                  
                  <p className="text-cream/50 text-sm">
                    First image will be used as the main product image
                  </p>
                </>
              )}
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gold/20">
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
                {product ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 