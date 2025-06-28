import { NextResponse } from 'next/server';
import { getCollectionsServer } from '@/lib/supabase/products';

export async function GET() {
  try {
    const collections = await getCollectionsServer();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error in collections API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
} 