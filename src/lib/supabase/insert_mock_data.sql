-- Insert Collections
INSERT INTO collections (id, name, description, featured, image_url)
VALUES 
  (uuid_generate_v4(), 'Faith Essentials', 'Core pieces that express your faith with simple, powerful statements.', true, ''),
  (uuid_generate_v4(), 'Anointed', 'Our premium collection featuring luxurious fabrics and detailed scripture designs.', true, ''),
  (uuid_generate_v4(), 'Daily Walk', 'Comfortable, everyday pieces to remind you of your purpose.', false, '');

-- Store collection IDs in variables
DO $$
DECLARE
  faith_essentials_id UUID;
  anointed_id UUID;
  daily_walk_id UUID;
  product1_id UUID;
  product2_id UUID;
  product3_id UUID;
  product4_id UUID;
  product5_id UUID;
  product6_id UUID;
  order1_id UUID;
  order2_id UUID;
  order3_id UUID;
BEGIN
  -- Get collection IDs
  SELECT id INTO faith_essentials_id FROM collections WHERE name = 'Faith Essentials' LIMIT 1;
  SELECT id INTO anointed_id FROM collections WHERE name = 'Anointed' LIMIT 1;
  SELECT id INTO daily_walk_id FROM collections WHERE name = 'Daily Walk' LIMIT 1;

  -- Insert Products
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES 
    (uuid_generate_v4(), 'Armor of God Tee', 45.00, 'Premium cotton t-shirt with Armor of God scripture design.', 'T-Shirts', 25, NULL, NULL)
  RETURNING id INTO product1_id;
  
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES
    (uuid_generate_v4(), 'Refined by Fire Hoodie', 89.00, 'Heavyweight cotton blend hoodie with embroidered scripture detail.', 'Hoodies', 18, NULL, NULL)
  RETURNING id INTO product2_id;
  
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES
    (uuid_generate_v4(), 'Unashamed Cap', 35.00, 'Structured 6-panel cap with embroidered scripture.', 'Caps', 30, NULL, NULL)
  RETURNING id INTO product3_id;
  
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES
    (uuid_generate_v4(), 'Lion of Judah Tee', 45.00, 'Premium cotton t-shirt with Lion of Judah design.', 'T-Shirts', 22, NULL, NULL)
  RETURNING id INTO product4_id;
  
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES
    (uuid_generate_v4(), 'Faith Bracelet', 25.00, 'Adjustable woven bracelet with faith scripture charm.', 'Accessories', 15, NULL, NULL)
  RETURNING id INTO product5_id;
  
  INSERT INTO products (id, name, price, description, category, stock, cut, care_instructions)
  VALUES
    (uuid_generate_v4(), 'Redeemed Hoodie', 85.00, 'Heavyweight cotton blend hoodie with Redeemed design.', 'Hoodies', 12, NULL, NULL)
  RETURNING id INTO product6_id;

  -- Insert Scriptures
  INSERT INTO scriptures (product_id, verse, reference)
  VALUES 
    (product1_id, 'Put on the full armor of God', 'Ephesians 6:11'),
    (product2_id, 'Refined by fire, tested like gold', '1 Peter 1:7'),
    (product3_id, 'I am not ashamed of the gospel', 'Romans 1:16'),
    (product4_id, 'The Lion of the tribe of Judah has triumphed', 'Revelation 5:5'),
    (product5_id, 'Faith is confidence in what we hope for', 'Hebrews 11:1'),
    (product6_id, 'I have been redeemed by the blood of the Lamb', 'Revelation 5:9');

  -- Insert Product Sizes
  INSERT INTO product_sizes (product_id, size)
  VALUES 
    -- Armor of God Tee sizes
    (product1_id, 'S'),
    (product1_id, 'M'),
    (product1_id, 'L'),
    (product1_id, 'XL'),
    
    -- Refined by Fire Hoodie sizes
    (product2_id, 'M'),
    (product2_id, 'L'),
    (product2_id, 'XL'),
    (product2_id, 'XXL'),
    
    -- Unashamed Cap sizes
    (product3_id, 'One Size'),
    
    -- Lion of Judah Tee sizes
    (product4_id, 'S'),
    (product4_id, 'M'),
    (product4_id, 'L'),
    (product4_id, 'XL'),
    (product4_id, 'XXL'),
    
    -- Faith Bracelet has no sizes
    
    -- Redeemed Hoodie sizes
    (product6_id, 'S'),
    (product6_id, 'M'),
    (product6_id, 'L'),
    (product6_id, 'XL'),
    (product6_id, 'XXL');

  -- Insert Product Colors
  INSERT INTO product_colors (product_id, color)
  VALUES 
    -- Armor of God Tee colors
    (product1_id, 'Black'),
    (product1_id, 'White'),
    
    -- Refined by Fire Hoodie colors
    (product2_id, 'Black'),
    (product2_id, 'Cream'),
    
    -- Unashamed Cap colors
    (product3_id, 'Black'),
    (product3_id, 'Navy'),
    (product3_id, 'Olive'),
    
    -- Lion of Judah Tee colors
    (product4_id, 'Black'),
    (product4_id, 'Gold'),
    
    -- Faith Bracelet colors
    (product5_id, 'Black'),
    (product5_id, 'Gold'),
    (product5_id, 'Cream'),
    
    -- Redeemed Hoodie colors
    (product6_id, 'Black'),
    (product6_id, 'Gray');

  -- Insert Product Collections (Junction Table)
  INSERT INTO product_collections (product_id, collection_id)
  VALUES 
    -- Armor of God Tee collections
    (product1_id, faith_essentials_id),
    (product1_id, daily_walk_id),
    
    -- Refined by Fire Hoodie collections
    (product2_id, anointed_id),
    
    -- Unashamed Cap collections
    (product3_id, faith_essentials_id),
    (product3_id, daily_walk_id),
    
    -- Lion of Judah Tee collections
    (product4_id, anointed_id),
    
    -- Faith Bracelet collections
    (product5_id, faith_essentials_id),
    
    -- Redeemed Hoodie collections
    (product6_id, anointed_id),
    (product6_id, daily_walk_id);

  -- Insert Orders
  INSERT INTO orders (id, user_id, status, total, shipping_address, payment_status)
  VALUES 
    (uuid_generate_v4(), 'user_dummy_1', 'pending', 129.99, '{"address": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001", "country": "United States"}', 'pending')
  RETURNING id INTO order1_id;
  
  INSERT INTO orders (id, user_id, status, total, shipping_address, payment_status)
  VALUES
    (uuid_generate_v4(), 'user_dummy_2', 'processing', 89.99, '{"address": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zipCode": "90001", "country": "United States"}', 'pending')
  RETURNING id INTO order2_id;
  
  INSERT INTO orders (id, user_id, status, total, shipping_address, payment_status)
  VALUES
    (uuid_generate_v4(), 'user_dummy_3', 'shipped', 159.99, '{"address": "789 Pine Blvd", "city": "Chicago", "state": "IL", "zipCode": "60007", "country": "United States"}', 'pending')
  RETURNING id INTO order3_id;

  -- Insert Order Items
  INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
  VALUES 
    -- Order 1 items
    (order1_id, product1_id, 2, 45.00, 'M', 'Black'),
    (order1_id, product5_id, 1, 25.00, NULL, 'Gold'),
    
    -- Order 2 items
    (order2_id, product2_id, 1, 89.00, 'L', 'Black'),
    
    -- Order 3 items
    (order3_id, product3_id, 1, 35.00, 'One Size', 'Black'),
    (order3_id, product4_id, 2, 45.00, 'M', 'Black');

  -- Create a sample admin user profile
  INSERT INTO user_profiles (user_id, first_name, last_name, is_admin)
  VALUES ('admin_user_id', 'Admin', 'User', true);
END $$; 