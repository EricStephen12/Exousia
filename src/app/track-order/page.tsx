"use client";

import { useState } from "react";

// Mock order data
const mockOrder = {
  orderNumber: "EXO-12345",
  date: "2023-05-15",
  status: "shipped",
  trackingNumber: "1Z999AA10123456784",
  carrier: "UPS",
  items: [
    {
      id: "1",
      name: "Armor of God Tee",
      quantity: 1,
      size: "M",
    },
    {
      id: "2",
      name: "Refined by Fire Hoodie",
      quantity: 1,
      size: "L",
    }
  ],
  shippingAddress: {
    name: "John Doe",
    street: "123 Faith Street",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "United States"
  },
  timeline: [
    { date: "2023-05-15", status: "Order Placed", description: "Your order has been received and is being processed." },
    { date: "2023-05-16", status: "Payment Confirmed", description: "Your payment has been confirmed." },
    { date: "2023-05-17", status: "Processing", description: "Your order is being prepared for shipment." },
    { date: "2023-05-18", status: "Shipped", description: "Your order has been shipped. Tracking information has been provided." },
  ]
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<typeof mockOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would be an API call to fetch the order
      if (orderNumber.trim() === "EXO-12345" && email.trim() !== "") {
        setOrder(mockOrder);
      } else {
        setError("No order found with the provided information. Please check and try again.");
        setOrder(null);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-clash-display text-cream mb-8">TRACK YOUR ORDER</h1>
        
        {/* Order Lookup Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-black/30 border border-gold/20 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block text-cream mb-1">Order Number</label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., EXO-12345"
                  required
                  className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-cream mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email used for your order"
                  required
                  className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gold text-black py-3 font-semibold ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:glow-effect"
                  } transition-all duration-300`}
                >
                  {isLoading ? "SEARCHING..." : "TRACK ORDER"}
                </button>
              </div>
              
              {/* Demo hint */}
              <p className="text-xs text-cream/50 text-center mt-4">
                For demo purposes, use order number: EXO-12345
              </p>
            </form>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 text-red-300">
              {error}
            </div>
          )}
        </div>
        
        {/* Order Details */}
        {order && (
          <div className="max-w-4xl mx-auto">
            {/* Order Header */}
            <div className="bg-gold/10 border border-gold/30 p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-clash-display text-cream">Order #{order.orderNumber}</h2>
                  <p className="text-cream/70">Placed on {order.date}</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "delivered" ? "bg-green-900/20 text-green-400" :
                    order.status === "shipped" ? "bg-blue-900/20 text-blue-400" :
                    "bg-yellow-900/20 text-yellow-400"
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Order Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-clash-display text-gold mb-4">ORDER TIMELINE</h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-0 bottom-0 left-6 w-px bg-gold/30"></div>
                
                {/* Timeline Events */}
                <div className="space-y-6">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex">
                      <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${
                        index === order.timeline.length - 1 ? "bg-gold text-black" : "border border-gold/30 bg-black"
                      }`}>
                        {index === order.timeline.length - 1 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gold"></div>
                        )}
                      </div>
                      
                      <div className="ml-4 pb-6">
                        <p className="text-gold">{event.status}</p>
                        <p className="text-cream/70 text-sm">{event.date}</p>
                        <p className="text-cream mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tracking Information */}
            {order.status === "shipped" && (
              <div className="bg-black/30 border border-gold/20 p-6 mb-8">
                <h3 className="text-xl font-clash-display text-gold mb-4">TRACKING INFORMATION</h3>
                
                <div className="space-y-2">
                  <p className="text-cream">
                    <span className="text-cream/70">Carrier:</span> {order.carrier}
                  </p>
                  <p className="text-cream">
                    <span className="text-cream/70">Tracking Number:</span> {order.trackingNumber}
                  </p>
                  <div className="mt-4">
                    <a 
                      href="#" 
                      className="inline-block bg-gold text-black px-4 py-2 text-sm font-semibold hover:glow-effect transition-all duration-300"
                    >
                      TRACK WITH CARRIER
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Items */}
              <div className="bg-black/30 border border-gold/20 p-6">
                <h3 className="text-xl font-clash-display text-gold mb-4">ORDER ITEMS</h3>
                
                <div className="divide-y divide-gold/10">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3">
                      <div className="flex justify-between">
                        <p className="text-cream">{item.name}</p>
                        <p className="text-cream/70">x{item.quantity}</p>
                      </div>
                      <p className="text-cream/50 text-sm">Size: {item.size}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-black/30 border border-gold/20 p-6">
                <h3 className="text-xl font-clash-display text-gold mb-4">SHIPPING ADDRESS</h3>
                
                <address className="not-italic text-cream/70">
                  <p className="text-cream">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </address>
              </div>
            </div>
            
            {/* Need Help */}
            <div className="mt-12 text-center">
              <p className="text-cream mb-4">Need help with your order?</p>
              <a 
                href="/contact" 
                className="inline-block border border-gold text-gold px-6 py-2 hover:bg-gold hover:text-black transition-colors"
              >
                CONTACT US
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 