import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { initializeTransaction } from '@/lib/paystack/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    // Get the authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { amount, email, metadata } = body;
    
    if (!amount || !email) {
      return NextResponse.json(
        { error: 'Amount and email are required' },
        { status: 400 }
      );
    }
    
    // Generate a unique reference
    const reference = `exousia_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    // Include user ID in metadata
    const enhancedMetadata = {
      ...metadata,
      userId,
    };
    
    // Initialize the transaction
    const transaction = await initializeTransaction({
      email,
      amount: Math.round(amount * 100), // Convert to kobo (smallest currency unit)
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      metadata: enhancedMetadata,
    });
    
    // Return the transaction data
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
} 