-- Create schema for Exousia e-commerce platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  cut VARCHAR(100),
  care_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_images table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_sizes table
CREATE TABLE product_sizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_colors table
CREATE TABLE product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scripture table for product scriptures
CREATE TABLE scriptures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  verse TEXT NOT NULL,
  reference VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collections table
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_collections junction table
CREATE TABLE product_collections (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (product_id, collection_id)
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) NOT NULL, -- Clerk user ID
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  payment_intent_id VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(20),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table to store additional user info beyond what Clerk provides
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) UNIQUE NOT NULL, -- Clerk user ID
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  is_admin BOOLEAN DEFAULT false,
  default_shipping_address JSONB,
  default_billing_address JSONB,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT USING (true);

-- Admin policy - convert auth.uid() to text for comparison with VARCHAR user_id
CREATE POLICY "Products are editable by admins only" 
  ON products FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Product images policies (inherit from products)
CREATE POLICY "Product images are viewable by everyone" 
  ON product_images FOR SELECT USING (true);

CREATE POLICY "Product images are editable by admins only" 
  ON product_images FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Product sizes policies
CREATE POLICY "Product sizes are viewable by everyone" 
  ON product_sizes FOR SELECT USING (true);

CREATE POLICY "Product sizes are editable by admins only" 
  ON product_sizes FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Product colors policies
CREATE POLICY "Product colors are viewable by everyone" 
  ON product_colors FOR SELECT USING (true);

CREATE POLICY "Product colors are editable by admins only" 
  ON product_colors FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Scriptures policies
CREATE POLICY "Scriptures are viewable by everyone" 
  ON scriptures FOR SELECT USING (true);

CREATE POLICY "Scriptures are editable by admins only" 
  ON scriptures FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Collections policies
CREATE POLICY "Collections are viewable by everyone" 
  ON collections FOR SELECT USING (true);

CREATE POLICY "Collections are editable by admins only" 
  ON collections FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Product collections policies
CREATE POLICY "Product collections are viewable by everyone" 
  ON product_collections FOR SELECT USING (true);

CREATE POLICY "Product collections are editable by admins only" 
  ON product_collections FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Orders policies
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- Order items policies
CREATE POLICY "Users can view their own order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()::text
  ));

CREATE POLICY "Users can insert their own order items" 
  ON order_items FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()::text
  ));

CREATE POLICY "Admins can view all order items" 
  ON order_items FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.user_id = auth.uid()::text AND user_profiles.is_admin = true
  ));

-- User profiles policies
CREATE POLICY "Users can view their own profile" 
  ON user_profiles FOR SELECT 
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own profile" 
  ON user_profiles FOR UPDATE 
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Admins can view all profiles" 
  ON user_profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.user_id = auth.uid()::text AND up.is_admin = true
  ));

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_product_collections_product_id ON product_collections(product_id);
CREATE INDEX idx_product_collections_collection_id ON product_collections(collection_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);