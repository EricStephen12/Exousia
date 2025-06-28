"use client";

import { useState } from "react";
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

// Define mockOrders at the top of the file
const mockOrders = [
  {
    id: "1",
    orderNumber: "EXO-12345",
    customerName: "John Doe",
    email: "john@example.com",
    date: "2023-05-15",
    status: "shipped",
    total: 129.98,
    customer: "John Doe" // For backward compatibility
  },
  {
    id: "2",
    orderNumber: "EXO-12346",
    customerName: "Jane Smith",
    email: "jane@example.com",
    date: "2023-05-16",
    status: "processing",
    total: 79.99,
    customer: "Jane Smith" // For backward compatibility
  },
  {
    id: "3",
    orderNumber: "EXO-12347",
    customerName: "Mike Johnson",
    email: "mike@example.com",
    date: "2023-05-17",
    status: "delivered",
    total: 45.00,
    customer: "Mike Johnson" // For backward compatibility
  },
  {
    id: "4",
    orderNumber: "EXO-12348",
    customerName: "Sarah Williams",
    email: "sarah@example.com",
    date: "2023-05-18",
    status: "pending",
    total: 99.99,
    customer: "Sarah Williams" // For backward compatibility
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Product filtering and sorting states
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 200] as [number, number],
    scriptureBooks: [] as string[]
  });
  const [sortOption, setSortOption] = useState<"newest" | "price-low" | "price-high" | "name-asc" | "name-desc">("newest");
  
  // CRUD state management
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  
  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [currentCollection, setCurrentCollection] = useState<Collection | undefined>(undefined);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Scripture book filter (simplified for demo)
    if (filters.scriptureBooks.length > 0) {
      const book = product.scripture.reference.split(" ")[0];
      if (!filters.scriptureBooks.includes(book)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
      default:
        return 0; // In a real app, would sort by date
    }
  });

  // Calculate stats for dashboard
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = products.length;
  const totalCustomers = new Set(mockOrders.map(order => order.customer)).size;
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
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    setIsProductDetailsOpen(false);
  };
  
  const handleSaveProduct = (productData: Omit<Product, "id">) => {
    if (currentProduct) {
      // Update existing product
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === currentProduct.id 
            ? { ...p, ...productData } 
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        ...productData
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
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
  
  // Helper function to count products in a collection
  const getProductCountForCollection = (collectionId: string) => {
    return products.filter(p => p.collectionIds.includes(collectionId)).length;
  };

  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle opening the update modal
  const openUpdateModal = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setIsUpdateModalOpen(true);
  };
  
  // Handle updating order status
  const updateOrderStatus = () => {
    if (!selectedOrder) return;
    
    // Update the order in the list
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          status: updatedStatus
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setIsUpdateModalOpen(false);
    
    // In a real app, this would be an API call to update the order status
    alert(`Order ${selectedOrder.orderNumber} status updated to ${updatedStatus}`);
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
    <main className="min-h-screen bg-black text-cream pt-24 pb-16">
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
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-6 py-3 font-clash-display tracking-wide whitespace-nowrap ${
                activeTab === "customers" ? "border-b-2 border-gold text-gold" : "text-cream/70 hover:text-cream"
              }`}
            >
              CUSTOMERS
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
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gold/10 hover:bg-gold/5">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              order.status === "Completed"
                                ? "bg-green-900/30 text-green-400"
                                : order.status === "Processing"
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-purple-900/30 text-purple-400"
                            }`}
                          >
                            {order.status}
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

        {/* Products Content */}
        {activeTab === "products" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-clash-display">Products</h2>
              <button 
                onClick={handleAddProduct}
                className="bg-gold text-black px-4 py-2 font-clash-display tracking-wide"
              >
                ADD PRODUCT
              </button>
            </div>
            
            {/* Filter and Sort Controls */}
            <div className="mb-6 flex flex-col md:flex-row justify-between">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <FilterSidebar onFilterChange={setFilters} />
              </div>
              <div className="md:w-2/3 flex justify-end">
                <SortOptions onSortChange={setSortOption} />
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mb-4">
              <p className="text-cream">Showing {sortedProducts.length} products</p>
            </div>
            
            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">ID</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Name</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Category</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Price</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Stock</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Collections</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Scripture</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gold/10 hover:bg-gold/5">
                      <td className="py-3 px-4">{product.id}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.collectionIds.map(collectionId => {
                            const collection = collections.find(c => c.id === collectionId);
                            return (
                              <span 
                                key={collectionId} 
                                className="px-2 py-1 bg-gold/20 text-gold text-xs rounded"
                              >
                                {collection?.name || collectionId}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.scripture.reference}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewProduct(product)}
                            className="text-cream hover:text-gold"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-cream hover:text-gold"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-cream hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gold text-xl mb-4">No products match your filters</p>
                <button 
                  onClick={() => setFilters({
                    categories: [],
                    priceRange: [0, 200],
                    scriptureBooks: []
                  })}
                  className="text-cream underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
            
            {/* Product Modal */}
            {isProductModalOpen && (
              <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSave={handleSaveProduct}
                product={currentProduct}
              />
            )}
            
            {/* Product Details Modal */}
            {isProductDetailsOpen && currentProduct && (
              <ProductDetails
                product={currentProduct}
                onClose={() => setIsProductDetailsOpen(false)}
                onEdit={() => {
                  setIsProductDetailsOpen(false);
                  handleEditProduct(currentProduct);
                }}
                onDelete={() => handleDeleteProduct(currentProduct.id)}
              />
            )}
          </div>
        )}

        {/* Collections Content */}
        {activeTab === "collections" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-clash-display">Collections</h2>
              <button 
                onClick={handleAddCollection}
                className="bg-gold text-black px-4 py-2 font-clash-display tracking-wide"
              >
                ADD COLLECTION
              </button>
            </div>
            
            {/* Collections Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">ID</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Name</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Description</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Featured</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Products</th>
                    <th className="py-3 px-4 text-left font-clash-display text-gold/80">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection) => {
                    const productCount = getProductCountForCollection(collection.id);
                    
                    return (
                      <tr key={collection.id} className="border-b border-gold/10 hover:bg-gold/5">
                        <td className="py-3 px-4">{collection.id}</td>
                        <td className="py-3 px-4">{collection.name}</td>
                        <td className="py-3 px-4">{collection.description}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            collection.featured 
                              ? "bg-green-900/30 text-green-400" 
                              : "bg-gray-900/30 text-gray-400"
                          }`}>
                            {collection.featured ? "Featured" : "Not Featured"}
                          </span>
                        </td>
                        <td className="py-3 px-4">{productCount} products</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewCollection(collection)}
                              className="text-cream hover:text-gold"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleEditCollection(collection)}
                              className="text-cream hover:text-gold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteCollection(collection.id)}
                              className="text-cream hover:text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Collection Modal */}
            {isCollectionModalOpen && (
              <CollectionModal
                isOpen={isCollectionModalOpen}
                onClose={() => setIsCollectionModalOpen(false)}
                onSave={handleSaveCollection}
                collection={currentCollection}
              />
            )}
            
            {/* Collection Details Modal */}
            {isCollectionDetailsOpen && currentCollection && (
              <CollectionDetails
                collection={currentCollection}
                productCount={getProductCountForCollection(currentCollection.id)}
                onClose={() => setIsCollectionDetailsOpen(false)}
                onEdit={() => {
                  setIsCollectionDetailsOpen(false);
                  handleEditCollection(currentCollection);
                }}
                onDelete={() => handleDeleteCollection(currentCollection.id)}
              />
            )}
          </div>
        )}

        {/* Orders Content */}
        {activeTab === "orders" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-clash-display text-cream">Orders</h2>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                {/* Search */}
                <div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/30 border border-gold/30 text-cream p-2 w-full md:w-auto focus:border-gold focus:outline-none"
                  />
                </div>
                
                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-black/30 border border-gold/30 text-cream p-2 w-full md:w-auto focus:border-gold focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left py-3 px-4 text-cream">Order #</th>
                    <th className="text-left py-3 px-4 text-cream">Customer</th>
                    <th className="text-left py-3 px-4 text-cream">Date</th>
                    <th className="text-left py-3 px-4 text-cream">Total</th>
                    <th className="text-left py-3 px-4 text-cream">Status</th>
                    <th className="text-left py-3 px-4 text-cream">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gold/10 hover:bg-black/30">
                        <td className="py-3 px-4 text-cream">{order.orderNumber}</td>
                        <td className="py-3 px-4">
                          <div className="text-cream">{order.customerName}</div>
                          <div className="text-cream/70 text-sm">{order.email}</div>
                        </td>
                        <td className="py-3 px-4 text-cream">{order.date}</td>
                        <td className="py-3 px-4 text-gold">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "delivered" ? "bg-green-900/20 text-green-400" :
                            order.status === "shipped" ? "bg-blue-900/20 text-blue-400" :
                            order.status === "processing" ? "bg-yellow-900/20 text-yellow-400" :
                            order.status === "pending" ? "bg-purple-900/20 text-purple-400" :
                            "bg-red-900/20 text-red-400"
                          }`}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => openUpdateModal(order)}
                              className="text-sm bg-gold/20 hover:bg-gold/30 text-gold px-3 py-1 rounded transition-colors"
                            >
                              Update
                            </button>
                            <button className="text-sm bg-black/30 hover:bg-black/50 text-cream px-3 py-1 rounded transition-colors">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-cream/70">
                        No orders found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Content */}
        {activeTab === "customers" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-clash-display">Customers</h2>
            </div>
            <p className="text-cream/70">Customer management features coming soon.</p>
          </div>
        )}
      </div>
      
      {/* Update Status Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gold/30 p-6 max-w-md w-full">
            <h3 className="text-xl font-clash-display text-gold mb-4">Update Order Status</h3>
            
            <div className="mb-4">
              <p className="text-cream mb-1">Order: {selectedOrder.orderNumber}</p>
              <p className="text-cream/70 text-sm">Customer: {selectedOrder.customerName}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-cream mb-1">Status</label>
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            {/* Show tracking info fields if status is shipped */}
            {updatedStatus === "shipped" && (
              <>
                <div className="mb-4">
                  <label className="block text-cream mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-cream mb-1">Carrier</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full bg-black/30 border border-gold/30 text-cream p-2 focus:border-gold focus:outline-none"
                  >
                    <option value="">Select carrier</option>
                    <option value="ups">UPS</option>
                    <option value="fedex">FedEx</option>
                    <option value="usps">USPS</option>
                    <option value="dhl">DHL</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 border border-gold/30 text-cream hover:bg-gold/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={updateOrderStatus}
                className="px-4 py-2 bg-gold text-black hover:bg-gold/80 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 