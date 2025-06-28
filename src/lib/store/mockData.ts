// Mock product data
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  collectionIds: string[]; // Products can belong to multiple collections
  scripture: {
    verse: string;
    reference: string;
  };
  image: string;
  images?: string[];
  cut?: string;
  careInstructions?: string;
  sizes?: string[];
  colors?: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Completed" | "Processing" | "Shipped" | "Cancelled";
  items: OrderItem[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  image: string;
}

// Mock collections data
export const mockCollections: Collection[] = [
  {
    id: "faith-essentials",
    name: "Faith Essentials",
    description: "Core pieces that express your faith with simple, powerful statements.",
    featured: true,
    image: ""
  },
  {
    id: "anointed",
    name: "Anointed",
    description: "Our premium collection featuring luxurious fabrics and detailed scripture designs.",
    featured: true,
    image: ""
  },
  {
    id: "daily-walk",
    name: "Daily Walk",
    description: "Comfortable, everyday pieces to remind you of your purpose.",
    featured: false,
    image: ""
  }
];

// Mock products data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Armor of God Tee",
    price: 45,
    description: "Premium cotton t-shirt with Armor of God scripture design.",
    category: "T-Shirts",
    stock: 25,
    collectionIds: ["faith-essentials", "daily-walk"],
    scripture: {
      verse: "Put on the full armor of God",
      reference: "Ephesians 6:11"
    },
    image: "",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"]
  },
  {
    id: "2",
    name: "Refined by Fire Hoodie",
    price: 89,
    description: "Heavyweight cotton blend hoodie with embroidered scripture detail.",
    category: "Hoodies",
    stock: 18,
    collectionIds: ["anointed"],
    scripture: {
      verse: "Refined by fire, tested like gold",
      reference: "1 Peter 1:7"
    },
    image: "",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Cream"]
  },
  {
    id: "3",
    name: "Unashamed Cap",
    price: 35,
    description: "Structured 6-panel cap with embroidered scripture.",
    category: "Caps",
    stock: 30,
    collectionIds: ["faith-essentials", "daily-walk"],
    scripture: {
      verse: "I am not ashamed of the gospel",
      reference: "Romans 1:16"
    },
    image: "",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Olive"]
  },
  {
    id: "4",
    name: "Lion of Judah Tee",
    price: 45,
    description: "Premium cotton t-shirt with Lion of Judah design.",
    category: "T-Shirts",
    stock: 22,
    collectionIds: ["anointed"],
    scripture: {
      verse: "The Lion of the tribe of Judah has triumphed",
      reference: "Revelation 5:5"
    },
    image: "",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gold"]
  },
  {
    id: "5",
    name: "Faith Bracelet",
    price: 25,
    description: "Adjustable woven bracelet with faith scripture charm.",
    category: "Accessories",
    stock: 15,
    collectionIds: ["faith-essentials"],
    scripture: {
      verse: "Faith is confidence in what we hope for",
      reference: "Hebrews 11:1"
    },
    image: "",
    colors: ["Black", "Gold", "Cream"]
  },
  {
    id: "6",
    name: "Redeemed Hoodie",
    price: 85,
    description: "Heavyweight cotton blend hoodie with Redeemed design.",
    category: "Hoodies",
    stock: 12,
    collectionIds: ["anointed", "daily-walk"],
    scripture: {
      verse: "I have been redeemed by the blood of the Lamb",
      reference: "Revelation 5:9"
    },
    image: "",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"]
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  { 
    id: "ORD-001", 
    customer: "John Doe", 
    date: "2023-11-15", 
    total: 129.99, 
    status: "Completed",
    items: [
      { productId: "1", quantity: 2 },
      { productId: "5", quantity: 1 }
    ]
  },
  { 
    id: "ORD-002", 
    customer: "Jane Smith", 
    date: "2023-11-14", 
    total: 89.99, 
    status: "Processing",
    items: [
      { productId: "2", quantity: 1 }
    ]
  },
  { 
    id: "ORD-003", 
    customer: "Michael Johnson", 
    date: "2023-11-13", 
    total: 159.99, 
    status: "Shipped",
    items: [
      { productId: "3", quantity: 1 },
      { productId: "4", quantity: 2 }
    ]
  },
];

// Mock filter data
export const categories = ["Hoodies", "T-Shirts", "Caps", "Accessories"];
export const scriptureBooks = ["Genesis", "Psalms", "Proverbs", "Isaiah", "Matthew", "John", "Romans", "Ephesians", "Philippians", "Revelation", "1 Peter"];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(product => product.category === category);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return mockProducts.filter(product => product.collectionIds.includes(collectionId));
}

export function getProductsByScriptureBook(book: string): Product[] {
  return mockProducts.filter(product => product.scripture.reference.startsWith(book));
}

export function getOrdersByCustomer(customer: string): Order[] {
  return mockOrders.filter(order => order.customer === customer);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id);
}

export function getCollectionById(id: string): Collection | undefined {
  return mockCollections.find(collection => collection.id === id);
} 