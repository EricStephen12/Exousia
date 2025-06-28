import { config } from '../config';

// Paystack client for client-side operations
export const paystackPublicKey = config.paystack.publicKey;

// Helper function to initialize a transaction
export async function initializeTransaction(data: {
  email: string;
  amount: number; // amount in kobo (smallest currency unit)
  reference?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const response = await fetch('/api/payment/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to initialize transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error initializing transaction:', error);
    throw error;
  }
}

// Helper function to verify a transaction
export async function verifyTransaction(reference: string) {
  try {
    const response = await fetch(`/api/payment/verify/${reference}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Failed to verify transaction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
} 