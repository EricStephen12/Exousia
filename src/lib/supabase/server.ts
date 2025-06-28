import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

// Create a Supabase client with admin privileges for server-side usage
export const createServerSupabaseClient = () => {
  // Create client with service role key to bypass RLS
  const client = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${config.supabase.serviceRoleKey}`
        }
      }
    }
  );
  
  return client;
};

// Log warning if using fallback values
if (process.env.NODE_ENV === "development" && 
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
  console.warn("Using fallback Supabase server configuration. Please set up your .env.local file.");
  console.warn("Server-side Supabase functionality will not work properly until you configure real credentials.");
}
