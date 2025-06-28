"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShippingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
      />

      {/* Scripture overlay */}
      <div 
        className="absolute right-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block"
        style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
      >
        Isaiah<br/>52:7
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SHIPPING & <span className="text-gold">RETURNS</span>
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Delivery Information</h2>
          <div className="h-px bg-gold flex-grow"></div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-clash-display mb-6 tracking-wide">SHIPPING POLICY</h2>
          <div className="space-y-6 text-cream/80">
            <p>
              At Exousia, we understand the anticipation of receiving your kingdom-class garments. 
              We strive to deliver your order as quickly and efficiently as possible.
            </p>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Processing Time</h3>
              <p>All orders are processed within 1-3 business days after payment confirmation. 
              During high-volume periods (new drops, holidays), processing may take up to 5 business days.</p>
            </div>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Shipping Methods & Delivery Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">Standard Shipping (US)</span>
                  <span>3-5 business days</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">Express Shipping (US)</span>
                  <span>1-2 business days</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">International Shipping</span>
                  <span>7-14 business days</span>
                </div>
              </div>
              <p className="mt-4">Shipping times are estimates and begin from the date of shipment, not the order date.</p>
            </div>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Shipping Costs</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">Orders over $100 (US)</span>
                  <span className="text-gold">FREE</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">Standard Shipping (US)</span>
                  <span>$7.99</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">Express Shipping (US)</span>
                  <span>$14.99</span>
                </div>
                <div className="flex justify-between border-b border-gold/20 pb-2">
                  <span className="font-semibold">International Shipping</span>
                  <span>$24.99+</span>
                </div>
              </div>
            </div>
            
            <p>
              All orders include tracking information that will be sent to your email once your package has shipped. 
              You can also track your order through your account or our <Link href="/track-order" className="text-gold hover:underline">Track Order</Link> page.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-clash-display mb-6 tracking-wide">RETURNS & EXCHANGES</h2>
          <div className="space-y-6 text-cream/80">
            <p>
              We want you to be completely satisfied with your Exousia garments. If for any reason you're not, 
              we offer a straightforward return and exchange policy.
            </p>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Return Policy</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns accepted within 30 days of delivery</li>
                <li>Items must be unworn, unwashed, and with all original tags attached</li>
                <li>Original packaging should be included when possible</li>
                <li>Sale items marked "Final Sale" cannot be returned</li>
                <li>Return shipping costs are the responsibility of the customer unless the return is due to our error</li>
              </ul>
            </div>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Exchange Process</h3>
              <p className="mb-4">
                For size or style exchanges, we offer a simple process:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Initiate an exchange through your account or by contacting customer service</li>
                <li>Receive a return label for your original item</li>
                <li>Once we receive your return, we'll process your exchange</li>
                <li>Your new item will be shipped within 1-3 business days</li>
              </ol>
              <p className="mt-4">For exchanges due to sizing issues, we cover the shipping costs for your replacement item.</p>
            </div>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Refund Process</h3>
              <p className="mb-4">
                Refunds are processed within 5-7 business days after we receive your return. 
                The refund will be issued to the original payment method used for the purchase.
              </p>
              <p>
                Please note that shipping costs are non-refundable unless the return is due to our error 
                (damaged items, incorrect items, etc.).
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl font-clash-display mb-6 tracking-wide">INTERNATIONAL ORDERS</h2>
          <div className="space-y-6 text-cream/80">
            <p>
              Exousia ships worldwide, bringing kingdom-class fashion to believers around the globe. 
              Please note the following information regarding international orders:
            </p>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">Customs & Import Duties</h3>
              <p>
                International customers are responsible for all customs fees, import taxes, and duties 
                imposed by your country's regulations. These fees are not included in the order total 
                and will be collected by the delivery carrier or local customs office.
              </p>
            </div>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-clash-display mb-4 text-gold">International Shipping Restrictions</h3>
              <p>
                Some countries have restrictions on imported clothing or religious items. 
                Please check your local regulations before placing an order. Exousia is not 
                responsible for items confiscated or delayed by customs.
              </p>
            </div>
            
            <p>
              For any questions about shipping, returns, or exchanges, please don't hesitate to 
              <Link href="/contact" className="text-gold hover:underline"> contact our customer service team</Link>.
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-16 relative z-10">
        <div className="border border-gold/30 p-8 text-center max-w-2xl mx-auto bg-black/40 backdrop-blur-sm">
          <h3 className="text-2xl font-clash-display mb-4">Ready to be clothed in purpose?</h3>
          <p className="text-cream/70 mb-6">
            Browse our collections and find the perfect piece to express your faith.
          </p>
          <Link 
            href="/shop/collections" 
            className="inline-block bg-gold text-black px-8 py-3 font-clash-display tracking-wider hover:glow-effect transition-all duration-300"
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "How beautiful upon the mountains are the feet of him who brings good news."
        </p>
        <p className="text-cream/50 mt-2">Isaiah 52:7</p>
      </div>
    </main>
  );
} 