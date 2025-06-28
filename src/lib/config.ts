/**
 * Configuration file for environment variables
 * This provides type-safe access to environment variables
 */

// Helper function to get environment variables with validation
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value && defaultValue === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Environment variable ${key} is not set, using empty string as fallback`);
      return '';
    }
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value as string;
};

// Development fallback values
const DEV_FALLBACKS = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'your-service-role-key',
};

// App configuration
export const config = {
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  },
  auth: {
    // Clerk configuration
    clerk: {
      publishableKey: getEnvVar('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', ''),
      secretKey: getEnvVar('CLERK_SECRET_KEY', ''),
      signInUrl: getEnvVar('NEXT_PUBLIC_CLERK_SIGN_IN_URL', '/auth/sign-in'),
      signUpUrl: getEnvVar('NEXT_PUBLIC_CLERK_SIGN_UP_URL', '/auth/sign-up'),
      afterSignInUrl: getEnvVar('NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL', '/'),
      afterSignUpUrl: getEnvVar('NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL', '/'),
    },
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  payment: {
    // Paystack configuration
    paystack: {
      publicKey: getEnvVar('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY', ''),
      secretKey: getEnvVar('PAYSTACK_SECRET_KEY', ''),
      webhookSecret: getEnvVar('PAYSTACK_WEBHOOK_SECRET', ''),
    },
  },
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Clerk Authentication
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY || '',
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/sign-in',
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/sign-up',
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/',
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/',
  },
  
  // Paystack
  paystack: {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  },
  
  // Cloudinary
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
};

// For development purposes, provide fallbacks when environment variables are not set
if (process.env.NODE_ENV === 'development') {
  // Use mock values for development if environment variables are not set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('⚠️ Using mock Supabase configuration for development');
  }
  
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.warn('⚠️ Using mock Clerk configuration for development');
  }
  
  if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
    console.warn('⚠️ Using mock Paystack configuration for development');
  }
}