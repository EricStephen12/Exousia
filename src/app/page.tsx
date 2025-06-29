import Image from "next/image";
import Link from "next/link";
import ClientLayout from "@/components/layout/ClientLayout";
import { Product } from "@/lib/store/mockData";
import ProductCard from "@/components/product/ProductCard";

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    console.log('Base URL for API calls:', baseUrl);
    
    const response = await fetch(`${baseUrl}/api/products/featured`, {
      cache: 'no-store' // Don't cache the response
    });
    
    if (!response.ok) {
      console.error('Failed to fetch featured products:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    console.log('Featured products data:', data);
    return data as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch products for featured section
  const featuredProducts = await getFeaturedProducts();

  return (
    <ClientLayout>
      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="h-screen relative overflow-hidden">
          {/* Vertical Split Layout */}
          <div className="flex h-full">
            {/* Left Side - Animated Hoodie */}
            <div className="w-1/2 relative bg-black overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* This would be replaced with an actual image or video */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gold font-italiana text-2xl">Hoodie cloth in slow motion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Editorial Photo */}
            <div className="w-1/2 relative bg-black overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* This would be replaced with an actual image */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gold font-italiana text-2xl">Editorial photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-clash-display text-cream tracking-wide">ONE LINE. ONE PURPOSE.</h1>
              <p className="text-xl md:text-2xl italic text-gold mt-4">by Exousia</p>
              
              {/* Bible Verse Overlay - Fades in */}
              <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
                <p className="text-xl md:text-2xl font-italiana text-gold">Romans 1:16 — UNASHAMED</p>
              </div>
              
              {/* CTA Button */}
              <div className="mt-12">
                <Link 
                  href="/shop/collections" 
                  className="inline-block bg-gold text-black px-8 py-4 text-lg font-semibold hover:glow-effect transition-all duration-300"
                >
                  SHOP THE DROP
                </Link>
              </div>
            </div>
          </div>

          {/* Light Leaks Effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] bg-gold/10 rounded-full blur-[80px]"></div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cream/50 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-black">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-clash-display text-cream mb-12">FEATURED PIECES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts && featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  product ? <ProductCard key={product.id} product={product} /> : null
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gold">No featured products available</p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/shop/collections" 
                className="inline-block border border-gold text-gold px-8 py-3 text-lg font-semibold hover:bg-gold hover:text-black transition-all duration-300"
              >
                VIEW ALL COLLECTIONS
              </Link>
            </div>
          </div>
        </section>

        {/* Scripture Ticker */}
        <div className="h-12 bg-gold/10 flex items-center overflow-hidden">
          <div className="animate-scroll whitespace-nowrap text-gold font-italiana text-lg">
            "Put on the full armor of God..." • "Be strong and courageous..." • "I can do all things through Christ..." • 
            "Put on the full armor of God..." • "Be strong and courageous..." • "I can do all things through Christ..." •
          </div>
        </div>
      </main>
    </ClientLayout>
  );
} 