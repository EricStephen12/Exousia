import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { config } from '@/lib/config';

// Verify that the request is coming from Paystack
function verifyPaystackSignature(request: Request, body: string): boolean {
  const signature = request.headers.get('x-paystack-signature');
  
  if (!signature) {
    return false;
  }
  
  const hash = crypto
    .createHmac('sha512', config.paystack.secretKey)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}

export async function POST(request: Request) {
  try {
    // Get the raw request body as text
    const body = await request.text();
    
    // Verify the request is from Paystack
    if (!verifyPaystackSignature(request, body)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // Parse the webhook payload
    const payload = JSON.parse(body);
    const { event, data } = payload;
    
    // Initialize Supabase client
    const supabase = createServerSupabaseClient();
    
    // Handle different webhook events
    switch (event) {
      case 'charge.success':
        // Handle successful payment
        if (data.metadata && data.metadata.orderId) {
          const { orderId, userId } = data.metadata;
          
          // Update order status in the database
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              payment_intent_id: data.reference,
              status: 'processing',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId)
            .eq('user_id', userId);
        }
        break;
        
      case 'charge.failed':
        // Handle failed payment
        if (data.metadata && data.metadata.orderId) {
          const { orderId, userId } = data.metadata;
          
          // Update order status in the database
          await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
              payment_intent_id: data.reference,
              status: 'payment_failed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId)
            .eq('user_id', userId);
        }
        break;
        
      case 'transfer.success':
        // Handle successful transfer (for payouts)
        // Update payout status in the database if needed
        break;
        
      default:
        // Log unhandled events for debugging
        console.log(`Unhandled Paystack webhook event: ${event}`);
    }
    
    // Return a 200 response to acknowledge receipt of the webhook
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 