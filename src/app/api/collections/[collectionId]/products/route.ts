import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { transformProduct } from '@/lib/supabase/products';

export async function GET(
  request: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    const collectionId = params.collectionId;
    
    // Use server-side client to bypass RLS
    const supabaseServer = createServerSupabaseClient();
    
    const { data, error } = await supabaseServer
      .from('product_collections')
      .select(`
        products(
          *,
          product_images(*),
          product_sizes(*),
          product_colors(*),
          scriptures(*)
        )
      `)
      .eq('collection_id', collectionId);
    
    if (error) {
      console.error(`Error fetching products for collection ${collectionId}:`, error);
      return NextResponse.json(
        { error: 'Failed to fetch products for collection' },
        { status: 500 }
      );
    }
    
    const products = data.map((item: any) => transformProduct(item.products));
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in collection products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection products' },
      { status: 500 }
    );
  }
} 