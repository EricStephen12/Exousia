# Technical Context: Exousia

## Technologies Used

### Frontend Technologies
1. **Next.js 14**
   - App Router for routing and layouts
   - Server Components for improved performance
   - Client Components for interactive elements
   - API Routes for backend functionality

2. **React 18+**
   - Hooks for state management and side effects
   - Context API for theme and shared state
   - Suspense for improved loading states

3. **Tailwind CSS**
   - Utility-first CSS framework
   - Custom configuration for brand colors and typography
   - JIT (Just-In-Time) compiler for optimized CSS

4. **Shadcn/UI**
   - Accessible, customizable component library
   - Built on Radix UI primitives
   - Tailwind CSS integration

5. **Framer Motion**
   - Animation library for React
   - Scroll-based animations
   - Gesture support for interactive elements

6. **Typography**
   - Headlines: Noe Display, Didot, Playfair Display
   - Body: Neue Haas Grotesk, Satoshi, Manrope
   - Verse overlays: Italiana, Parisienne, Dancing Script

### Backend Technologies
1. **Supabase**
   - PostgreSQL database
   - Row-level security for data protection
   - Storage for product images and assets
   - Edge Functions for serverless backend logic

2. **Clerk Auth**
   - User authentication and management
   - Role-based access control
   - Social login options (future)

3. **Stripe**
   - Payment processing
   - Customer management
   - Subscription handling (future)

4. **Nodemailer**
   - Email notifications
   - Order confirmations
   - Newsletter distribution

### Development Tools
1. **TypeScript**
   - Static typing for improved code quality
   - Enhanced IDE support and autocompletion
   - Type safety for API interactions

2. **ESLint & Prettier**
   - Code quality enforcement
   - Consistent formatting
   - Best practice rules

3. **Git & GitHub**
   - Version control
   - Collaborative development
   - CI/CD integration

4. **Vercel**
   - Deployment platform
   - Preview deployments
   - Analytics and monitoring

## Development Setup

### Local Environment Requirements
1. **Node.js** (v18.17.0 or later)
2. **npm** (v9.6.7 or later) or **pnpm** (v8.0.0 or later)
3. **Git** for version control
4. **Supabase CLI** for local development with Supabase
5. **Stripe CLI** for testing payment integrations

### Environment Variables
```
# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Email
EMAIL_SERVER=your-smtp-server
EMAIL_FROM=your-from-email
EMAIL_PASSWORD=your-email-password
```

### Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Set up environment variables in `.env.local`
4. Start the development server: `npm run dev` or `pnpm dev`
5. Access the site at `http://localhost:3000`

## Technical Constraints

### Performance Requirements
1. **Core Web Vitals Targets**
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

2. **Page Load Performance**
   - Initial load under 3 seconds on average connections
   - Optimized image loading with next/image
   - Code splitting for reduced bundle size

3. **Animation Performance**
   - 60fps target for all animations
   - Hardware acceleration where appropriate
   - Reduced workload on main thread

### Browser Support
1. **Modern Browsers**
   - Chrome (latest 2 versions)
   - Firefox (latest 2 versions)
   - Safari (latest 2 versions)
   - Edge (latest 2 versions)

2. **Mobile Browsers**
   - iOS Safari (latest 2 versions)
   - Android Chrome (latest 2 versions)

### Accessibility Requirements
1. **WCAG 2.1 AA Compliance**
   - Proper semantic HTML
   - Keyboard navigation support
   - Screen reader compatibility
   - Sufficient color contrast

2. **Inclusive Design**
   - Support for reduced motion preferences
   - Text scaling compatibility
   - Focus management for modals and drawers

### Security Considerations
1. **Data Protection**
   - HTTPS only
   - Supabase Row Level Security (RLS)
   - Content Security Policy (CSP)
   - CSRF protection

2. **Authentication Security**
   - Secure session management with Clerk
   - Role-based access control
   - Protection against common authentication vulnerabilities

3. **Payment Security**
   - PCI compliance via Stripe
   - Sensitive data handling best practices
   - Secure checkout flow

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "@clerk/nextjs": "^4.23.2",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-slot": "^1.0.2",
    "@stripe/stripe-js": "^1.54.1",
    "@supabase/auth-helpers-nextjs": "^0.7.4",
    "@supabase/supabase-js": "^2.32.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.15.0",
    "lucide-react": "^0.263.1",
    "next": "^14.0.0",
    "nodemailer": "^6.9.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "stripe": "^12.16.0",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.6",
    "zustand": "^4.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.4.8",
    "@types/nodemailer": "^6.4.9",
    "@types/react": "^18.2.18",
    "@types/react-dom": "^18.2.7",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.46.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.1.6"
  }
}
``` 