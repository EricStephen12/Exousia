import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="h-[70vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* This would be a real image in production */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/20 flex items-center justify-center">
          <p className="text-gold font-italiana text-2xl">Brand Image</p>
        </div>
        
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-6xl md:text-7xl font-clash-display text-cream mb-4">OUR STORY</h1>
            <p className="text-xl md:text-2xl font-italiana text-gold">Where faith meets fashion</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-clash-display text-cream mb-8">THE VISION</h2>
            
            <div className="prose prose-lg prose-invert prose-gold">
              <p className="text-cream/80 mb-6">
                Exousia was born from a divine calling to create clothing that speaks to both the spirit and the style-conscious. Our name, derived from the Greek word for "authority," represents the power and authority given to believers through Christ.
              </p>
              
              <p className="text-cream/80 mb-6">
                We believe that fashion can be more than just what you wear—it can be a declaration of faith, a conversation starter, and a reminder of the power you carry. Each piece in our collection is designed with intention, combining high-end streetwear aesthetics with powerful scripture.
              </p>
              
              <p className="text-cream/80 mb-10">
                Our founder's journey began in the fashion industry, where the emptiness of style without substance became apparent. After a profound spiritual awakening, the vision for Exousia emerged: to create clothing that would stand out in quality and design while carrying messages that transform lives.
              </p>
              
              <div className="my-16 border-l-4 border-gold pl-6">
                <p className="text-gold italic text-2xl font-italiana">
                  "Fashion fades, but faith is eternal. We create pieces that speak to both."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-24 bg-black/90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-clash-display text-cream mb-16 text-center">OUR VALUES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-clash-display text-gold mb-3">FAITH</h3>
              <p className="text-cream/70">
                Our foundation is built on unwavering faith in God's word and promises. Every design begins with prayer and scripture.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-clash-display text-gold mb-3">EXCELLENCE</h3>
              <p className="text-cream/70">
                We believe in creating products of the highest quality, from materials to messaging, honoring God with our craftsmanship.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 className="text-xl font-clash-display text-gold mb-3">IMPACT</h3>
              <p className="text-cream/70">
                We're committed to making a difference through our business, donating a portion of profits to ministries and community outreach.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-clash-display text-cream mb-8">OUR MISSION</h2>
          
          <p className="text-xl text-gold font-italiana max-w-3xl mx-auto mb-16">
            To create clothing that empowers believers to boldly express their faith through exceptional design and quality, while making a positive impact in the world.
          </p>
          
          <div className="mt-16">
            <a 
              href="/shop/collections" 
              className="inline-block bg-gold text-black px-8 py-4 text-lg font-semibold hover:glow-effect transition-all duration-300"
            >
              EXPLORE OUR COLLECTIONS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 