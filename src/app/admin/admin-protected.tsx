'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import SortOptions from "@/components/product/SortOptions";
import { mockProducts, mockCollections, categories, scriptureBooks, Product, Collection } from "@/lib/store/mockData";
import ProductModal from "@/components/admin/ProductModal";
import ProductDetails from "@/components/admin/ProductDetails";
import CollectionModal from "@/components/admin/CollectionModal";
import CollectionDetails from "@/components/admin/CollectionDetails";
import Link from "next/link";

type TabType = "dashboard" | "products" | "orders" | "customers" | "collections";

// List of admin emails that have access to the admin panel
const ADMIN_EMAILS = [
  'deamirclothingstores@gmail.com',
  // Add more admin emails as needed
];

export default function AdminProtectedPage() {
  const { isLoaded, userId, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Existing admin page state
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 200] as [number, number],
    scriptureBooks: [] as string[]
  });
  const [sortOption, setSortOption] = useState<"newest" | "price-low" | "price-high" | "name-asc" | "name-desc">("newest");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [currentCollection, setCurrentCollection] = useState<Collection | undefined>(undefined);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoaded) return;
      
      if (!isSignedIn) {
        // Redirect to sign-in if not signed in
        router.push('/sign-in?redirect_url=' + encodeURIComponent('/admin'));
        return;
      }

      try {
        // Get the user's email from Clerk
        const response = await fetch('/api/admin/check-admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`
          }
        });
        
        if (response.ok) {
          setIsAdmin(true);
        } else {
          // Redirect to home if not admin
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [isLoaded, isSignedIn, router, getToken]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-cream text-lg">Loading admin panel...</div>
      </div>
    );
  }

  // If not admin, the useEffect will handle the redirect
  if (!isAdmin) {
    return null;
  }

  // Rest of your admin page component...
  return (
    <div className="min-h-screen bg-black text-cream">
      <header className="bg-black border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-clash-display text-gold">Admin Dashboard</h1>
            <nav className="flex space-x-8">
              {(['dashboard', 'products', 'orders', 'customers', 'collections'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-gold text-gold'
                      : 'border-transparent text-cream hover:text-gold/80 hover:border-gold/50'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gold/20">
                <h3 className="text-lg font-medium text-gold mb-2">Total Products</h3>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gold/20">
                <h3 className="text-lg font-medium text-gold mb-2">Total Collections</h3>
                <p className="text-3xl font-bold">{collections.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gold/20">
                <h3 className="text-lg font-medium text-gold mb-2">Total Orders</h3>
                <p className="text-3xl font-bold">24</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gold/20">
                <h3 className="text-lg font-medium text-gold mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <div>
                        <p className="font-medium">Order #EXO-1234{i}</p>
                        <p className="text-sm text-gray-400">2 items • $129.99</p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-gold/20 text-gold">
                        {i % 2 === 0 ? 'Shipped' : 'Processing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg border border-gold/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gold">Low Stock Items</h3>
                  <Link href="/admin/products" className="text-sm text-gold hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {products
                    .filter((p) => p.stock < 10)
                    .slice(0, 4)
                    .map((product) => (
                      <div key={product.id} className="flex items-center p-3 bg-gray-800 rounded">
                        <div className="w-12 h-12 bg-gray-700 rounded mr-4 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-400">
                            {product.stock} in stock • ${product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsProductDetailsOpen(true);
                          }}
                          className="text-sm text-gold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={() => {
                  setCurrentProduct(undefined);
                  setIsProductModalOpen(true);
                }}
                className="bg-gold text-black px-4 py-2 rounded-md hover:bg-gold/90 transition-colors"
              >
                Add Product
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg border border-gold/20 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                      <button
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsProductDetailsOpen(true);
                        }}
                        className="bg-gold text-black px-3 py-1 rounded text-sm hover:bg-gold/90"
                      >
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Collections</h2>
              <button
                onClick={() => {
                  setCurrentCollection(undefined);
                  setIsCollectionModalOpen(true);
                }}
                className="bg-gold text-black px-4 py-2 rounded-md hover:bg-gold/90 transition-colors"
              >
                Add Collection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <div key={collection.id} className="bg-gray-900 rounded-lg border border-gold/20 overflow-hidden group">
                  <div className="h-48 bg-gray-800 relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                      <button
                        onClick={() => {
                          setCurrentCollection(collection);
                          setIsCollectionDetailsOpen(true);
                        }}
                        className="bg-gold text-black px-3 py-1 rounded text-sm hover:bg-gold/90"
                      >
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{collection.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {collection.products.length} products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add other tabs content (orders, customers) as needed */}
        
        {/* Modals */}
        {isProductModalOpen && (
          <ProductModal
            product={currentProduct}
            onClose={() => setIsProductModalOpen(false)}
            onSave={(product) => {
              if (currentProduct) {
                // Update existing product
                setProducts(products.map(p => p.id === product.id ? product : p));
              } else {
                // Add new product
                setProducts([...products, { ...product, id: `prod_${Date.now()}` }]);
              }
              setIsProductModalOpen(false);
            }}
          />
        )}

        {isProductDetailsOpen && currentProduct && (
          <ProductDetails
            product={currentProduct}
            onClose={() => setIsProductDetailsOpen(false)}
            onSave={(product) => {
              setProducts(products.map(p => p.id === product.id ? product : p));
              setIsProductDetailsOpen(false);
            }}
          />
        )}

        {isCollectionModalOpen && (
          <CollectionModal
            collection={currentCollection}
            onClose={() => setIsCollectionModalOpen(false)}
            onSave={(collection) => {
              if (currentCollection) {
                // Update existing collection
                setCollections(collections.map(c => c.id === collection.id ? collection : c));
              } else {
                // Add new collection
                setCollections([...collections, { ...collection, id: `coll_${Date.now()}`, products: [] }]);
              }
              setIsCollectionModalOpen(false);
            }}
          />
        )}

        {isCollectionDetailsOpen && currentCollection && (
          <CollectionDetails
            collection={currentCollection}
            products={products}
            onClose={() => setIsCollectionDetailsOpen(false)}
            onSave={(collection) => {
              setCollections(collections.map(c => c.id === collection.id ? collection : c));
              setIsCollectionDetailsOpen(false);
            }}
          />
        )}
      </main>
    </div>
  );
}
