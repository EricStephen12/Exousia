"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCollectionsClient } from "@/lib/supabase/products";
import { Collection } from "@/lib/supabase/products";

export default function CollectionsClient() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch collections from Supabase
  useEffect(() => {
    async function fetchCollections() {
      try {
        setIsLoading(true);
        const data = await getCollectionsClient();
        setCollections(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCollections();
  }, []);

  // Show error state
  if (error) {
    return (
      <div className="py-16 bg-black min-h-[50vh]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gold text-black px-6 py-2 font-satoshi font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="py-16 bg-black min-h-[50vh]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cream mt-4">Loading collections...</p>
        </div>
      </div>
    );
  }

  // Filter featured collections
  const featuredCollections = collections.filter(collection => collection.featured);

  return (
    <>
      {/* Hero Banner */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-clash-display tracking-wider text-gold">COLLECTIONS</h1>
            <p className="text-xl md:text-2xl font-italiana text-gold mt-4">Curated pieces for every believer</p>
          </div>
        </div>
      </section>

      {/* Collections Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Featured Collections */}
          {featuredCollections.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-clash-display mb-8 text-gold">FEATURED COLLECTIONS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredCollections.map((collection) => (
                  <Link 
                    key={collection.id} 
                    href={`/shop/collections/${collection.id}`}
                    className="group block"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      {collection.image_url ? (
                        <Image 
                          src={collection.image_url} 
                          alt={collection.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <p className="text-gold font-italiana text-2xl">{collection.name}</p>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="text-3xl font-clash-display text-cream mb-2">{collection.name}</h3>
                          <p className="text-gold font-italiana">{collection.description}</p>
                          <div className="mt-4 border border-gold inline-block px-6 py-2 text-gold hover:bg-gold hover:text-black transition-colors">
                            SHOP NOW
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* All Collections */}
          <div>
            <h2 className="text-3xl font-clash-display mb-8 text-gold">ALL COLLECTIONS</h2>
            
            {collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Link 
                    key={collection.id} 
                    href={`/shop/collections/${collection.id}`}
                    className="group block"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      {collection.image_url ? (
                        <Image 
                          src={collection.image_url} 
                          alt={collection.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <p className="text-gold font-italiana text-2xl">{collection.name}</p>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="text-center p-6">
                          <h3 className="text-2xl font-clash-display text-cream mb-2">{collection.name}</h3>
                          <div className="mt-2 border border-gold inline-block px-4 py-1 text-gold hover:bg-gold hover:text-black transition-colors">
                            SHOP NOW
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-clash-display text-cream text-xl">{collection.name}</h3>
                      <p className="text-cream/70 mt-1">{collection.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-gold text-xl mb-4">No collections available</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
} 