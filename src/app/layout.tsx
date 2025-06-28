import type { Metadata } from "next";
import "./globals.css";
import { inter, playfair, clashDisplay, satoshi, italiana } from "@/lib/fonts";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Exousia - Holy x High Fashion",
  description: "Christian streetwear where anime intensity meets poetic scripture and editorial luxury meets spiritual fire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable} ${clashDisplay.variable} ${satoshi.variable} ${italiana.variable}`} suppressHydrationWarning>
        <body className="bg-black text-cream font-satoshi antialiased" suppressHydrationWarning>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
