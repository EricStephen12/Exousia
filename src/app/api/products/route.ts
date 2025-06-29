import { NextResponse } from 'next/server';
import { getProductsServer } from '@/lib/supabase/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { insertProductWithRelations } from '@/lib/supabase/utils';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    // Check if we have a name query parameter for filtering
    const url = new URL(request.url);
    const nameFilter = url.searchParams.get('name');
    
    const products = await getProductsServer();
    
    if (nameFilter) {
      // Filter products by name (case-insensitive partial match)
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      return NextResponse.json(filteredProducts);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and admin with Clerk
    const user = await currentUser();
    if (!user || user.publicMetadata.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const productData = await request.json();
    console.log('Received product data:', productData);
    console.log('Product images:', {
      mainImage: productData.image,
      allImages: productData.images
    });
    
    // Use server-side Supabase client which bypasses RLS
    const supabase = createServerSupabaseClient();
    
    try {
      const productId = await insertProductWithRelations(supabase, productData);
      console.log('Product saved successfully with ID:', productId);
      return NextResponse.json({ id: productId });
    } catch (error: any) {
      console.error('Error saving product:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to save product' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in product API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
