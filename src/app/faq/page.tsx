"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What does Exousia mean?",
    answer: "Exousia is a Greek word that appears in the Bible, meaning 'authority' or 'power.' It represents the divine authority given to believers through Christ, as referenced in Luke 10:19: 'Behold, I have given you authority to tread on serpents and scorpions, and over all the power of the enemy, and nothing shall hurt you.'"
  },
  {
    id: 2,
    question: "What is the inspiration behind your designs?",
    answer: "Our designs are inspired by the powerful intersection of scripture and contemporary streetwear culture. We blend the dramatic visual language of anime with the poetic depth of scripture, creating pieces that serve as both fashion statements and declarations of faith. Each design undergoes a process of prayer and creative development to ensure it carries both aesthetic appeal and spiritual significance."
  },
  {
    id: 3,
    question: "How do I care for my Exousia garments?",
    answer: "We recommend washing your Exousia garments inside out in cold water and hanging to dry to preserve the print quality and fabric integrity. For detailed care instructions specific to each item, please refer to the care label on your garment or the product description on our website."
  },
  {
    id: 4,
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping times typically range from 7-14 business days depending on your location. Please note that customers are responsible for any customs fees or import duties that may apply in your country."
  },
  {
    id: 5,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are processed within 5-7 business days of receipt. For exchanges due to sizing issues, we cover the shipping for the replacement item. Please visit our Returns page for detailed instructions on how to initiate a return."
  },
  {
    id: 6,
    question: "Are your products ethically made?",
    answer: "Absolutely. We believe in stewardship of both creation and human dignity. All Exousia products are ethically manufactured using sustainable practices. We work exclusively with suppliers who provide fair wages and safe working conditions, and we use eco-friendly materials whenever possible."
  },
  {
    id: 7,
    question: "Do you offer wholesale opportunities?",
    answer: "Yes, we do offer wholesale opportunities for select retailers who align with our vision and values. If you're interested in carrying Exousia in your store, please contact us at wholesale@exousia.com with information about your business."
  },
  {
    id: 8,
    question: "How often do you release new collections?",
    answer: "We typically release 3-4 major collections per year, with occasional limited drops throughout the year. Each collection is centered around specific scriptures and themes. Sign up for our newsletter to be the first to know about upcoming releases."
  },
  {
    id: 9,
    question: "What sizes do you offer?",
    answer: "We offer sizes ranging from XS to 3XL in most styles. We believe in inclusive sizing and are continuously working to expand our size range. Each product page includes detailed sizing information and measurements to help you find your perfect fit."
  },
  {
    id: 10,
    question: "How can I collaborate with Exousia?",
    answer: "We're always open to collaborations with artists, ministries, and organizations that share our vision. If you're interested in collaborating, please reach out to us at collaborations@exousia.com with your proposal and portfolio."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
        Luke<br/>10:19
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          FREQUENTLY ASKED
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Questions</h2>
          <div className="h-px bg-gold flex-grow"></div>
        </motion.div>
      </div>

      {/* FAQ content */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {faqData.map((faq, index) => (
          <motion.div 
            key={faq.id}
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left p-6 flex justify-between items-center border ${
                activeIndex === index ? "border-gold bg-black/80" : "border-gold/30 hover:border-gold/50"
              } transition-all duration-300`}
            >
              <span className="text-xl font-clash-display tracking-wide">{faq.question}</span>
              <span className="text-gold text-2xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            
            {activeIndex === index && (
              <motion.div 
                className="p-6 border-l border-r border-b border-gold/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-cream/80 font-satoshi">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact section */}
      <div className="container mx-auto px-4 mt-16 relative z-10">
        <div className="border border-gold/30 p-8 text-center max-w-2xl mx-auto bg-black/40 backdrop-blur-sm">
          <h3 className="text-2xl font-clash-display mb-4">Still have questions?</h3>
          <p className="text-cream/70 mb-6">
            We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-gold text-black px-8 py-3 font-clash-display tracking-wider hover:glow-effect transition-all duration-300"
          >
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you."
        </p>
        <p className="text-cream/50 mt-2">Matthew 7:7</p>
      </div>
    </main>
  );
} 