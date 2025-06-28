"use client";

import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This helps suppress hydration errors from browser extensions
  useEffect(() => {
    // This is a workaround for hydration errors caused by browser extensions
    // that modify the DOM before React can hydrate it
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes('Hydration failed because the initial UI does not match what was rendered on the server')) {
        return;
      }
      if (args[0]?.includes('There was an error while hydrating')) {
        return;
      }
      originalError.call(console, ...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="client-layout">
      {children}
    </div>
  );
} 