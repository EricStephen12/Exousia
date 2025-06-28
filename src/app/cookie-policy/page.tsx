"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent" />
      
      {/* Scripture overlay */}
      <div className="absolute right-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block">
        Psalm<br/>119:105
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          COOKIE <span className="text-gold">POLICY</span>
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Digital Footprints</h2>
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
            This Cookie Policy explains how Exousia ("we", "our", or "us") uses cookies and similar technologies 
            to recognize you when you visit our website. It explains what these technologies are and why we use them, 
            as well as your rights to control our use of them.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">1. WHAT ARE COOKIES?</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
              Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
              as well as to provide reporting information.
            </p>
            
            <p>
              Cookies set by the website owner (in this case, Exousia) are called "first-party cookies". 
              Cookies set by parties other than the website owner are called "third-party cookies". 
              Third-party cookies enable third-party features or functionality to be provided on or through the website 
              (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies 
              can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">2. WHY DO WE USE COOKIES?</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons 
              in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. 
              Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. 
              Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>
            
            <p>
              The specific types of first and third-party cookies served through our website and the purposes they perform 
              are described below:
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">3. TYPES OF COOKIES WE USE</h2>
          
          <div className="space-y-8 text-cream/80">
            <div>
              <h3 className="text-xl font-clash-display mb-2 text-gold/90">Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, 
                such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them 
                without impacting how our website functions.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Authentication cookies</li>
                <li>Security cookies</li>
                <li>Shopping cart cookies</li>
                <li>Load balancing cookies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-clash-display mb-2 text-gold/90">Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. 
                However, without these cookies, certain functionality may become unavailable.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Language preference cookies</li>
                <li>Customization cookies</li>
                <li>User interface customization cookies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-clash-display mb-2 text-gold/90">Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used 
                or how effective our marketing campaigns are, or to help us customize our website for you.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Google Analytics cookies</li>
                <li>Heatmap and session recording cookies</li>
                <li>A/B testing cookies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-clash-display mb-2 text-gold/90">Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad 
                from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting 
                advertisements that are based on your interests.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Behavioral advertising cookies</li>
                <li>Retargeting cookies</li>
                <li>Social media cookies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-clash-display mb-2 text-gold/90">Social Media Cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our website through third-party 
                social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Facebook cookies</li>
                <li>Instagram cookies</li>
                <li>Twitter cookies</li>
                <li>Pinterest cookies</li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">4. HOW CAN YOU CONTROL COOKIES?</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the 
              appropriate opt-out links provided below.
            </p>
            
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our 
              website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse 
              cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, 
              please visit <a href="http://www.aboutads.info/choices/" className="text-gold hover:underline">http://www.aboutads.info/choices/</a> or 
              <a href="http://www.youronlinechoices.com" className="text-gold hover:underline"> http://www.youronlinechoices.com</a>.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">5. DO WE UPDATE THIS POLICY?</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other 
              operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies 
              and related technologies.
            </p>
            
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-2xl font-clash-display mb-6 tracking-wide text-gold">6. WHERE CAN YOU GET MORE INFORMATION?</h2>
          
          <div className="space-y-6 text-cream/80">
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at:
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
          "Your word is a lamp to my feet and a light to my path."
        </p>
        <p className="text-cream/50 mt-2">Psalm 119:105</p>
      </div>
    </main>
  );
} 