import { NextResponse } from 'next/server';
import { getProductsServer } from '@/lib/supabase/products';

export async function GET() {
  try {
    const allProducts = await getProductsServer();
    console.log('All products from server:', allProducts);
    
    // Filter out any invalid products
    const validProducts = allProducts.filter(product => 
      product && 
      product.id && 
      product.name && 
      typeof product.price === 'number'
    );
    
    console.log('Valid products:', validProducts);
    
    // Get featured products - prioritize products with images
    const productsWithImages = validProducts.filter(p => p.image || (p.images && p.images.length > 0));
    console.log('Products with images:', productsWithImages);
    
    const featuredProducts = productsWithImages.length >= 3 
      ? productsWithImages.slice(0, 3) 
      : validProducts.slice(0, 3);
    
    console.log('Featured products being returned:', featuredProducts);
    
    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error('Error in featured products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
} 