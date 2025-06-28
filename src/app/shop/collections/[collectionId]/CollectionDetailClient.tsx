"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortOptions from "@/components/product/SortOptions";
import { getCollectionsClient, getProductsByCollectionClient } from "@/lib/supabase/products";
import { Collection } from "@/lib/supabase/products";
import { Product } from "@/lib/store/mockData";

export default function CollectionDetailClient({ collectionId }: { collectionId: string }) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 200] as [number, number],
    scriptureBooks: [] as string[]
  });
  const [sortOption, setSortOption] = useState<"newest" | "price-low" | "price-high" | "name-asc" | "name-desc">("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch collection and its products from Supabase
  useEffect(() => {
    async function fetchCollectionData() {
      try {
        setIsLoading(true);
        
        // Fetch all collections
        const collectionsData = await getCollectionsClient();
        const foundCollection = collectionsData.find(c => c.id === collectionId);
        
        if (!foundCollection) {
          setError("Collection not found");
          return;
        }
        
        setCollection(foundCollection);
        
        // Fetch products for this collection
        const productsData = await getProductsByCollectionClient(collectionId);
        setProducts(productsData);
        
      } catch (err) {
        console.error("Error fetching collection data:", err);
        setError("Failed to load collection data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCollectionData();
  }, [collectionId]);
  
  // If collection not found
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-clash-display text-gold">Collection Not Found</h1>
          <p className="text-cream mt-4">The collection you're looking for doesn't exist.</p>
          <Link href="/shop/collections" className="inline-block mt-6 bg-gold text-black px-6 py-3">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }
  
  // Show loading state
  if (isLoading || !collection) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cream mt-4">Loading collection...</p>
        </div>
      </div>
    );
  }
  
  // Extract unique categories for filters
  const categories = [...new Set(products.map(product => product.category))];
  
  // Extract unique scripture books for filters
  const scriptureBooks = [...new Set(
    products
      .map(product => product.scripture.reference.split(" ")[0])
      .filter(Boolean)
  )];
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Scripture book filter
    if (filters.scriptureBooks.length > 0) {
      const book = product.scripture.reference.split(" ")[0];
      if (!filters.scriptureBooks.includes(book)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
      default:
        return 0; // In a real app, would sort by date
    }
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="h-[50vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-clash-display tracking-wider text-gold">{collection.name.toUpperCase()}</h1>
            <p className="text-cream italic font-satoshi mt-4">{collection.description}</p>
          </div>
        </div>
      </section>

      {/* Collection Products */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6 flex justify-between items-center">
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center space-x-2 text-cream"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Filter</span>
            </button>
            
            <SortOptions onSortChange={setSortOption} />
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Sidebar - Desktop always visible, mobile conditional */}
            <div className={`
              md:w-1/4 md:block
              ${isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-black' : 'hidden'}
            `}>
              {/* Mobile Close Button */}
              {isMobileFilterOpen && (
                <div className="md:hidden flex justify-end p-4">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-cream"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              )}
              
              <FilterSidebar 
                onFilterChange={setFilters} 
                availableCategories={categories}
                availableScriptureBooks={scriptureBooks}
              />
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4 md:pl-8">
              {/* Desktop Sort Options */}
              <div className="hidden md:flex justify-end mb-6">
                <SortOptions onSortChange={setSortOption} />
              </div>
              
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-cream">Showing {sortedProducts.length} results in {collection.name}</p>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    scripture={product.scripture}
                    image={product.image}
                  />
                ))}
              </div>
              
              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-gold text-xl mb-4">No products match your filters</p>
                  <button 
                    onClick={() => setFilters({
                      categories: [],
                      priceRange: [0, 200],
                      scriptureBooks: []
                    })}
                    className="text-cream underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 