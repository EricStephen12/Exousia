"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent" />
      
      {/* Scripture overlay */}
      <div className="absolute left-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block">
        Proverbs<br/>16:24
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider">
          CONTACT <span className="text-gold">US</span>
        </h1>
        <div className="flex items-center">
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Let's Connect</h2>
          <div className="h-px bg-gold flex-grow"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black/40 backdrop-blur-sm border border-gold/30 p-8">
            <h3 className="text-2xl font-clash-display mb-6 tracking-wide">SEND US A MESSAGE</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-gold text-5xl mb-4">✓</div>
                <h4 className="text-2xl font-clash-display mb-2">Message Received</h4>
                <p className="text-cream/70">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gold mb-2 font-satoshi">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/10 border border-gold/30 p-3 text-cream focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gold mb-2 font-satoshi">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/10 border border-gold/30 p-3 text-cream focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gold mb-2 font-satoshi">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-cream/10 border border-gold/30 p-3 text-cream focus:border-gold focus:outline-none"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gold mb-2 font-satoshi">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-cream/10 border border-gold/30 p-3 text-cream focus:border-gold focus:outline-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gold text-black p-4 font-clash-display tracking-wider hover:glow-effect transition-all ${
                    isSubmitting ? "opacity-70" : ""
                  }`}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-clash-display mb-4 tracking-wide">GET IN TOUCH</h3>
              <p className="text-cream/70 mb-6">
                We'd love to hear from you. Whether you have a question about our products, 
                need help with an order, or want to collaborate, our team is ready to assist you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-satoshi font-semibold">Phone</h4>
                    <p className="text-cream/70">+1 (888) EXOUSIA</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-satoshi font-semibold">Email</h4>
                    <p className="text-cream/70">contact@exousia.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-satoshi font-semibold">Address</h4>
                    <p className="text-cream/70">
                      123 Kingdom Street<br />
                      Los Angeles, CA 90001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hours */}
            <div>
              <h3 className="text-2xl font-clash-display mb-4 tracking-wide">HOURS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-cream/70">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">Saturday</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-clash-display mb-4 tracking-wide">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-cream hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-cream hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-cream hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-cream hover:text-gold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "Gracious words are like a honeycomb, sweetness to the soul and health to the body."
        </p>
        <p className="text-cream/50 mt-2">Proverbs 16:24</p>
      </div>
    </main>
  );
} 