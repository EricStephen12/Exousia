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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        elements: {
          formButtonPrimary: 'bg-gold hover:bg-gold/90 text-black',
          footerActionLink: 'text-gold hover:text-gold/80',
          card: 'bg-black border border-gold/30',
          headerTitle: 'text-gold font-clash-display',
          headerSubtitle: 'text-cream',
          formFieldInput: 'bg-black/30 border border-gold/30 text-cream focus:border-gold focus:ring-gold',
          formFieldLabel: 'text-cream',
          socialButtonsBlockButton: 'border border-gold/30 text-cream hover:bg-gold/10',
          socialButtonsBlockButtonText: 'text-cream',
          dividerLine: 'bg-gold/30',
          dividerText: 'text-cream',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
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
