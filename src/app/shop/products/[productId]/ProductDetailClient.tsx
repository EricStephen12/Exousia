"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/product/AddToCartButton";
import { getProductByIdClient } from "@/lib/supabase/products";
import { Product } from "@/lib/store/mockData";

// Extended product details
interface ExtendedProductDetails {
  sizes: string[];
  colors: string[];
  description: string;
  details: {
    fabric: string;
    fit: string;
    care: string;
  };
  fullScripture: string;
}

export default function ProductDetailClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Create extended details from product data
  const getExtendedDetails = (product: Product): ExtendedProductDetails => {
    return {
      sizes: product.sizes || [],
      colors: product.colors || [],
      description: product.description || "",
      details: {
        fabric: product.cut || "100% premium material",
        fit: "Regular fit, true to size",
        care: product.careInstructions || "Machine wash cold, tumble dry low"
      },
      fullScripture: product.scripture?.verse || ""
    };
  };
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const data = await getProductByIdClient(productId);
        
        if (!data) {
          setError("Product not found");
          return;
        }
        
        console.log('Product data received:', data);
        setProduct(data);
        
        // Set the first image as selected image
        if (data.image) {
          setSelectedImage(data.image);
          console.log('Using main image:', data.image);
        } else if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
          console.log('Using first image from images array:', data.images[0]);
        } else {
          setSelectedImage(null);
          console.log('No images found for product');
        }
        
        // Set default selected size and color
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        
        // Fetch related products (same category)
        const response = await fetch('/api/products');
        const allProducts = await response.json();
        const related = allProducts
          .filter((p: Product) => p.id !== productId && p.category === data.category)
          .slice(0, 3); // Get up to 3 related products
        setRelatedProducts(related);
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // If product not found
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-clash-display text-gold">Product Not Found</h1>
          <p className="text-cream mt-4">The product you're looking for doesn't exist.</p>
          <Link href="/shop/products" className="inline-block mt-6 bg-gold text-black px-6 py-3">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cream mt-4">Loading product...</p>
        </div>
      </div>
    );
  }
  
  const details = getExtendedDetails(product);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left 70% = Image Gallery */}
        <div className="w-full md:w-[70%] h-screen bg-black relative">
          {/* Main Image */}
          <div className="h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              {selectedImage ? (
                <>
                  <Image 
                    src={selectedImage} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                    onError={() => {
                      console.error('Failed to load image:', selectedImage);
                      setSelectedImage(null);
                    }}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-xs text-white p-2 rounded z-10">
                    Image URL: {selectedImage.substring(0, 30)}...
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <p className="text-gold font-italiana text-2xl">Product Image</p>
                </div>
              )}
              
              {/* Background transition effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50"></div>
            </div>
          </div>
          
          {/* Thumbnail Strip */}
          {product.images && product.images.length > 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {/* Add main product image to thumbnails if it exists */}
              {product.image && (
                <button 
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-16 border ${
                    selectedImage === product.image ? 'border-gold' : 'border-gold/30'
                  } cursor-pointer hover:border-gold transition-colors`}
                >
                  <Image 
                    src={product.image} 
                    alt={`${product.name} main view`} 
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              )}
              {/* Additional product images */}
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`w-16 h-16 border ${
                    selectedImage === image ? 'border-gold' : 'border-gold/30'
                  } cursor-pointer hover:border-gold transition-colors`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Right 30% = Product Info */}
        <div className="w-full md:w-[30%] md:h-screen bg-black/95 backdrop-blur overflow-y-auto">
          {/* Scripture Header */}
          <div className="p-8 border-b border-gold/20">
            <p className="text-gold italic font-italiana">"{product.scripture.verse}"</p>
            <p className="text-xs text-cream">{product.scripture.reference}</p>
          </div>
          
          {/* Product Name & Price */}
          <div className="p-8">
            <h1 className="text-3xl font-clash-display text-gold">{product.name}</h1>
            <p className="text-2xl text-gold mt-2">${product.price}</p>
            
            {/* Product Description */}
            <p className="mt-4 text-cream/70">{details.description}</p>
            
            {/* Size Selector */}
            {details.sizes.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-cream mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {details.sizes.map((size) => (
                    <button 
                      key={size} 
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        selectedSize === size 
                          ? "bg-gold text-black border-gold" 
                          : "border-gold/30 hover:border-gold"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <Link href="/size-guide" className="text-xs text-cream/50 mt-2 underline cursor-pointer">
                  Size Guide
                </Link>
              </div>
            )}
            
            {/* Color Swatches */}
            {details.colors.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-cream mb-2">Color</p>
                <div className="flex flex-wrap gap-4">
                  {details.colors.map((color) => (
                    <div key={color} className="flex flex-col items-center">
                      <button
                        className={`w-8 h-8 rounded-full border ${
                          selectedColor === color 
                            ? "border-gold ring-2 ring-gold" 
                            : "border-gold/30"
                        } ${
                          color === "Black" ? 'bg-black' : 
                          color === "White" ? 'bg-white' :
                          color === "Gold" ? 'bg-amber-600' :
                          color === "Silver" ? 'bg-gray-300' :
                          color === "Cream" ? 'bg-amber-50' :
                          color === "Burgundy" ? 'bg-red-900' :
                          color === "Navy" ? 'bg-navy-900' :
                          color === "Olive" ? 'bg-olive-600' :
                          color === "Gray" ? 'bg-gray-500' :
                          'bg-gray-500'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      ></button>
                      <span className="text-xs text-cream/70 mt-1">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mt-8">
              <p className="text-sm text-cream mb-2">Quantity</p>
              <div className="flex items-center border border-gold/30 w-fit">
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gold"
                  onClick={() => updateQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-cream">
                  {quantity}
                </span>
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gold"
                  onClick={() => updateQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-8">
              <AddToCartButton 
                product={product}
                selectedSize={selectedSize}
                quantity={quantity}
                selectedColor={selectedColor}
              />
            </div>
          </div>
          
          {/* Details Tabs */}
          <div className="p-8 border-t border-gold/20">
            <div className="space-y-8">
              <div>
                <h3 className="text-gold font-semibold mb-2">THE VERSE</h3>
                <p className="text-cream/70">{details.fullScripture}</p>
              </div>
              
              <div>
                <h3 className="text-gold font-semibold mb-2">THE CUT</h3>
                <p className="text-cream/70">Fabric: {details.details.fabric}</p>
                <p className="text-cream/70">Fit: {details.details.fit}</p>
              </div>
              
              <div>
                <h3 className="text-gold font-semibold mb-2">THE CARE</h3>
                <p className="text-cream/70">{details.details.care}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-clash-display mb-8">RELATED PIECES</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link href={`/shop/products/${relatedProduct.id}`} key={relatedProduct.id}>
                  <div className="bg-black border border-gold/20">
                    <div className="aspect-[3/4] relative">
                      {relatedProduct.image ? (
                        <Image 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <p className="text-gold font-italiana">{relatedProduct.name}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-satoshi font-semibold text-cream">{relatedProduct.name}</h3>
                      <p className="text-sm text-cream/70">{relatedProduct.scripture.reference}</p>
                      <p className="text-gold font-semibold mt-2">${relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
} 