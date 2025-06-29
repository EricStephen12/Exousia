-- Add deleted and active columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true; 