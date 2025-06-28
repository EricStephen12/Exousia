"use client";

import { useEffect } from "react";

export default function DebugEnv() {
  useEffect(() => {
    console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Environment Variables Debug</h1>
      <p>Check the console for environment variable values</p>
      <p className="mt-4">NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}</p>
      <p>NODE_ENV: {process.env.NODE_ENV || "Not set"}</p>
    </div>
  );
}