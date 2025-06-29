import { NextResponse } from 'next/server';
import { getProductsServer } from '@/lib/supabase/products';

export async function GET() {
  try {
    console.log('Featured products API called');
    
    const allProducts = await getProductsServer();
    console.log('All products from server count:', allProducts.length);
    
    // Filter out any invalid products
    const validProducts = allProducts.filter(product => 
      product && 
      product.id && 
      product.name && 
      typeof product.price === 'number'
    );
    
    console.log('Valid products count:', validProducts.length);
    
    // Get random products - prioritize products with images
    const productsWithImages = validProducts.filter(p => p.image || (p.images && p.images.length > 0));
    console.log('Products with images count:', productsWithImages.length);
    
    // Function to get random products
    const getRandomProducts = (products: any[], count: number) => {
      if (products.length === 0) {
        console.log('No products available to select from');
        return [];
      }
      
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    // Get 3 random products, preferring those with images
    const featuredProducts = productsWithImages.length >= 3 
      ? getRandomProducts(productsWithImages, 3)
      : getRandomProducts(validProducts, 3);
    
    console.log('Featured products being returned count:', featuredProducts.length);
    
    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error('Error in featured products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
} 