# Exousia - Christian Streetwear E-commerce

Exousia is a premium Christian streetwear e-commerce platform built with Next.js, Tailwind CSS, Clerk, and Supabase.

## Features

- Modern, dramatic design with scripture overlays
- Secure authentication with Clerk
- Product management with Cloudinary image uploads
- Database integration with Supabase
- Admin dashboard for product, collection, and order management
- Responsive design for all devices

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd exousia
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=exousia-products

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Paystack Configuration
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_WEBHOOK_SECRET=your_paystack_webhook_secret
```

### 4. Set up Cloudinary

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Create an upload preset:
   - Go to Settings > Upload > Upload presets
   - Click "Add upload preset"
   - Set the preset name to "exousia-products" (or your custom name)
   - Set "Signing Mode" to "Unsigned"
   - Save the preset
3. Add your Cloudinary credentials to `.env.local`

### 5. Set up Clerk Authentication

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Add your Clerk API keys to `.env.local`
4. Configure your application URL and redirect URLs in the Clerk dashboard

### 6. Set up Admin Role

To create an admin user:

1. Sign up for an account using the regular sign-up flow
2. Use the API endpoint to set the admin role:

```bash
curl -X POST http://localhost:3000/api/admin/set-admin-role \
  -H "Content-Type: application/json" \
  -d '{"targetUserId": "YOUR_USER_ID"}'
```

The first user to call this endpoint will become an admin. After that, only existing admins can create new admins.

### 7. Set up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL script in `src/lib/supabase/schema.sql` to set up your database schema
4. Add your Supabase credentials to `.env.local`

### 8. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
app/
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
├── (shop)/
│   ├── products/
│   │   └── [productId]/
│   ├── collections/
│   │   └── [collectionId]/
│   └── checkout/
├── admin/
│   ├── products/
│   ├── orders/
│   └── customers/
├── api/
│   ├── products/
│   ├── orders/
│   └── checkout/
├── components/
│   ├── ui/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── layout/
└── lib/
    ├── utils/
    ├── hooks/
    ├── animations/
    └── supabase/
```

## Design System

- **Colors**: Matte Black, Cream Beige, Warm Gold
- **Typography**: 
  - Headlines: Noe Display, Didot, Playfair Display
  - Body: Neue Haas Grotesk, Satoshi, Manrope
  - Verse overlays: Italiana, Parisienne, Dancing Script
- **Animation**: Smooth, dramatic animations with parallax effects and scripture reveals

## License

[MIT](https://choosealicense.com/licenses/mit/)
