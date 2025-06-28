import { SignIn } from "@clerk/nextjs";
import ClientLayout from "@/components/layout/ClientLayout";

export default function SignInPage() {
  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-black border border-gold/30",
                headerTitle: "text-gold font-clash-display",
                headerSubtitle: "text-cream",
                formButtonPrimary: "bg-gold hover:bg-gold/90 text-black",
                formFieldInput: "bg-black/30 border border-gold/30 text-cream",
                formFieldLabel: "text-cream",
                footerActionLink: "text-gold hover:text-gold/80",
                socialButtonsBlockButton: "border border-gold/30 text-cream hover:bg-gold/10",
                socialButtonsBlockButtonText: "text-cream",
                dividerLine: "bg-gold/30",
                dividerText: "text-cream",
              },
            }}
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
            redirectUrl="/"
          />
        </div>
      </div>
    </ClientLayout>
  );
} 