import { createServerSupabaseClient } from './server';
import { supabase } from './client';
import { Product } from '@/lib/store/mockData';

export type ProductWithDetails = {
  id: string;
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  cut?: string;
  care_instructions?: string;
  created_at: string;
  updated_at: string;
  images: { image_url: string }[];
  sizes: { size: string }[];
  colors: { color: string }[];
  scriptures: { verse: string; reference: string }[];
  collections: { collection_id: string; name: string }[];
};

export type Collection = {
  id: string;
  name: string;
  description: string | null;
  featured: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

// Client-side functions (use with caution - limited by RLS policies)
// NOTE: These are now using server-side functions to bypass RLS

export async function getProductsClient() {
  try {
    // Use server-side function to bypass RLS
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductByIdClient(id: string) {
  try {
    // Use server-side function to bypass RLS
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getCollectionsClient() {
  try {
    // Use server-side function to bypass RLS
    const response = await fetch('/api/collections');
    if (!response.ok) {
      throw new Error('Failed to fetch collections');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getProductsByCollectionClient(collectionId: string) {
  try {
    // Use server-side function to bypass RLS
    const response = await fetch(`/api/collections/${collectionId}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for collection ${collectionId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for collection ${collectionId}:`, error);
    return [];
  }
}

// Server-side functions (use these for admin operations)

export async function getProductsServer() {
  const supabaseServer = createServerSupabaseClient();
  
  const { data, error } = await supabaseServer
    .from('products')
    .select(`
      *,
      product_images(*),
      product_sizes(*),
      product_colors(*),
      scriptures(*),
      product_collections(collection_id, collections(*))
    `);
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return transformProducts(data);
}

export async function getProductByIdServer(id: string) {
  const supabaseServer = createServerSupabaseClient();
  
  const { data, error } = await supabaseServer
    .from('products')
    .select(`
      *,
      product_images(*),
      product_sizes(*),
      product_colors(*),
      scriptures(*),
      product_collections(collection_id, collections(*))
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  
  return transformProduct(data);
}

export async function getCollectionsServer() {
  const supabaseServer = createServerSupabaseClient();
  
  const { data, error } = await supabaseServer
    .from('collections')
    .select('*');
  
  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
  
  return data as Collection[];
}

// Helper functions to transform data

function transformProducts(data: any[]): Product[] {
  if (!data) return [];
  
  return data.map(transformProduct);
}

// Export the transformProduct function so it can be used in API routes
export function transformProduct(data: any): Product {
  if (!data) return {} as Product;
  
  // Get the first image or empty string
  const image = data.product_images && data.product_images.length > 0
    ? data.product_images[0].image_url
    : '';
  
  // Get all images
  const images = data.product_images
    ? data.product_images.map((img: any) => img.image_url)
    : [];
  
  // Get sizes
  const sizes = data.product_sizes
    ? data.product_sizes.map((size: any) => size.size)
    : [];
  
  // Get colors
  const colors = data.product_colors
    ? data.product_colors.map((color: any) => color.color)
    : [];
  
  // Get scripture (use first one as primary)
  const scripture = data.scriptures && data.scriptures.length > 0
    ? {
        verse: data.scriptures[0].verse,
        reference: data.scriptures[0].reference
      }
    : { verse: '', reference: '' };
  
  // Get collection IDs
  const collectionIds = data.product_collections
    ? data.product_collections.map((pc: any) => pc.collection_id)
    : [];
  
  return {
    id: data.id,
    name: data.name,
    price: data.price,
    description: data.description,
    category: data.category,
    stock: data.stock,
    cut: data.cut,
    careInstructions: data.care_instructions,
    collectionIds,
    scripture,
    image,
    images,
    sizes,
    colors
  };
}