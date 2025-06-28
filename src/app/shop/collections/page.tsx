import { Suspense } from "react";
import CollectionsClient from "./CollectionsClient";

export default function CollectionsPage() {
  return (
    <Suspense fallback={<CollectionsLoading />}>
      <CollectionsClient />
    </Suspense>
  );
}

function CollectionsLoading() {
  return (
    <>
      {/* Hero Banner */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 to-black"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-clash-display tracking-wider text-gold">COLLECTIONS</h1>
            <p className="text-xl md:text-2xl font-italiana text-gold mt-4">Curated pieces for every believer</p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-cream mt-4">Loading collections...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 