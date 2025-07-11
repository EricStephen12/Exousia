import { createClient } from '@supabase/supabase-js';
import { Product, Collection } from '../store/mockData';

interface ProductImage {
  image_url: string;
}

interface ProductSize {
  size: string;
}

interface ProductColor {
  color: string;
}

interface Scripture {
  verse: string;
  reference: string;
}

interface ProductCollection {
  collection_id: string;
}

// Transform a database product to frontend product model
export async function dbProductToFrontendProduct(
  supabase: ReturnType<typeof createClient>,
  dbProduct: any
): Promise<Product> {
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
    collectionIds: (collections as ProductCollection[] || []).map(c => c.collection_id),
    scripture: (scripture as Scripture) || { verse: '', reference: '' },
    image: dbProduct.image || '',
    images: dbProduct.images || [],
    cut: dbProduct.cut || undefined,
    careInstructions: dbProduct.care_instructions || undefined,
    sizes: (sizes as ProductSize[] || []).map(s => s.size),
    colors: (colors as ProductColor[] || []).map(c => c.color)
  };
}

// Transform a frontend product to database format
export function frontendProductToDbFormat(product: Product) {
  console.log('Product being transformed for DB:', product);
  console.log('Images array:', product.images);
  
  // Ensure images is always an array
  const images = Array.isArray(product.images) ? product.images : [];
  
  // Main product data
  const productData = {
    name: product.name,
    price: product.price,
    description: product.description || null,
    category: product.category,
    stock: product.stock,
    cut: product.cut || null,
    care_instructions: product.careInstructions || null,
    image: product.image || null,
    images: images
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

  // Collections
  const collections = product.collectionIds.map(id => ({
    collection_id: id
  }));

  return {
    product: productData,
    sizes,
    colors,
    scripture,
    collections
  };
}

// Transform a database collection to frontend collection model
export function dbCollectionToFrontendCollection(
  dbCollection: any
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
  supabase: ReturnType<typeof createClient>,
  product: Product
) {
  const { product: productData, sizes, colors, scripture, collections } = 
    frontendProductToDbFormat(product);
  
  // First, get the collection UUIDs from their slugs/names
  let collectionUuids: { collection_id: string }[] = [];
  if (product.collectionIds.length > 0) {
    // Check if the collection IDs are already UUIDs or if they're slugs/names
    const isUuid = (id: string) => 
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    const uuidCollectionIds = product.collectionIds.filter(isUuid);
    const slugCollectionIds = product.collectionIds.filter(id => !isUuid(id));
    
    // For UUIDs, use them directly
    if (uuidCollectionIds.length > 0) {
      collectionUuids = [
        ...collectionUuids,
        ...uuidCollectionIds.map(id => ({ collection_id: id }))
      ];
    }
    
    // For slugs/names, look them up in the database
    if (slugCollectionIds.length > 0) {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('id, name')
        .in('name', slugCollectionIds.map(id => {
          // Convert slug to title case for matching collection names
          return id.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        }));

      if (collectionsError) {
        throw new Error(`Error fetching collections: ${collectionsError.message}`);
      }

      if (collectionsData) {
        collectionUuids = [
          ...collectionUuids,
          ...collectionsData.map(c => ({ collection_id: c.id as string }))
        ];
      }
    }
  }
  
  console.log('Collection UUIDs to use:', collectionUuids);
  
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
  
  // Insert collections
  if (collectionUuids.length > 0) {
    const collectionsWithProductId = collectionUuids.map(collection => ({
      ...collection,
      product_id: productId
    }));
    
    const { error: collectionsError } = await supabase
      .from('product_collections')
      .insert(collectionsWithProductId);
    
    if (collectionsError) {
      throw new Error(`Error inserting collections: ${collectionsError.message}`);
    }
  }
  
  return productId;
} 