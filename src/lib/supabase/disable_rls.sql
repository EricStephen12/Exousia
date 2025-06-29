-- Disable RLS on all tables
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors DISABLE ROW LEVEL SECURITY;
ALTER TABLE scriptures DISABLE ROW LEVEL SECURITY;
ALTER TABLE collections DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Products are editable by admins only" ON products;
DROP POLICY IF EXISTS "Product images are viewable by everyone" ON product_images;
DROP POLICY IF EXISTS "Product images are editable by admins only" ON product_images;
DROP POLICY IF EXISTS "Product sizes are viewable by everyone" ON product_sizes;
DROP POLICY IF EXISTS "Product sizes are editable by admins only" ON product_sizes;
DROP POLICY IF EXISTS "Product colors are viewable by everyone" ON product_colors;
DROP POLICY IF EXISTS "Product colors are editable by admins only" ON product_colors;
DROP POLICY IF EXISTS "Scriptures are viewable by everyone" ON scriptures;
DROP POLICY IF EXISTS "Scriptures are editable by admins only" ON scriptures;
DROP POLICY IF EXISTS "Collections are viewable by everyone" ON collections;
DROP POLICY IF EXISTS "Collections are editable by admins only" ON collections;
DROP POLICY IF EXISTS "Product collections are viewable by everyone" ON product_collections;
DROP POLICY IF EXISTS "Product collections are editable by admins only" ON product_collections;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "Users can insert their own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Remove is_admin column from user_profiles
ALTER TABLE user_profiles DROP COLUMN IF EXISTS is_admin; 