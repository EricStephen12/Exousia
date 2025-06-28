import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

// Create a single supabase client for client-side usage
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  }
);

// Log warning if using fallback values
if (process.env.NODE_ENV === 'development' && 
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Using fallback Supabase configuration. Please set up your .env.local file.');
  console.warn('⚠️ Supabase functionality will not work properly until you configure real credentials.');
} 