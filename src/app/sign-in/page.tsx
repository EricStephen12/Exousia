import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full bg-black border border-gold/30",
              headerTitle: "text-gold font-clash-display",
              headerSubtitle: "text-cream",
              formButtonPrimary: "bg-gold hover:bg-gold/90 text-black",
              formFieldInput: "bg-black/30 border border-gold/30 text-cream focus:border-gold focus:ring-gold",
              formFieldLabel: "text-cream",
              footerActionLink: "text-gold hover:text-gold/80",
              socialButtonsBlockButton: "border border-gold/30 text-cream hover:bg-gold/10",
              socialButtonsBlockButtonText: "text-cream",
              dividerLine: "bg-gold/30",
              dividerText: "text-cream",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}
