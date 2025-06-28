import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}

function ProductsLoading() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="h-[50vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-clash-display tracking-wider">ALL PRODUCTS</h1>
            <p className="text-cream italic font-satoshi mt-4">Wear your faith. Live your purpose.</p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-cream mt-4">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 