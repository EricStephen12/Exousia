"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent" />
      
      {/* Scripture overlay */}
      <div className="absolute left-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block">
        Matthew<br/>5:37
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          TERMS OF <span className="text-gold">SERVICE</span>
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Our Agreement</h2>
          <div className="h-px bg-gold flex-grow"></div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-cream/80 mb-6">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p className="text-cream/80 mb-6">
            Welcome to Exousia. These Terms of Service ("Terms") govern your access to and use of our website, 
            services, and products. By accessing or using our services, you agree to be bound by these Terms.
          </p>
          
          <p className="text-cream/80 mb-6">
            Please read these Terms carefully. If you do not agree with these Terms, you may not access or use our services.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">1. ACCEPTANCE OF TERMS</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              By accessing our website, placing an order, or using our services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms, as well as our Privacy Policy and Cookie Policy, 
              which are incorporated herein by reference.
            </p>
            
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice. 
              Your continued use of our services following any changes constitutes your acceptance of the revised Terms.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">2. ACCOUNT REGISTRATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              To access certain features of our services, you may be required to create an account. When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account and password</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
            </ul>
            
            <p>
              We reserve the right to suspend or terminate your account if any information provided is inaccurate, 
              false, or no longer current, or if we believe that your account has been compromised.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">3. PRODUCTS AND ORDERS</h2>
          
          <div className="space-y-6 text-cream/80">
            <h3 className="text-xl font-clash-display mb-2">Product Information</h3>
            <p>
              We strive to display our products as accurately as possible. However, we cannot guarantee that your 
              computer or mobile device's display of colors accurately reflects the actual color of the products. 
              Products may vary slightly from their pictures.
            </p>
            
            <h3 className="text-xl font-clash-display mb-2">Pricing and Availability</h3>
            <p>
              All prices are shown in US dollars and do not include taxes and shipping costs, which will be added 
              at checkout. We reserve the right to change prices at any time without notice. Despite our best efforts, 
              a small number of items may be mispriced or out of stock. If we discover an error in the price of an item 
              you have ordered, we will inform you and give you the option to continue with the order at the correct 
              price or cancel it.
            </p>
            
            <h3 className="text-xl font-clash-display mb-2">Order Acceptance</h3>
            <p>
              Your order constitutes an offer to purchase our products. We reserve the right to accept or decline your 
              order for any reason, including but not limited to product availability, errors in product or pricing 
              information, or problems identified by our security or fraud departments.
            </p>
            
            <h3 className="text-xl font-clash-display mb-2">Payment</h3>
            <p>
              We accept various payment methods as indicated on our website. By providing payment information, you 
              represent and warrant that you have the legal right to use the payment method you provide.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">4. SHIPPING AND DELIVERY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We ship to the addresses provided by you during the checkout process. Please ensure that your shipping 
              address is accurate and complete. We are not responsible for orders that are delayed or not delivered 
              due to incorrect shipping information.
            </p>
            
            <p>
              Delivery times are estimates and not guaranteed. Factors outside our control, such as customs processing, 
              postal delays, or natural disasters, may affect delivery times.
            </p>
            
            <p>
              For more information about shipping methods, costs, and delivery times, please see our 
              <Link href="/shipping" className="text-gold hover:underline"> Shipping Information</Link> page.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">5. RETURNS AND REFUNDS</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We want you to be satisfied with your purchase. If you are not completely satisfied, you may return 
              eligible items within 30 days of delivery for a refund or exchange, subject to our return policy.
            </p>
            
            <p>
              For detailed information about returns, exchanges, and refunds, please see our 
              <Link href="/shipping" className="text-gold hover:underline"> Returns and Refunds</Link> policy.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">6. INTELLECTUAL PROPERTY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              All content on our website, including but not limited to text, graphics, logos, images, audio clips, 
              digital downloads, data compilations, and software, is the property of Exousia or its content suppliers 
              and is protected by international copyright laws.
            </p>
            
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without our 
              prior written consent.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">7. USER CONDUCT</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              When using our services, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Use our services to distribute unsolicited commercial messages</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to our services or systems</li>
              <li>Engage in any activity that could damage, disable, or impair our services</li>
              <li>Use any automated means to access our services without our permission</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">8. DISCLAIMER OF WARRANTIES</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              OUR SERVICES AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            
            <p>
              WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, 
              OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">9. LIMITATION OF LIABILITY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, EXOUSIA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
              OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES</li>
              <li>ANY CONTENT OBTAINED FROM OUR SERVICES</li>
              <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            </ul>
            
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO US 
              FOR THE PRODUCTS OR SERVICES GIVING RISE TO THE CLAIM.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">10. INDEMNIFICATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              You agree to defend, indemnify, and hold harmless Exousia, its officers, directors, employees, and agents, 
              from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, 
              reasonable legal and accounting fees, arising out of or in any way connected with your access to or use 
              of our services, or your violation of these Terms.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">11. GOVERNING LAW</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law provisions. You agree to submit to the personal and exclusive 
              jurisdiction of the courts located within Los Angeles County, California.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">12. TERMINATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We may terminate or suspend your access to our services immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            
            <p>
              Upon termination, your right to use our services will immediately cease. All provisions of these Terms 
              which by their nature should survive termination shall survive, including, without limitation, ownership 
              provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">13. CONTACT INFORMATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <p className="mb-2"><strong>Exousia</strong></p>
              <p className="mb-2">123 Kingdom Street</p>
              <p className="mb-2">Los Angeles, CA 90001</p>
              <p className="mb-2">United States</p>
              <p className="mb-2">Email: legal@exousia.com</p>
              <p>Phone: +1 (888) EXOUSIA</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "Let what you say be simply 'Yes' or 'No'; anything more than this comes from evil."
        </p>
        <p className="text-cream/50 mt-2">Matthew 5:37</p>
      </div>
    </main>
  );
} 