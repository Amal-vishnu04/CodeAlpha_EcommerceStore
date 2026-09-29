const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  items: [{ product: { type: ObjectId, ref: 'Product' }, name: String, price: Number, qty: Number }],
  total: Number,
  address: String,
  createdAt: { type: Date, default: Date.now }
}));

module.exports = { User, Product, Order };