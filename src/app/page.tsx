import Image from "next/image";
import Link from "next/link";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
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

        {/* Featured Products Section - Placeholder */}
        <section className="py-24 bg-black">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-clash-display text-cream mb-12">FEATURED PIECES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product Cards would go here */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-black border border-gold/20 group cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <p className="text-gold font-italiana">Product Image {item}</p>
                    </div>
                    
                    {/* Scripture overlay on hover */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                      <p className="text-gold font-italiana text-center px-4">
                        "Be strong and courageous"
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-satoshi font-semibold text-cream">Armor of God Tee</h3>
                    <p className="text-sm text-cream/70">Ephesians 6:11</p>
                    <p className="text-gold font-semibold mt-2">$45</p>
                  </div>
                </div>
              ))}
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
