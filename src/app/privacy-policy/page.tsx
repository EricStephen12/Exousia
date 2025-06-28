"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent" />
      
      {/* Scripture overlay */}
      <div className="absolute right-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block">
        Proverbs<br/>2:11
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PRIVACY <span className="text-gold">POLICY</span>
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Your Data Matters</h2>
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
            At Exousia ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our 
            website or make a purchase.
          </p>
          
          <p className="text-cream/80 mb-6">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please 
            do not access the site.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">1. INFORMATION WE COLLECT</h2>
          
          <div className="space-y-6 text-cream/80">
            <h3 className="text-xl font-clash-display mb-2">Personal Data</h3>
            <p>
              When you create an account, place an order, subscribe to our newsletter, or otherwise interact with our site, 
              we may collect personally identifiable information, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Payment information (we do not store complete credit card information)</li>
              <li>Order history</li>
            </ul>
            
            <h3 className="text-xl font-clash-display mb-2">Usage Data</h3>
            <p>
              We may also collect information about how you access and use our website, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed and time spent</li>
              <li>Products viewed or searched for</li>
              <li>Click patterns</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">2. HOW WE USE YOUR INFORMATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and product offerings</li>
              <li>Administer promotions, surveys, or contests</li>
              <li>Protect against fraudulent transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">3. SHARING YOUR INFORMATION</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Companies that help us operate our website, process payments, fulfill orders, and deliver products to you.</li>
              <li><strong>Business Partners:</strong> Trusted third parties who help us provide services to you.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
            
            <p>
              We do not sell your personal information to third parties for marketing purposes.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">4. COOKIES AND TRACKING TECHNOLOGIES</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              Cookies are files with small amounts of data that may include an anonymous unique identifier.
            </p>
            
            <p>
              We use cookies for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keeping track of items in your shopping cart</li>
              <li>Remembering your preferences</li>
              <li>Understanding how you use our website</li>
              <li>Improving your browsing experience</li>
              <li>Personalizing content and advertisements</li>
            </ul>
            
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our site.
            </p>
            
            <p>
              For more information about cookies, please see our <Link href="/cookie-policy" className="text-gold hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">5. DATA SECURITY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
            
            <p>
              We use industry-standard encryption technologies when transferring and receiving consumer data. 
              We have appropriate security measures in place in our physical facilities to protect against the loss, 
              misuse, or alteration of information that we have collected from you.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">6. YOUR RIGHTS</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">7. CHILDREN'S PRIVACY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has provided 
              us with personal information, please contact us, and we will delete such information from our systems.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">8. CHANGES TO THIS PRIVACY POLICY</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
              privacy policy on this page and updating the "Last Updated" date. You are advised to review this privacy 
              policy periodically for any changes.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">9. CONTACT US</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              If you have any questions about this privacy policy or our practices, please contact us at:
            </p>
            
            <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
              <p className="mb-2"><strong>Exousia</strong></p>
              <p className="mb-2">123 Kingdom Street</p>
              <p className="mb-2">Los Angeles, CA 90001</p>
              <p className="mb-2">United States</p>
              <p className="mb-2">Email: privacy@exousia.com</p>
              <p>Phone: +1 (888) EXOUSIA</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "Discretion will watch over you, understanding will guard you."
        </p>
        <p className="text-cream/50 mt-2">Proverbs 2:11</p>
      </div>
    </main>
  );
} 