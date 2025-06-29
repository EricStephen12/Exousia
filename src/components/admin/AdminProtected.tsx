'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// List of admin emails that have access to the admin panel
const ADMIN_EMAILS = [
  'deamirclothingstores@gmail.com',
  // Add more admin emails as needed
];

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoaded) return;
      
      if (!isSignedIn) {
        // Redirect to sign-in if not signed in
        router.push('/sign-in?redirect_url=' + encodeURIComponent('/admin'));
        return;
      }

      try {
        // Get the user's email from Clerk
        const response = await fetch('/api/admin/check-admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`
          }
        });
        
        if (response.ok) {
          const user = await response.json();
          const userEmail = user?.emailAddresses?.[0]?.emailAddress;
          
          if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
            setIsAdmin(true);
          } else {
            // Redirect to home if not admin
            router.push('/');
          }
        } else {
          // Handle error or redirect
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [isLoaded, isSignedIn, router, getToken]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-cream text-lg">Loading admin panel...</div>
      </div>
    );
  }

  // If not admin, the useEffect will handle the redirect
  if (!isAdmin) {
    return null;
  }

  // If admin, render the children
  return <>{children}</>;
}
