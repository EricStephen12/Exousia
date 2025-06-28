import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return (
    <Suspense fallback={<ProductDetailLoading />}>
      <ProductDetailClient productId={params.productId} />
    </Suspense>
  );
}

function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Loading Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* Left 70% = Image Gallery */}
        <div className="w-full md:w-[70%] h-screen bg-black relative">
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Right 30% = Product Info */}
        <div className="w-full md:w-[30%] md:h-screen bg-black/95 backdrop-blur overflow-y-auto">
          <div className="p-8 animate-pulse">
            <div className="h-6 bg-gold/20 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gold/20 rounded w-1/4 mb-8"></div>
            
            <div className="h-8 bg-gold/20 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gold/20 rounded w-1/4 mb-8"></div>
            
            <div className="h-4 bg-gold/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-gold/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-gold/20 rounded w-3/4 mb-8"></div>
            
            <div className="h-4 bg-gold/20 rounded w-1/4 mb-4"></div>
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 bg-gold/20 rounded"></div>
              ))}
            </div>
            
            <div className="h-4 bg-gold/20 rounded w-1/4 mb-4"></div>
            <div className="flex gap-2 mb-8">
              {[1, 2].map((i) => (
                <div key={i} className="w-8 h-8 bg-gold/20 rounded-full"></div>
              ))}
            </div>
            
            <div className="h-12 bg-gold/20 rounded w-full mt-8"></div>
          </div>
        </div>
      </section>
    </div>
  );
} 