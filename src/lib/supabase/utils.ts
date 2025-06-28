import { createClient } from '@supabase/supabase-js';
import { Product, Collection } from '../store/mockData';
import { Database } from './types';

// Transform a database product to frontend product model
export async function dbProductToFrontendProduct(
  supabase: ReturnType<typeof createClient<Database>>,
  dbProduct: Database['public']['Tables']['products']['Row']
): Promise<Product> {
  // Get product images
  const { data: images } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('product_id', dbProduct.id)
    .order('display_order');

  // Get product sizes
  const { data: sizes } = await supabase
    .from('product_sizes')
    .select('size')
    .eq('product_id', dbProduct.id);

  // Get product colors
  const { data: colors } = await supabase
    .from('product_colors')
    .select('color')
    .eq('product_id', dbProduct.id);

  // Get product scripture
  const { data: scripture } = await supabase
    .from('scriptures')
    .select('verse, reference')
    .eq('product_id', dbProduct.id)
    .single();

  // Get collections this product belongs to
  const { data: collections } = await supabase
    .from('product_collections')
    .select('collection_id')
    .eq('product_id', dbProduct.id);

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    price: Number(dbProduct.price),
    description: dbProduct.description || '',
    category: dbProduct.category,
    stock: dbProduct.stock,
    collectionIds: collections?.map(c => c.collection_id) || [],
    scripture: scripture || { verse: '', reference: '' },
    image: images && images.length > 0 ? images[0].image_url : '',
    images: images?.map(img => img.image_url) || [],
    cut: dbProduct.cut || undefined,
    careInstructions: dbProduct.care_instructions || undefined,
    sizes: sizes?.map(s => s.size) || [],
    colors: colors?.map(c => c.color) || []
  };
}

// Transform a frontend product to database format
export function frontendProductToDbFormat(product: Product) {
  // Main product data
  const productData = {
    name: product.name,
    price: product.price,
    description: product.description || null,
    category: product.category,
    stock: product.stock,
    cut: product.cut || null,
    care_instructions: product.careInstructions || null
  };

  // Product sizes
  const sizes = product.sizes?.map(size => ({
    size
  })) || [];

  // Product colors
  const colors = product.colors?.map(color => ({
    color
  })) || [];

  // Scripture
  const scripture = {
    verse: product.scripture.verse,
    reference: product.scripture.reference
  };

  // Images
  const images = (product.images || [product.image]).filter(Boolean).map((url, index) => ({
    image_url: url,
    display_order: index
  }));

  // Collections
  const collections = product.collectionIds.map(id => ({
    collection_id: id
  }));

  return {
    product: productData,
    sizes,
    colors,
    scripture,
    images,
    collections
  };
}

// Transform a database collection to frontend collection model
export function dbCollectionToFrontendCollection(
  dbCollection: Database['public']['Tables']['collections']['Row']
): Collection {
  return {
    id: dbCollection.id,
    name: dbCollection.name,
    description: dbCollection.description || '',
    featured: dbCollection.featured || false,
    image: dbCollection.image_url || ''
  };
}

// Transform a frontend collection to database format
export function frontendCollectionToDbFormat(collection: Collection) {
  return {
    name: collection.name,
    description: collection.description,
    featured: collection.featured,
    image_url: collection.image
  };
}

// Helper function to insert a product with all related data
export async function insertProductWithRelations(
  supabase: ReturnType<typeof createClient<Database>>,
  product: Product
) {
  const { product: productData, sizes, colors, scripture, images, collections } = 
    frontendProductToDbFormat(product);
  
  // Insert product
  const { data: insertedProduct, error: productError } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();
  
  if (productError || !insertedProduct) {
    throw new Error(`Error inserting product: ${productError?.message}`);
  }
  
  const productId = insertedProduct.id;
  
  // Insert sizes
  if (sizes.length > 0) {
    const sizesWithProductId = sizes.map(size => ({
      ...size,
      product_id: productId
    }));
    
    const { error: sizesError } = await supabase
      .from('product_sizes')
      .insert(sizesWithProductId);
    
    if (sizesError) {
      throw new Error(`Error inserting sizes: ${sizesError.message}`);
    }
  }
  
  // Insert colors
  if (colors.length > 0) {
    const colorsWithProductId = colors.map(color => ({
      ...color,
      product_id: productId
    }));
    
    const { error: colorsError } = await supabase
      .from('product_colors')
      .insert(colorsWithProductId);
    
    if (colorsError) {
      throw new Error(`Error inserting colors: ${colorsError.message}`);
    }
  }
  
  // Insert scripture
  const { error: scriptureError } = await supabase
    .from('scriptures')
    .insert({
      ...scripture,
      product_id: productId
    });
  
  if (scriptureError) {
    throw new Error(`Error inserting scripture: ${scriptureError.message}`);
  }
  
  // Insert images
  if (images.length > 0) {
    const imagesWithProductId = images.map(image => ({
      ...image,
      product_id: productId
    }));
    
    const { error: imagesError } = await supabase
      .from('product_images')
      .insert(imagesWithProductId);
    
    if (imagesError) {
      throw new Error(`Error inserting images: ${imagesError.message}`);
    }
  }
  
  // Insert collection relationships
  if (collections.length > 0) {
    const collectionsWithProductId = collections.map(collection => ({
      ...collection,
      product_id: productId
    }));
    
    const { error: collectionsError } = await supabase
      .from('product_collections')
      .insert(collectionsWithProductId);
    
    if (collectionsError) {
      throw new Error(`Error inserting collection relationships: ${collectionsError.message}`);
    }
  }
  
  return productId;
} 