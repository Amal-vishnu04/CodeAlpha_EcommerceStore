const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Product } = require('./models');

dotenv.config();

const products = [
  // --- Electronics (1 to 10) ---
  {
    name: 'Wireless Headphones',
    price: 1999,
    category: 'Electronics',
    description: 'High-quality over-ear wireless headphones with active noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Smart Watch',
    price: 2999,
    category: 'Electronics',
    description: 'Smart fitness tracker watch with heart rate monitoring and GPS.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Bluetooth Speaker',
    price: 1299,
    category: 'Electronics',
    description: 'Portable waterproof Bluetooth speaker with deep bass output.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Mechanical Keyboard',
    price: 2499,
    category: 'Electronics',
    description: 'RGB mechanical gaming keyboard with tactile mechanical switches.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Wireless Mouse',
    price: 799,
    category: 'Electronics',
    description: 'Ergonomic wireless optical mouse with adjustable DPI settings.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Power Bank 10000mAh',
    price: 999,
    category: 'Electronics',
    description: 'Slim fast-charging portable power bank with dual USB ports.',
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'USB-C Hub',
    price: 1199,
    category: 'Electronics',
    description: 'Multi-port USB-C adapter with HDMI, USB 3.0, and SD card reader.',
    image: 'https://images.unsplash.com/photo-1616440342803-39988ff45e0f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Wireless Earbuds',
    price: 1599,
    category: 'Electronics',
    description: 'Compact TWS Bluetooth earbuds with charging case.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Gaming Mouse Pad',
    price: 499,
    category: 'Electronics',
    description: 'Large anti-slip rubber base desk mat for gaming.',
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Smart Fitness Band',
    price: 1899,
    category: 'Electronics',
    description: 'Slim AMOLED display fitness tracker band with sleep monitor.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80'
  },

  // --- Footwear (11 to 15) ---
  {
    name: 'Running Shoes',
    price: 1499,
    category: 'Footwear',
    description: 'Lightweight breathable mesh athletic running sneakers for men and women.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Casual Sneakers',
    price: 1799,
    category: 'Footwear',
    description: 'Classic lifestyle casual sneakers with cushioned comfort soles.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ankle Boots',
    price: 2499,
    category: 'Footwear',
    description: 'Stylish synthetic leather ankle boots designed for durability.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Formal Leather Shoes',
    price: 2199,
    category: 'Footwear',
    description: 'Classic Oxford black formal genuine leather shoes.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sports Sandals',
    price: 899,
    category: 'Footwear',
    description: 'Comfortable adjustable strap outdoor hiking sports sandals.',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80'
  },

  // --- Fashion (16 to 22) ---
  {
    name: 'Cotton T-Shirt',
    price: 499,
    category: 'Fashion',
    description: '100% premium soft cotton crewneck short-sleeve T-shirt.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Denim Jeans',
    price: 1299,
    category: 'Fashion',
    description: 'Slim fit stretchable denim blue jeans for everyday wear.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Winter Jacket',
    price: 2999,
    category: 'Fashion',
    description: 'Warm windproof padded winter jacket with fleece lining.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Hoodie',
    price: 1499,
    category: 'Fashion',
    description: 'Cozy pullover fleece hoodie with front kangaroo pocket.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Casual Dress',
    price: 1699,
    category: 'Fashion',
    description: 'Elegant floral print casual summer dress.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Formal Shirt',
    price: 999,
    category: 'Fashion',
    description: 'Crisp cotton button-down long-sleeve formal dress shirt.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Denim Jacket',
    price: 2199,
    category: 'Fashion',
    description: 'Classic trucker style blue denim jacket.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80'
  },

  // --- Bags & Accessories (23 to 30) ---
  {
    name: 'Baseball Cap',
    price: 399,
    category: 'Bags & Accessories',
    description: 'Adjustable unisex sports cotton baseball cap.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Leather Belt',
    price: 599,
    category: 'Bags & Accessories',
    description: 'Genuine leather classic formal waist belt with metal buckle.',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Travel Backpack',
    price: 899,
    category: 'Bags & Accessories',
    description: 'Spacious laptop travel backpack with USB charging port.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Leather Wallet',
    price: 599,
    category: 'Bags & Accessories',
    description: 'RFID blocking slim genuine leather bi-fold wallet for men.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sunglasses',
    price: 599,
    category: 'Bags & Accessories',
    description: 'UV400 protection polarized classic aviator sunglasses.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Analog Wrist Watch',
    price: 1899,
    category: 'Bags & Accessories',
    description: 'Classic luxury analog quartz wristwatch with stainless steel band.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Handbag',
    price: 1499,
    category: 'Bags & Accessories',
    description: 'Trendy shoulder tote handbag for everyday use.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Duffel Bag',
    price: 1299,
    category: 'Bags & Accessories',
    description: 'Water-resistant travel duffel canvas bag with shoulder strap.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },

  // --- Home & Kitchen (31 to 38) ---
  {
    name: 'Steel Water Bottle',
    price: 349,
    category: 'Home & Kitchen',
    description: 'Insulated stainless steel hot and cold water flask.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ceramic Coffee Mug',
    price: 249,
    category: 'Home & Kitchen',
    description: 'Microwave safe 350ml ceramic tea and coffee mug.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'LED Table Lamp',
    price: 899,
    category: 'Home & Kitchen',
    description: 'Dimmable touch sensor LED desk reading lamp.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Decorative Cushion',
    price: 449,
    category: 'Home & Kitchen',
    description: 'Soft cotton throw cushion pillow for sofa and couch decor.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Wall Clock',
    price: 799,
    category: 'Home & Kitchen',
    description: 'Modern silent non-ticking analog wall clock.',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Electric Blender',
    price: 1999,
    category: 'Home & Kitchen',
    description: 'High-speed electric smoothie blender and food processor.',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Non-stick Frying Pan',
    price: 899,
    category: 'Home & Kitchen',
    description: 'Induction friendly non-stick granite cooking skillet.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Electric Kettle',
    price: 1199,
    category: 'Home & Kitchen',
    description: '1.8 Liter stainless steel fast boiling electric kettle.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=600&q=80'
  },

  // --- Sports & Fitness (39 to 44) ---
  {
    name: 'Yoga Mat',
    price: 599,
    category: 'Sports & Fitness',
    description: 'Anti-slip 6mm thick exercise yoga mat with carrying strap.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dumbbell Set',
    price: 1499,
    category: 'Sports & Fitness',
    description: 'Rubber coated home workout dumbbell weight set.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Cricket Bat',
    price: 1299,
    category: 'Sports & Fitness',
    description: 'Popular willow wood cricket bat with full cane handle.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Football',
    price: 699,
    category: 'Sports & Fitness',
    description: 'Size 5 official match training soccer football.',
    image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Skipping Rope',
    price: 199,
    category: 'Sports & Fitness',
    description: 'Speed jump skipping rope with ball bearings for cardio fitness.',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Gym Duffel Bag',
    price: 999,
    category: 'Sports & Fitness',
    description: 'Fitness gym bag with separate shoes compartment.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
  },

  // --- Books & Stationery (45 to 49) ---
  {
    name: 'Bestseller Novel',
    price: 349,
    category: 'Books & Stationery',
    description: 'Top-rated paperback fiction bestseller book.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Leather Diary',
    price: 299,
    category: 'Books & Stationery',
    description: 'Handcrafted vintage leather journal notebook.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sketchbook',
    price: 249,
    category: 'Books & Stationery',
    description: 'A4 thick paper spiral drawing notebook for artists.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Highlighter Set',
    price: 149,
    category: 'Books & Stationery',
    description: 'Pack of 6 pastel quick-dry chisel tip highlighters.',
    image: 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Desk Organizer',
    price: 599,
    category: 'Books & Stationery',
    description: 'Multi-compartment mesh metal desktop stationary holder.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80'
  },

  // --- Beauty & Personal Care (50) ---
  {
    name: 'Perfume 100ml',
    price: 1299,
    category: 'Beauty & Personal Care',
    description: 'Long-lasting luxury Eau de Parfum spray for men and women.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Existing products cleared.');

    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products with unique images!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();