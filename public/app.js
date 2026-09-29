const CAT_COLORS = {
  'Electronics': '2563eb/ffffff',
  'Footwear': 'dc2626/ffffff',
  'Fashion': '9333ea/ffffff',
  'Bags & Accessories': 'ea580c/ffffff',
  'Home & Kitchen': '16a34a/ffffff',
  'Sports & Fitness': '0891b2/ffffff',
  'Books & Stationery': '854d0e/ffffff',
  'Beauty & Personal Care': 'db2777/ffffff'
};

function fallbackImg(name, cat) {
  const color = CAT_COLORS[cat] || '64748b/ffffff';
  return `https://placehold.co/500x500/${color}?text=${encodeURIComponent(name)}&font=poppins`;
}

const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const saveCart = (c) => { localStorage.setItem('cart', JSON.stringify(c)); updateBadge(); };

function addToCart(p) {
  const cart = getCart();
  const item = cart.find((x) => x._id === p._id);
  if (item) item.qty++;
  else cart.push({ _id: p._id, name: p.name, price: p.price, image: p.image, qty: 1 });
  saveCart(cart);
  alert('Added to cart ✅');
}

function updateBadge() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCart().reduce((s, i) => s + i.qty, 0);
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  location.href = '/';
}

function renderNav() {
  const name = localStorage.getItem('name');
  document.getElementById('nav').innerHTML = `
    <a href="/" class="logo">🛒 ShopEasy</a>
    <div>
      <a href="/">Home</a>
      <a href="/cart.html">Cart (<span id="cart-count">0</span>)</a>
      ${name
        ? `<a href="/orders.html">My Orders</a><a href="#" onclick="logout()">Logout (${name})</a>`
        : `<a href="/login.html">Login</a>`}
    </div>`;
  updateBadge();
}

async function api(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (localStorage.getItem('token') || '')
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error');
  return data;
}

renderNav();