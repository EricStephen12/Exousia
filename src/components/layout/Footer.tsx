"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [tickerPosition, setTickerPosition] = useState(0);

  // Animate the scripture ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition((prev) => (prev - 1) % -2000);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the email to an API
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-black border-t border-gold/20 relative overflow-hidden">
      {/* Animated verse ticker */}
      <div className="h-12 bg-gold/10 flex items-center overflow-hidden">
        <div 
          className="whitespace-nowrap text-gold font-italiana text-lg"
          style={{ transform: `translateX(${tickerPosition}px)` }}
        >
          "Put on the full armor of God, that you may be able to stand against the schemes of the devil." • 
          "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." • 
          "I can do all things through Christ who strengthens me." • 
          "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes." • 
          "The LORD is my light and my salvation—whom shall I fear?" • 
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-clash-display text-cream tracking-wider">
              EXOUSIA
            </Link>
            <p className="text-cream/70 mt-4">
              Christian streetwear where anime intensity meets poetic scripture and editorial luxury meets spiritual fire.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-cream hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Shop Column */}
          <div>
            <h3 className="text-gold font-semibold mb-4 font-clash-display tracking-wide">SHOP</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop/collections" className="text-cream hover:text-gold transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="text-gold font-semibold mb-4 font-clash-display tracking-wide">SUPPORT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-cream hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream hover:text-gold transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-cream hover:text-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-cream hover:text-gold transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-cream hover:text-gold transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-cream hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h3 className="text-gold font-semibold mb-4 font-clash-display tracking-wide">BE CLOTHED IN PURPOSE</h3>
            <p className="text-cream/70 mb-4">
              Join the kingdom. Get early access to drops + daily verses.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="your.email@kingdom.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-cream/10 border border-gold/30 text-cream p-3 flex-grow focus:border-gold focus:outline-none placeholder-cream/50"
                />
                <button 
                  type="submit"
                  className="bg-gold text-black px-8 py-3 font-semibold hover:glow-effect"
                >
                  AMEN
                </button>
              </div>
              
              {subscribed && (
                <p className="text-gold text-sm">
                  Thank you for subscribing!
                </p>
              )}
              
              <p className="text-xs text-cream/50">
                By subscribing you agree to our Privacy Policy and provide consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gold/20 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} Exousia. For those Unashamed.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-cream/50 hover:text-gold text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-cream/50 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-cream/50 hover:text-gold text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
          
          {/* Final scripture */}
          <div className="text-right mt-4 md:mt-0">
            <p className="font-italiana text-gold">Romans 1:16</p>
            <p className="text-cream/50 text-sm">Unashamed</p>
          </div>
        </div>
      </div>
      
      {/* Fade to black overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </footer>
  );
} 