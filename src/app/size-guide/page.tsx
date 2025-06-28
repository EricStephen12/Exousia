"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState<'hoodies' | 't-shirts' | 'bottoms'>('hoodies');

  return (
    <main className="min-h-screen bg-black text-cream pt-24 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-20 bg-gradient-radial from-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-radial from-gold/20 to-transparent" />
      
      {/* Scripture overlay */}
      <div className="absolute left-10 top-1/4 text-gold/10 text-[120px] font-italiana leading-none hidden lg:block">
        1 Samuel<br/>16:7
      </div>

      {/* Page header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-clash-display mb-4 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SIZE <span className="text-gold">GUIDE</span>
        </motion.h1>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px bg-gold flex-grow max-w-[100px]"></div>
          <h2 className="text-gold font-italiana text-3xl px-4">Find Your Perfect Fit</h2>
          <div className="h-px bg-gold flex-grow"></div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-cream/80 text-lg">
            At Exousia, we believe in clothing that fits both your body and your spirit. 
            Use our size guide to find the perfect fit for your kingdom-class garments. 
            All measurements are in inches.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex border-b border-gold/30">
            <button 
              onClick={() => setActiveCategory('hoodies')}
              className={`px-6 py-3 font-clash-display tracking-wide ${
                activeCategory === 'hoodies' ? 'border-b-2 border-gold text-gold' : 'text-cream/70 hover:text-cream'
              }`}
            >
              HOODIES
            </button>
            <button 
              onClick={() => setActiveCategory('t-shirts')}
              className={`px-6 py-3 font-clash-display tracking-wide ${
                activeCategory === 't-shirts' ? 'border-b-2 border-gold text-gold' : 'text-cream/70 hover:text-cream'
              }`}
            >
              T-SHIRTS
            </button>
            <button 
              onClick={() => setActiveCategory('bottoms')}
              className={`px-6 py-3 font-clash-display tracking-wide ${
                activeCategory === 'bottoms' ? 'border-b-2 border-gold text-gold' : 'text-cream/70 hover:text-cream'
              }`}
            >
              BOTTOMS
            </button>
          </div>
        </motion.div>

        {/* Size Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Hoodies Size Chart */}
          {activeCategory === 'hoodies' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-clash-display mb-4 text-gold">HOODIE MEASUREMENTS</h3>
                <p className="text-cream/80 mb-6">
                  Our hoodies are designed with a slightly oversized fit for comfort while maintaining a clean silhouette. 
                  For a more fitted look, we recommend sizing down.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gold/30">
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Size</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Chest</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Length</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Sleeve</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XS</td>
                        <td className="py-3 px-4">38</td>
                        <td className="py-3 px-4">27</td>
                        <td className="py-3 px-4">24</td>
                        <td className="py-3 px-4">17</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">S</td>
                        <td className="py-3 px-4">40</td>
                        <td className="py-3 px-4">28</td>
                        <td className="py-3 px-4">25</td>
                        <td className="py-3 px-4">18</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">M</td>
                        <td className="py-3 px-4">42</td>
                        <td className="py-3 px-4">29</td>
                        <td className="py-3 px-4">26</td>
                        <td className="py-3 px-4">19</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">L</td>
                        <td className="py-3 px-4">44</td>
                        <td className="py-3 px-4">30</td>
                        <td className="py-3 px-4">27</td>
                        <td className="py-3 px-4">20</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XL</td>
                        <td className="py-3 px-4">46</td>
                        <td className="py-3 px-4">31</td>
                        <td className="py-3 px-4">28</td>
                        <td className="py-3 px-4">21</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">2XL</td>
                        <td className="py-3 px-4">48</td>
                        <td className="py-3 px-4">32</td>
                        <td className="py-3 px-4">29</td>
                        <td className="py-3 px-4">22</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">3XL</td>
                        <td className="py-3 px-4">50</td>
                        <td className="py-3 px-4">33</td>
                        <td className="py-3 px-4">30</td>
                        <td className="py-3 px-4">23</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm mb-8">
                <h4 className="text-xl font-clash-display mb-4 text-gold">How to Measure</h4>
                <ul className="list-disc pl-6 space-y-2 text-cream/80">
                  <li><span className="font-semibold">Chest:</span> Measure around the fullest part of your chest, keeping the measuring tape horizontal.</li>
                  <li><span className="font-semibold">Length:</span> Measure from the highest point of the shoulder to the bottom hem.</li>
                  <li><span className="font-semibold">Sleeve:</span> Measure from the shoulder seam to the end of the sleeve.</li>
                  <li><span className="font-semibold">Shoulder:</span> Measure from one shoulder seam to the other.</li>
                </ul>
              </div>
            </div>
          )}

          {/* T-Shirts Size Chart */}
          {activeCategory === 't-shirts' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-clash-display mb-4 text-gold">T-SHIRT MEASUREMENTS</h3>
                <p className="text-cream/80 mb-6">
                  Our t-shirts feature a relaxed fit that's comfortable without being baggy. 
                  The premium fabric drapes well on all body types.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gold/30">
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Size</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Chest</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Length</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Sleeve</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XS</td>
                        <td className="py-3 px-4">36</td>
                        <td className="py-3 px-4">26</td>
                        <td className="py-3 px-4">7</td>
                        <td className="py-3 px-4">16</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">S</td>
                        <td className="py-3 px-4">38</td>
                        <td className="py-3 px-4">27</td>
                        <td className="py-3 px-4">7.5</td>
                        <td className="py-3 px-4">17</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">M</td>
                        <td className="py-3 px-4">40</td>
                        <td className="py-3 px-4">28</td>
                        <td className="py-3 px-4">8</td>
                        <td className="py-3 px-4">18</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">L</td>
                        <td className="py-3 px-4">42</td>
                        <td className="py-3 px-4">29</td>
                        <td className="py-3 px-4">8.5</td>
                        <td className="py-3 px-4">19</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XL</td>
                        <td className="py-3 px-4">44</td>
                        <td className="py-3 px-4">30</td>
                        <td className="py-3 px-4">9</td>
                        <td className="py-3 px-4">20</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">2XL</td>
                        <td className="py-3 px-4">46</td>
                        <td className="py-3 px-4">31</td>
                        <td className="py-3 px-4">9.5</td>
                        <td className="py-3 px-4">21</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">3XL</td>
                        <td className="py-3 px-4">48</td>
                        <td className="py-3 px-4">32</td>
                        <td className="py-3 px-4">10</td>
                        <td className="py-3 px-4">22</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm mb-8">
                <h4 className="text-xl font-clash-display mb-4 text-gold">Fabric & Care</h4>
                <p className="text-cream/80 mb-4">
                  Our t-shirts are crafted from premium 100% combed cotton (180 GSM) for exceptional comfort and durability.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-cream/80">
                  <li>Machine wash cold with similar colors</li>
                  <li>Wash inside out to preserve print quality</li>
                  <li>Tumble dry low or hang dry</li>
                  <li>Do not iron directly on print</li>
                  <li>Do not bleach</li>
                </ul>
              </div>
            </div>
          )}

          {/* Bottoms Size Chart */}
          {activeCategory === 'bottoms' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-clash-display mb-4 text-gold">BOTTOMS MEASUREMENTS</h3>
                <p className="text-cream/80 mb-6">
                  Our joggers and sweatpants feature a contemporary fit with tapered legs and an elastic waistband with drawstring.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gold/30">
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Size</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Waist</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Hip</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Inseam</th>
                        <th className="py-3 px-4 text-left font-clash-display text-gold/80">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XS</td>
                        <td className="py-3 px-4">28-30</td>
                        <td className="py-3 px-4">36</td>
                        <td className="py-3 px-4">29</td>
                        <td className="py-3 px-4">39</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">S</td>
                        <td className="py-3 px-4">30-32</td>
                        <td className="py-3 px-4">38</td>
                        <td className="py-3 px-4">30</td>
                        <td className="py-3 px-4">40</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">M</td>
                        <td className="py-3 px-4">32-34</td>
                        <td className="py-3 px-4">40</td>
                        <td className="py-3 px-4">31</td>
                        <td className="py-3 px-4">41</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">L</td>
                        <td className="py-3 px-4">34-36</td>
                        <td className="py-3 px-4">42</td>
                        <td className="py-3 px-4">32</td>
                        <td className="py-3 px-4">42</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">XL</td>
                        <td className="py-3 px-4">36-38</td>
                        <td className="py-3 px-4">44</td>
                        <td className="py-3 px-4">33</td>
                        <td className="py-3 px-4">43</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">2XL</td>
                        <td className="py-3 px-4">38-40</td>
                        <td className="py-3 px-4">46</td>
                        <td className="py-3 px-4">34</td>
                        <td className="py-3 px-4">44</td>
                      </tr>
                      <tr className="border-b border-gold/10">
                        <td className="py-3 px-4 font-semibold">3XL</td>
                        <td className="py-3 px-4">40-42</td>
                        <td className="py-3 px-4">48</td>
                        <td className="py-3 px-4">35</td>
                        <td className="py-3 px-4">45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm mb-8">
                <h4 className="text-xl font-clash-display mb-4 text-gold">How to Measure</h4>
                <ul className="list-disc pl-6 space-y-2 text-cream/80">
                  <li><span className="font-semibold">Waist:</span> Measure around your natural waistline, keeping the tape comfortably loose.</li>
                  <li><span className="font-semibold">Hip:</span> Measure around the fullest part of your hips.</li>
                  <li><span className="font-semibold">Inseam:</span> Measure from the crotch seam to the bottom of the leg.</li>
                  <li><span className="font-semibold">Length:</span> Measure from the top of the waistband to the bottom hem.</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* General Sizing Info */}
          <div className="bg-black/40 border border-gold/30 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-clash-display mb-4 text-gold">Sizing Tips</h3>
            <ul className="list-disc pl-6 space-y-2 text-cream/80">
              <li>If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a more fitted look.</li>
              <li>Our garments are pre-shrunk, but may shrink slightly after washing. Follow care instructions to maintain size and shape.</li>
              <li>For the most accurate fit, take your measurements and compare them to our size charts.</li>
              <li>If you have any questions about sizing, please <Link href="/contact" className="text-gold hover:underline">contact us</Link> for assistance.</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Scripture footer */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <p className="font-italiana text-gold text-xl">
          "For the LORD sees not as man sees: man looks on the outward appearance, but the LORD looks on the heart."
        </p>
        <p className="text-cream/50 mt-2">1 Samuel 16:7</p>
      </div>
    </main>
  );
} 