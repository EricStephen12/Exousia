import { NextResponse } from 'next/server';
import { getProductsServer } from '@/lib/supabase/products';

export async function GET() {
  try {
    const products = await getProductsServer();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
