"use client";

import { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Product } from '@/lib/store/mockData';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "id">) => void;
  product?: Product;
}

type CloudinarySource = "local" | "url" | "camera" | "google_drive" | "dropbox" | "facebook" | "instagram" | "shutterstock" | "unsplash";

// Cloudinary widget configuration
const cloudinaryConfig = {
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "exousia-products",
  maxFiles: 10,
  sources: ["local", "url", "camera", "google_drive", "dropbox"] as CloudinarySource[],
  showAdvancedOptions: false,
  cropping: false,
  multiple: true,
  defaultSource: "local" as CloudinarySource,
  styles: {
    palette: {
      window: "#000000",
      sourceBg: "#000000",
      windowBorder: "#D4B95E",
      tabIcon: "#D4B95E",
      menuIcons: "#D4B95E",
      textDark: "#000000",
      textLight: "#F5E6D3",
      link: "#D4B95E",
      action: "#D4B95E",
      inactiveTabIcon: "#696969",
      error: "#FF0000",
      inProgress: "#D4B95E",
      complete: "#20B832",
    },
    fonts: {
      "'Satoshi', sans-serif": {
        url: "https://fonts.googleapis.com/css?family=Satoshi",
        active: true
      }
    }
  }
};

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  // Initialize state from product prop
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [cut, setCut] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [collectionIds, setCollectionIds] = useState<string[]>([]);
  const [scripture, setScripture] = useState({
    verse: '',
    reference: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen && product) {
      // Editing existing product
      console.log('Editing product:', product);
      console.log('Product images:', product.images);
      
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description || '');
      setCategory(product.category);
      setStock(product.stock.toString());
      setCut(product.cut || '');
      setCareInstructions(product.careInstructions || '');
      setSizes(product.sizes || []);
      setColors(product.colors || []);
      setCollectionIds(product.collectionIds || []);
      setScripture({
        verse: product.scripture?.verse || '',
        reference: product.scripture?.reference || ''
      });
      
      // Initialize both images and uploadedImages with existing product images
      const productImages = [];
      
      // Add main image if it exists
      if (product.image) {
        productImages.push(product.image);
      }
      
      // Add additional images if they exist
      if (product.images && Array.isArray(product.images)) {
        // Filter out the main image to avoid duplicates
        const additionalImages = product.images.filter(img => img !== product.image);
        productImages.push(...additionalImages);
      }
      
      console.log('Setting images to:', productImages);
      setImages(productImages);
      setUploadedImages(productImages);
    } else if (isOpen) {
      // New product
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setStock('');
      setCut('');
      setCareInstructions('');
      setSizes([]);
      setColors([]);
      setCollectionIds([]);
      setScripture({ verse: '', reference: '' });
      setImages([]);
      setUploadedImages([]);
    }
  }, [isOpen, product]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizeArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setSizes(sizeArray);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorArray = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
    setColors(colorArray);
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const collectionArray = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
    setCollectionIds(collectionArray);
  };

  const handleImageUpload = (result: any) => {
    console.log('Image upload result:', result);
    
    if (result.event !== 'success') {
      return;
    }
    
    // Single upload - Cloudinary widget returns info object with secure_url
    const newImage = result.info.secure_url;
    console.log('Adding image:', newImage);
    
    setUploadedImages(prev => [...prev, newImage]);
    setImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we have at least one image
    const finalImages = uploadedImages.length > 0 ? uploadedImages : [];
    
    console.log('Submitting product with images:', finalImages);
    
    onSave({
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      cut,
      careInstructions,
      sizes,
      colors,
      collectionIds,
      scripture,
      images: finalImages,
      image: finalImages.length > 0 ? finalImages[0] : ''
    });
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/95 border border-gold/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold/20">
        <div className="border-b border-gold/30 p-6">
          <h2 className="text-3xl font-clash-display font-bold text-gold tracking-wider">
            {product ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
            </h2>
          </div>
          
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
              <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Name</label>
                  <input
                    type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    required
                  />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Price</label>
                  <input
                    type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  required
                    step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  rows={4}
                  />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Category</label>
                  <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    required
                  >
                  <option value="">Select Category</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Caps">Caps</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Stock</label>
                  <input
                    type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gold mb-2">Cut/Style</label>
                <input
                  type="text"
                  value={cut}
                  onChange={(e) => setCut(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Care Instructions</label>
                <textarea
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  rows={3}
                  />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Sizes</label>
                  <input
                    type="text"
                  value={sizes.join(', ')}
                  onChange={handleSizeChange}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="S, M, L, XL"
                />
              </div>
              
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Colors</label>
                  <input
                    type="text"
                  value={colors.join(', ')}
                  onChange={handleColorChange}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="Black, White, Gold"
                  />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Collections</label>
                  <input
                    type="text"
                  value={collectionIds.join(', ')}
                  onChange={handleCollectionChange}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder="faith-essentials, anointed"
                />
              </div>
            </div>
                </div>
                
          {/* Scripture Section */}
          <div className="border-t border-gold/30 pt-6">
            <h3 className="text-xl font-clash-display text-gold mb-4">Scripture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gold mb-2">Verse</label>
                  <textarea
                  value={scripture.verse}
                  onChange={(e) => setScripture(prev => ({ ...prev, verse: e.target.value }))}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gold mb-2">Reference</label>
                <input
                  type="text"
                  value={scripture.reference}
                  onChange={(e) => setScripture(prev => ({ ...prev, reference: e.target.value }))}
                  className="w-full bg-black/30 border border-gold/30 rounded-md p-3 text-cream placeholder-gold/30 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
                </div>
              </div>
            </div>
            
          {/* Images Section */}
          <div className="border-t border-gold/30 pt-6">
            <h3 className="text-xl font-clash-display text-gold mb-4">Product Images</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-cream">Product Images</span>
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-24 object-cover border border-gold/30"
                      />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                        </button>
                      </div>
                    ))}
                  <CldUploadWidget
                    uploadPreset="exousia-products"
                    onUpload={(result: any) => handleImageUpload(result)}
                    options={{
                      maxFiles: 10,
                      multiple: true,
                      sources: ["local", "url", "camera", "google_drive", "dropbox"],
                      clientAllowedFormats: ["image"],
                      maxFileSize: 5000000
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full h-24 border border-dashed border-gold/30 flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </label>
            </div>
            </div>
            
            {/* Form Actions */}
          <div className="border-t border-gold/30 pt-6 flex justify-end space-x-4">
              <button 
                type="button"
                onClick={onClose}
              className="px-6 py-3 border border-gold/50 text-gold hover:bg-gold/10 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
              className="px-6 py-3 bg-gold text-black hover:bg-gold/90 rounded-md transition-colors duration-200"
              >
              {product ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
} 