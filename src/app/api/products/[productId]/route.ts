import { NextResponse } from 'next/server';
import { getProductByIdServer } from '@/lib/supabase/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;
    const product = await getProductByIdServer(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in product API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
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
    const { productId } = params;
    
    console.log('Updating product with ID:', productId);
    
    // Validate that productId is a valid UUID
    const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
    if (!isValidUuid) {
      console.error('Invalid UUID format for product ID:', productId);
      return NextResponse.json(
        { error: `Invalid UUID format for product ID: ${productId}` },
        { status: 400 }
      );
    }
    
    // Use server-side Supabase client which bypasses RLS
    const supabase = createServerSupabaseClient();
    
    // Update the main product data
    const { error: productError } = await supabase
      .from('products')
      .update({
        name: productData.name,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        stock: productData.stock,
        cut: productData.cut,
        care_instructions: productData.careInstructions,
        image: productData.image,
        images: productData.images
      })
      .eq('id', productId);

    if (productError) {
      throw new Error(`Error updating product: ${productError.message}`);
    }
    
    console.log('Updated product with images:', {
      mainImage: productData.image,
      allImages: productData.images
    });

    // Update sizes
    await supabase
      .from('product_sizes')
      .delete()
      .eq('product_id', productId);

    if (productData.sizes?.length > 0) {
      await supabase
        .from('product_sizes')
        .insert(productData.sizes.map((size: string) => ({
          product_id: productId,
          size
        })));
    }

    // Update colors
    await supabase
      .from('product_colors')
      .delete()
      .eq('product_id', productId);

    if (productData.colors?.length > 0) {
      await supabase
        .from('product_colors')
        .insert(productData.colors.map((color: string) => ({
          product_id: productId,
          color
        })));
    }

    // Update scripture
    await supabase
      .from('scriptures')
      .delete()
      .eq('product_id', productId);

    if (productData.scripture) {
      await supabase
        .from('scriptures')
        .insert({
          product_id: productId,
          verse: productData.scripture.verse,
          reference: productData.scripture.reference
        });
    }

    // Update collections
    await supabase
      .from('product_collections')
      .delete()
      .eq('product_id', productId);

    // Check if the collection IDs are valid UUIDs
    if (productData.collectionIds?.length > 0) {
      const isUuid = (id: string) => 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      
      // Filter out any non-UUID collection IDs
      const validCollectionIds = productData.collectionIds.filter(isUuid);
      
      if (validCollectionIds.length > 0) {
        await supabase
          .from('product_collections')
          .insert(validCollectionIds.map((collectionId: string) => ({
            product_id: productId,
            collection_id: collectionId
          })));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in product update API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Check if user is authenticated and admin with Clerk
    const user = await currentUser();
    if (!user || user.publicMetadata.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const { productId } = params;
    const supabase = createServerSupabaseClient();
    
    // Delete the product (cascade will handle related records)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in product delete API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 