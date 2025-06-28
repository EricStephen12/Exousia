"use client";

import { useState } from 'react';

// Mock customer data - this would come from Supabase in production
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 3,
    totalSpent: 249.97,
    lastOrder: "2023-05-15",
    shippingAddress: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    }
  },
  {
    id: "cust-2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    orders: 1,
    totalSpent: 79.99,
    lastOrder: "2023-05-16",
    shippingAddress: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "United States"
    }
  },
  {
    id: "cust-3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    orders: 2,
    totalSpent: 144.99,
    lastOrder: "2023-05-17",
    shippingAddress: {
      address: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
      country: "United States"
    }
  },
  {
    id: "cust-4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    orders: 4,
    totalSpent: 399.96,
    lastOrder: "2023-05-18",
    shippingAddress: {
      address: "101 Maple Dr",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "United States"
    }
  }
];

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open customer details modal
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-clash-display text-gold">CUSTOMERS</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black/30 border border-gold/30 text-cream focus:border-gold focus:outline-none"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/50" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gold/20">
              <th className="py-3 px-4 text-left text-cream">Name</th>
              <th className="py-3 px-4 text-left text-cream">Email</th>
              <th className="py-3 px-4 text-left text-cream">Phone</th>
              <th className="py-3 px-4 text-left text-cream">Orders</th>
              <th className="py-3 px-4 text-left text-cream">Total Spent</th>
              <th className="py-3 px-4 text-left text-cream">Last Order</th>
              <th className="py-3 px-4 text-left text-cream">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="hover:bg-gold/5">
                <td className="py-3 px-4 text-cream">{customer.name}</td>
                <td className="py-3 px-4 text-cream">{customer.email}</td>
                <td className="py-3 px-4 text-cream">{customer.phone}</td>
                <td className="py-3 px-4 text-cream">{customer.orders}</td>
                <td className="py-3 px-4 text-gold">${customer.totalSpent.toFixed(2)}</td>
                <td className="py-3 px-4 text-cream">{customer.lastOrder}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleViewCustomer(customer)}
                    className="text-gold hover:text-gold/80 underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Modal */}
      {isDetailsModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black opacity-75" onClick={() => setIsDetailsModalOpen(false)}></div>
            
            <div className="relative bg-black border border-gold/30 p-6 w-full max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-clash-display text-gold">CUSTOMER DETAILS</h3>
                <button 
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-cream hover:text-gold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gold font-medium mb-2">Personal Information</h4>
                  <div className="space-y-2">
                    <p className="text-cream"><span className="text-cream/60">Name:</span> {selectedCustomer.name}</p>
                    <p className="text-cream"><span className="text-cream/60">Email:</span> {selectedCustomer.email}</p>
                    <p className="text-cream"><span className="text-cream/60">Phone:</span> {selectedCustomer.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gold font-medium mb-2">Order History</h4>
                  <div className="space-y-2">
                    <p className="text-cream"><span className="text-cream/60">Total Orders:</span> {selectedCustomer.orders}</p>
                    <p className="text-cream"><span className="text-cream/60">Total Spent:</span> ${selectedCustomer.totalSpent.toFixed(2)}</p>
                    <p className="text-cream"><span className="text-cream/60">Last Order:</span> {selectedCustomer.lastOrder}</p>
                  </div>
                </div>
                
                {selectedCustomer.shippingAddress && (
                  <div className="md:col-span-2">
                    <h4 className="text-gold font-medium mb-2">Shipping Address</h4>
                    <p className="text-cream">{selectedCustomer.shippingAddress.address}</p>
                    <p className="text-cream">
                      {selectedCustomer.shippingAddress.city}, {selectedCustomer.shippingAddress.state} {selectedCustomer.shippingAddress.zipCode}
                    </p>
                    <p className="text-cream">{selectedCustomer.shippingAddress.country}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 border border-gold/30 text-cream hover:bg-gold/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 