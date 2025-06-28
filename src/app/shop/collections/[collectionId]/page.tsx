import { Suspense } from "react";
import CollectionDetailClient from "./CollectionDetailClient";

export default function CollectionDetailPage({ params }: { params: { collectionId: string } }) {
  return (
    <Suspense fallback={<CollectionDetailLoading />}>
      <CollectionDetailClient collectionId={params.collectionId} />
    </Suspense>
  );
}

function CollectionDetailLoading() {
  return (
    <>
      {/* Hero Banner */}
      <section className="h-[50vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-10 bg-gold/20 w-64 mx-auto rounded mb-4"></div>
            <div className="h-4 bg-cream/20 w-48 mx-auto rounded"></div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-cream mt-4">Loading collection products...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 