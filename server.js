require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { User, Product, Order } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sign = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const auth = (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1];
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: 'Please login first' });
  }
};

// ---------- AUTH ----------
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.json({ token: sign(user), name: user.name });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' });
    res.json({ token: sign(user), name: user.name });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- PRODUCTS ----------
app.get('/api/products', async (req, res) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search,$options: 'i' };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  let query = Product.find(filter);
  if (sort === 'low') query = query.sort({ price: 1 });
  if (sort === 'high') query = query.sort({ price: -1 });
  res.json(await query);
});

app.get('/api/categories', async (req, res) => {
  res.json(await Product.distinct('category'));
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
});

// ---------- ORDERS ----------
app.post('/api/orders', auth, async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items?.length || !address) return res.status(400).json({ message: 'Cart and address required' });
    let total = 0;
    const orderItems = [];
    for (const it of items) {
      const p = await Product.findById(it.id);
      if (!p) continue;
      total += p.price * it.qty;
      orderItems.push({ product: p._id, name: p.name, price: p.price, qty: it.qty });
    }
    const order = await Order.create({ user: req.userId, items: orderItems, total, address });
    res.json(order);
  } catch {
    res.status(500).json({ message: 'Order failed' });
  }
});

app.get('/api/orders', auth, async (req, res) => {
  res.json(await Order.find({ user: req.userId }).sort({ createdAt: -1 }));
});

// ---------- START ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Running: http://localhost:${process.env.PORT}`));
  })
  .catch((e) => console.log('DB error:', e.message));