"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCartStore } from "@/lib/store/cartStore";

// Mock cart data
const cartItems = [
  {
    id: "1",
    name: "Armor of God Tee",
    price: 45,
    quantity: 1,
    size: "M",
    image: ""
  },
  {
    id: "2",
    name: "Refined by Fire Hoodie",
    price: 89,
    quantity: 1,
    size: "L",
    image: ""
  }
];

export default function CheckoutPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const cartItems = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: ""
  });
  
  const [step, setStep] = useState<"shipping" | "payment">("shipping");

  // Pre-fill form if user is signed in
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      }));
    }
  }, [isSignedIn, user]);

  // Calculate totals
  const subtotal = getTotalPrice();
  
  // Apply 10% discount for logged-in users with more than one product
  const isEligibleForDiscount = isSignedIn && cartItems.length > 1;
  const discount = isEligibleForDiscount ? subtotal * 0.1 : 0;
  
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = discountedSubtotal + shipping;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === "shipping") {
      setStep("payment");
    } else {
      // In a real app, this would process payment and create order
      console.log("Processing payment and creating order...");
    }
  };

  // Render authentication section
  const renderAuthSection = () => {
    if (isSignedIn) {
      return (
        <div className="mb-6 p-4 border border-gold/20 bg-black/30">
          <p className="text-cream">Signed in as {user?.primaryEmailAddress?.emailAddress}</p>
          {isEligibleForDiscount && (
            <p className="text-gold mt-2">10% discount applied for logged-in customers!</p>
          )}
        </div>
      );
    } else {
      return (
        <div className="mb-6 p-4 border border-gold/20 bg-black/30">
          <p className="text-cream mb-2">Already have an account?</p>
          <p className="text-gold/80 mb-3 text-sm">Sign in to receive a 10% discount when purchasing multiple items!</p>
          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={() => router.push('/auth/sign-in?redirect=/shop/checkout')}
              className="px-4 py-2 border border-gold text-gold hover:bg-gold/10"
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => router.push('/auth/sign-up?redirect=/shop/checkout')}
              className="px-4 py-2 bg-gold text-black hover:bg-gold/90"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-clash-display text-cream mb-8">CHECKOUT</h1>
        
        {/* Checkout Steps */}
        <div className="flex mb-8 border-b border-gold/20 pb-4">
          <div 
            className={`flex-1 text-center pb-2 ${
              step === "shipping" ? "border-b-2 border-gold" : ""
            }`}
          >
            <span className={step === "shipping" ? "text-gold" : "text-cream/50"}>
              1. Shipping
            </span>
          </div>
          <div 
            className={`flex-1 text-center pb-2 ${
              step === "payment" ? "border-b-2 border-gold" : ""
            }`}
          >
            <span className={step === "payment" ? "text-gold" : "text-cream/50"}>
              2. Payment
            </span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="lg:w-2/3">
            {/* Authentication Section */}
            {renderAuthSection()}
            
            {step === "shipping" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-clash-display text-gold mb-4">CONTACT INFORMATION</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-cream mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div>
                  <h2 className="text-xl font-clash-display text-gold mb-4">SHIPPING ADDRESS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-cream mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-cream mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-cream mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-cream mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-cream mb-1">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-cream mb-1">ZIP/Postal Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-cream mb-1">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-cream mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Continue to Payment Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-gold text-black py-3 font-semibold hover:glow-effect transition-all duration-300"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-clash-display text-gold mb-4">PAYMENT INFORMATION</h2>
                <p className="text-cream">This would be integrated with Stripe in a real implementation.</p>
                
                {/* Mock Payment Form */}
                <div className="space-y-4 border border-gold/20 p-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-cream mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-cream mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-cream mb-1">CVC</label>
                      <input
                        type="text"
                        id="cvc"
                        placeholder="123"
                        className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <div className="pt-4 flex flex-col space-y-4">
                  <button 
                    type="button"
                    className="w-full bg-gold text-black py-3 font-semibold hover:glow-effect transition-all duration-300"
                  >
                    PLACE ORDER
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="text-cream underline"
                  >
                    Return to shipping
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right: Order Summary */}
          <div className="lg:w-1/3 bg-black/30 border border-gold/20 p-6 h-fit">
            <h2 className="text-xl font-clash-display text-gold mb-4">ORDER SUMMARY</h2>
            
            {/* Cart Items */}
            <div className="divide-y divide-gold/10 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="py-3 flex justify-between">
                  <div>
                    <p className="text-cream">{item.name} <span className="text-cream/70">({item.size})</span></p>
                    <p className="text-cream/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gold">${item.price}</p>
                </div>
              ))}
            </div>
            
            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-cream">Subtotal</span>
                <span className="text-cream">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Show discount if applicable */}
              {isEligibleForDiscount && (
                <div className="flex justify-between text-gold">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-cream">Shipping</span>
                <span className="text-cream">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="h-px bg-gold/20 my-2"></div>
              
              <div className="flex justify-between font-semibold">
                <span className="text-cream">Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Return to Cart */}
            <Link 
              href="/shop/collections" 
              className="text-cream underline block text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 