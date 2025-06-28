import { config } from '../config';
import axios from 'axios';

// Paystack API base URL
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Create Paystack API client
const paystackAPI = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${config.paystack.secretKey}`,
    'Content-Type': 'application/json',
  },
});

// Types for Paystack API responses
interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      metadata: any;
    };
  };
}

// Initialize a transaction
export async function initializeTransaction(data: {
  email: string;
  amount: number; // amount in kobo (smallest currency unit)
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}): Promise<PaystackInitializeResponse> {
  try {
    const response = await paystackAPI.post('/transaction/initialize', data);
    return response.data;
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    throw error;
  }
}

// Verify a transaction
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  try {
    const response = await paystackAPI.get(`/transaction/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    throw error;
  }
}

// List banks
export async function listBanks(country = 'nigeria') {
  try {
    const response = await paystackAPI.get(`/bank?country=${country}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching banks from Paystack:', error);
    throw error;
  }
}

// Create a transfer recipient
export async function createTransferRecipient(data: {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
  currency?: string;
}) {
  try {
    const response = await paystackAPI.post('/transferrecipient', data);
    return response.data;
  } catch (error) {
    console.error('Error creating transfer recipient:', error);
    throw error;
  }
}

// Initiate a transfer
export async function initiateTransfer(data: {
  source: string;
  amount: number;
  recipient: string;
  reason?: string;
  reference?: string;
}) {
  try {
    const response = await paystackAPI.post('/transfer', data);
    return response.data;
  } catch (error) {
    console.error('Error initiating transfer:', error);
    throw error;
  }
} 