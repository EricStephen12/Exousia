import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { verifyTransaction } from '@/lib/paystack/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { reference: string } }
) {
  try {
    // Get the authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { reference } = params;
    
    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      );
    }
    
    // Verify the transaction
    const transaction = await verifyTransaction(reference);
    
    // Check if the transaction was successful
    if (transaction.status && transaction.data.status === 'success') {
      // Get the order details from the metadata
      const { orderId } = transaction.data.metadata || {};
      
      if (orderId) {
        // Update the order status in the database
        const supabase = createServerSupabaseClient();
        
        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            payment_intent_id: reference,
            status: 'processing',
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId)
          .eq('user_id', userId);
      }
    }
    
    // Return the transaction data
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 