# Exousia Setup Guide

This document provides detailed instructions for setting up the Exousia e-commerce platform, including configuration for Cloudinary, Clerk authentication with admin roles, and Supabase database integration.

## Environment Variables

First, create a `.env.local` file in the project root with the following variables:

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

## Cloudinary Setup

### 1. Create a Cloudinary Account
- Sign up at [cloudinary.com](https://cloudinary.com)
- After signing up, you'll get your cloud name, API key, and API secret

### 2. Create an Upload Preset
1. In your Cloudinary dashboard, go to Settings > Upload > Upload presets
2. Click "Add upload preset"
3. Configure the preset:
   - Name: `exousia-products` (or any name you prefer)
   - Signing Mode: "Unsigned"
   - Folder: Optionally specify a folder for your uploads
   - Transformations: You can set default transformations if needed
4. Save the preset

### 3. Update Environment Variables
Add your Cloudinary credentials to `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=exousia-products
```

### 4. Testing Cloudinary
After setting up, you should be able to upload images in the admin product form. If you encounter the error "A Cloudinary Cloud name is required", double-check that your environment variables are correctly set and that you've restarted the development server.

## Clerk Authentication and Admin Setup

### 1. Create a Clerk Account
- Sign up at [clerk.com](https://clerk.com)
- Create a new application

### 2. Configure Your Application
1. In the Clerk dashboard, go to API Keys
2. Copy your Publishable Key and Secret Key
3. Add them to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### 3. Configure Sign-In and Sign-Up URLs
1. In the Clerk dashboard, go to Paths
2. Set the following paths:
   - Sign-in path: `/auth/sign-in`
   - Sign-up path: `/auth/sign-up`
   - After sign-in path: `/` (or `/admin` for admin users)
   - After sign-up path: `/`

### 4. Setting Up Admin Role

The application uses Clerk's user metadata to determine admin status. To set up an admin user:

1. First, sign up for a regular account using the sign-up page
2. Get your User ID from Clerk dashboard (Users section)
3. Use one of the following methods to set the admin role:

#### Method 1: Using the API Endpoint
Make a POST request to the admin role endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/set-admin-role \
  -H "Content-Type: application/json" \
  -d '{"targetUserId": "YOUR_USER_ID"}'
```

Note: The first user to call this endpoint will become an admin. After that, only existing admins can create new admins.

#### Method 2: Using Clerk Dashboard
1. Go to the Clerk dashboard > Users
2. Find your user and click on it
3. Go to the "Metadata" tab
4. Add a new public metadata field:
   - Key: `role`
   - Value: `admin`
5. Save the changes

### 5. Testing Admin Access
After setting up the admin role, you should be able to access the `/admin` route. If you can't access it, check that:
1. You're signed in
2. Your user has the `role` set to `admin` in public metadata
3. You've restarted the development server after setting up the role

## Supabase Database Setup

### 1. Create a Supabase Account
- Sign up at [supabase.com](https://supabase.com)
- Create a new project

### 2. Set Up Database Schema
1. In the Supabase dashboard, go to the SQL Editor
2. Copy the contents of `src/lib/supabase/schema.sql`
3. Paste it into the SQL Editor and run the query

### 3. Update Environment Variables
Get your Supabase credentials from the Settings > API section and add them to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Seeding Initial Data (Optional)
If you want to seed your database with initial data:

1. Create a new SQL query in the Supabase SQL Editor
2. Use the following template to insert products:

```sql
-- Insert a product
INSERT INTO products (name, price, description, category, stock, cut, care_instructions)
VALUES ('Product Name', 45.00, 'Product description', 'T-Shirts', 10, 'Regular Fit', 'Machine wash cold');

-- Get the product ID
DO $$
DECLARE
  product_id UUID;
BEGIN
  SELECT id INTO product_id FROM products WHERE name = 'Product Name' LIMIT 1;
  
  -- Insert scripture
  INSERT INTO scriptures (product_id, verse, reference)
  VALUES (product_id, 'Scripture verse text', 'John 3:16');
  
  -- Insert images
  INSERT INTO product_images (product_id, image_url, display_order)
  VALUES 
    (product_id, 'https://example.com/image1.jpg', 0),
    (product_id, 'https://example.com/image2.jpg', 1);
  
  -- Insert sizes
  INSERT INTO product_sizes (product_id, size)
  VALUES 
    (product_id, 'S'),
    (product_id, 'M'),
    (product_id, 'L'),
    (product_id, 'XL');
  
  -- Insert colors
  INSERT INTO product_colors (product_id, color)
  VALUES 
    (product_id, 'Black'),
    (product_id, 'White');
END $$;
```

## Integrating with the Admin Panel

The admin panel is set up to use mock data initially. To connect it to Supabase:

1. Update the admin components to use the Supabase API functions instead of the mock data
2. Implement proper error handling and loading states
3. Add authentication checks to ensure only admin users can access these functions

## Troubleshooting

### Cloudinary Issues
- **Error: A Cloudinary Cloud name is required**: Check that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correctly set in your `.env.local` file and that you've restarted the development server.
- **Upload not working**: Verify that your upload preset is set to "unsigned" and that the preset name matches the one in your environment variables.

### Admin Access Issues
- **Cannot access /admin**: Make sure you're signed in and that your user has the admin role set in Clerk's public metadata.
- **Admin API endpoints not working**: Check that your Clerk Secret Key is correctly set and that you're making authenticated requests.

### Supabase Issues
- **Database connection errors**: Verify your Supabase URL and API keys are correct.
- **Row-level security errors**: Make sure your RLS policies are correctly set up and that you're using the appropriate authentication.

## Next Steps

After completing the setup:

1. Customize the UI to match your brand
2. Add more products and collections
3. Set up payment processing with Paystack
4. Configure email notifications for orders
5. Set up analytics to track user behavior and sales 