'use client';

import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { mockCollections, categories, scriptureBooks, Product, Collection } from "@/lib/store/mockData";
import ProductModal from "@/components/admin/ProductModal";
import ProductDetails from "@/components/admin/ProductDetails";
import CollectionModal from "@/components/admin/CollectionModal";
import CollectionDetails from "@/components/admin/CollectionDetails";
import Link from "next/link";

type TabType = "dashboard" | "products" | "orders" | "customers" | "collections";

// Mock data for orders
const mockOrders = [
  {
    id: "1",
    orderNumber: "EXO-12345",
    customerName: "John Doe",
    email: "john@example.com",
    date: "2023-05-15",
    status: "shipped",
    total: 129.98,
    customer: "John Doe"
  },
  // Add more mock orders as needed
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [currentCollection, setCurrentCollection] = useState<Collection | undefined>(undefined);
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats for dashboard
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = new Set(orders.map(order => order.customer)).size;
  const totalCollections = collections.length;

  // Product CRUD functions
  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setIsProductModalOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsProductModalOpen(true);
  };
  
  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsProductDetailsOpen(true);
  };
  
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    setIsProductDetailsOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleSaveProduct = async (productData: Omit<Product, "id">) => {
    try {
    if (currentProduct) {
      // Update existing product
        const response = await fetch(`/api/products/${currentProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        });
        
        if (!response.ok) throw new Error('Failed to update product');
        
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === currentProduct.id 
            ? { ...p, ...productData } 
            : p
        )
      );
    } else {
      // Add new product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        });
        
        if (!response.ok) throw new Error('Failed to create product');
        
        const { id } = await response.json();
      const newProduct: Product = {
          id,
        ...productData
      };
        
      setProducts(prevProducts => [...prevProducts, newProduct]);
      }
      
      setIsProductModalOpen(false);
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  
  // Collection CRUD functions
  const handleAddCollection = () => {
    setCurrentCollection(undefined);
    setIsCollectionModalOpen(true);
  };
  
  const handleEditCollection = (collection: Collection) => {
    setCurrentCollection(collection);
    setIsCollectionModalOpen(true);
  };
  
  const handleViewCollection = (collection: Collection) => {
    setCurrentCollection(collection);
    setIsCollectionDetailsOpen(true);
  };
  
  const handleDeleteCollection = (collectionId: string) => {
    // Remove collection from products
    setProducts(prevProducts => 
      prevProducts.map(product => ({
        ...product,
        collectionIds: product.collectionIds.filter(id => id !== collectionId)
      }))
    );
    
    // Delete the collection
    setCollections(prevCollections => prevCollections.filter(c => c.id !== collectionId));
    setIsCollectionDetailsOpen(false);
  };
  
  const handleSaveCollection = (collectionData: Omit<Collection, "id">) => {
    if (currentCollection) {
      // Update existing collection
      setCollections(prevCollections => 
        prevCollections.map(c => 
          c.id === currentCollection.id 
            ? { ...c, ...collectionData } 
            : c
        )
      );
    } else {
      // Add new collection
      const newCollection: Collection = {
        id: `collection-${Date.now()}`,
        ...collectionData
      };
      setCollections(prevCollections => [...prevCollections, newCollection]);
    }
  };

  // Order management functions
  const openUpdateModal = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setIsUpdateModalOpen(true);
  };
  
  const updateOrderStatus = () => {
    if (!selectedOrder) return;
    
    // In a real app, this would update the order status in the database
    console.log(`Order ${selectedOrder.orderNumber} status updated to ${updatedStatus}`);
    setIsUpdateModalOpen(false);
  };
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-cream pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-clash-display tracking-wider mb-8">ADMIN DASHBOARD</h1>

        {/* Navigation Tabs */}
        <div className="border-b border-gold/30 mb-8">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 font-clash-display tracking-wide whitespace-nowrap ${
                activeTab === "dashboard" ? "border-b-2 border-gold text-gold" : "text-cream/70 hover:text-cream"
              }`}
            >
              DASHBOARD
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 font-clash-display tracking-wide whitespace-nowrap ${
                activeTab === "products" ? "border-b-2 border-gold text-gold" : "text-cream/70 hover:text-cream"
              }`}
            >
              PRODUCTS
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`px-6 py-3 font-clash-display tracking-wide whitespace-nowrap ${
                activeTab === "collections" ? "border-b-2 border-gold text-gold" : "text-cream/70 hover:text-cream"
              }`}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-clash-display tracking-wide whitespace-nowrap ${
                activeTab === "orders" ? "border-b-2 border-gold text-gold" : "text-cream/70 hover:text-cream"
              }`}
            >
              ORDERS
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-black/40 border border-gold/30 p-6">
                <h3 className="text-gold/70 font-satoshi mb-1">Total Revenue</h3>
                <p className="text-3xl font-clash-display">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-black/40 border border-gold/30 p-6">
                <h3 className="text-gold/70 font-satoshi mb-1">Orders</h3>
                <p className="text-3xl font-clash-display">{totalOrders}</p>
              </div>
              <div className="bg-black/40 border border-gold/30 p-6">
                <h3 className="text-gold/70 font-satoshi mb-1">Products</h3>
                <p className="text-3xl font-clash-display">{totalProducts}</p>
              </div>
              <div className="bg-black/40 border border-gold/30 p-6">
                <h3 className="text-gold/70 font-satoshi mb-1">Collections</h3>
                <p className="text-3xl font-clash-display">{totalCollections}</p>
              </div>
              <div className="bg-black/40 border border-gold/30 p-6">
                <h3 className="text-gold/70 font-satoshi mb-1">Customers</h3>
                <p className="text-3xl font-clash-display">{totalCustomers}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-clash-display">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-gold hover:underline font-satoshi"
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gold/30">
                      <th className="py-3 px-4 text-left font-clash-display text-gold/80">Order ID</th>
                      <th className="py-3 px-4 text-left font-clash-display text-gold/80">Customer</th>
                      <th className="py-3 px-4 text-left font-clash-display text-gold/80">Date</th>
                      <th className="py-3 px-4 text-left font-clash-display text-gold/80">Total</th>
                      <th className="py-3 px-4 text-left font-clash-display text-gold/80">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-gold/10 hover:bg-gold/5">
                        <td className="py-3 px-4">{order.orderNumber}</td>
                        <td className="py-3 px-4">{order.customerName}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'shipped' 
                              ? 'bg-green-900/30 text-green-400' 
                              : order.status === 'processing' 
                                ? 'bg-blue-900/30 text-blue-400' 
                                : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-clash-display">PRODUCTS</h2>
              <button
                onClick={handleAddProduct}
                className="bg-gold text-black px-4 py-2 font-clash-display tracking-wide hover:bg-gold/90"
              >
                ADD PRODUCT
              </button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-black/40 border border-gold/30 p-4 animate-pulse">
                    <div className="w-full h-48 bg-gold/10 mb-4"></div>
                    <div className="h-4 bg-gold/10 w-3/4 mb-2"></div>
                    <div className="h-4 bg-gold/10 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-cream/70 mb-4">No products found</p>
                <button
                  onClick={handleAddProduct}
                  className="bg-gold/20 text-gold px-4 py-2 hover:bg-gold/30"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-black/40 border border-gold/30 group cursor-pointer"
                      onClick={() => handleViewProduct(product)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gold/10 flex items-center justify-center">
                          <span className="text-gold/30">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(product);
                          }}
                          className="bg-gold text-black px-4 py-2 mr-2 hover:bg-gold/90"
                    >
                      Edit
                    </button>
                    <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id);
                          }}
                          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-clash-display text-lg mb-1 text-gold">{product.name}</h3>
                      <p className="text-cream/70">${product.price}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.images?.length > 0 && (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                            {product.images.length} Images
                          </span>
                        )}
                        {product.sizes?.length > 0 && (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                            {product.sizes.length} Sizes
                          </span>
                        )}
                        {product.colors?.length > 0 && (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                            {product.colors.length} Colors
                          </span>
                        )}
                      </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === "collections" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-clash-display">Collections</h2>
              <button
                onClick={handleAddCollection}
                className="bg-gold text-black px-4 py-2 rounded-md hover:bg-gold/90 transition-colors"
              >
                Add Collection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <div key={collection.id} className="bg-black/40 border border-gold/30 rounded-lg overflow-hidden group">
                  <div className="h-48 bg-gray-800 relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                      <button
                        onClick={() => handleViewCollection(collection)}
                        className="bg-gold text-black px-3 py-1 rounded text-sm hover:bg-gold/90"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditCollection(collection)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{collection.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {collection.products?.length || 0} products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-clash-display">Orders</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-black/40 border border-gold/30 text-cream rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/40 border border-gold/30 text-cream rounded-md px-3 py-2 pl-10 w-64 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <svg
                    className="w-5 h-5 text-gold/70 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Order #</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Customer</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Date</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Total</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Status</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gold/10 hover:bg-gold/5">
                      <td className="py-3 px-4">{order.orderNumber}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-400">{order.email}</div>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'shipped' 
                            ? 'bg-green-900/30 text-green-400' 
                            : order.status === 'processing' 
                              ? 'bg-blue-900/30 text-blue-400' 
                              : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openUpdateModal(order)}
                          className="text-gold hover:underline text-sm"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={currentProduct}
        onSave={handleSaveProduct}
        collections={collections}
      />

      {/* Product Details Modal */}
      {currentProduct && (
        <ProductDetails
          isOpen={isProductDetailsOpen}
          onClose={() => setIsProductDetailsOpen(false)}
          product={currentProduct}
          onDelete={handleDeleteProduct}
          onEdit={() => {
            setIsProductDetailsOpen(false);
            setTimeout(() => setIsProductModalOpen(true), 100);
          }}
        />
      )}

      {/* Collection Modal */}
      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        collection={currentCollection}
        onSave={handleSaveCollection}
      />

      {/* Collection Details Modal */}
      {currentCollection && (
        <CollectionDetails
          isOpen={isCollectionDetailsOpen}
          onClose={() => setIsCollectionDetailsOpen(false)}
          collection={currentCollection}
          products={products.filter(p => p.collectionIds?.includes(currentCollection.id))}
          onDelete={() => handleDeleteCollection(currentCollection.id)}
          onEdit={() => {
            setIsCollectionDetailsOpen(false);
            setTimeout(() => setIsCollectionModalOpen(true), 100);
          }}
        />
      )}

      {/* Update Status Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gold/30 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-clash-display text-gold mb-4">Update Order Status</h3>
            <div className="mb-4">
              <label className="block text-cream/80 mb-2">Order #: {selectedOrder.orderNumber}</label>
              <label className="block text-cream/80 mb-2">Customer: {selectedOrder.customerName}</label>
              <label className="block text-cream/80 mb-4">Current Status: {selectedOrder.status}</label>
              
              <label className="block text-cream/80 mb-2">Update Status</label>
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full bg-black/40 border border-gold/30 text-cream rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 border border-gold/30 text-gold rounded-md hover:bg-gold/10"
              >
                Cancel
              </button>
              <button
                onClick={updateOrderStatus}
                className="px-4 py-2 bg-gold text-black rounded-md hover:bg-gold/90"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
