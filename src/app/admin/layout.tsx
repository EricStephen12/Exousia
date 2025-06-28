"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Check if user is authenticated and has admin role
      const userRole = user?.publicMetadata?.role as string | undefined;
      
      if (!user || userRole !== "admin") {
        // Not an admin, redirect to home
        router.push("/");
      } else {
        setIsAdmin(true);
      }
      setIsChecking(false);
    }
  }, [isLoaded, user, router]);

  // Show loading state while checking
  if (isChecking || !isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold text-2xl">Loading...</div>
      </div>
    );
  }

  // If not admin, render nothing (will redirect)
  if (!isAdmin) {
    return null;
  }

  // If admin, render children
  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black border-b border-gold/20 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-clash-display text-gold">EXOUSIA ADMIN</h1>
          <div className="text-cream">
            Welcome, {user?.firstName || "Admin"}
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
} 