# 🛒 CodeAlpha E-Commerce Store

A full-stack e-commerce web application developed as part of the **CodeAlpha Full Stack Web Development Internship** (Task 1: Simple E-Commerce Store).

---

## 🚀 Features

- **User Authentication:** User registration and login functionality.
- **Product Catalog:** Displays 50+ items across categories with dynamic pricing and high-quality images.
- **Product Details Page:** Dedicated view for individual item specifications.
- **Shopping Cart:** Add, remove, and manage item quantities smoothly.
- **Order Processing:** Place orders and maintain structured order data.
- **Database Seeding:** Automated database script (`seed.js`) to populate products instantly.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Utilities:** `dotenv` for environment management

---

## 📁 Project Structure

```text
CodeAlpha_EcommerceStore/
├── public/
│   ├── index.html        # Main Storefront
│   ├── product.html      # Product Details View
│   ├── cart.html         # Shopping Cart View
│   ├── orders.html       # Order History View
│   ├── login.html        # User Login & Register Page
│   ├── app.js            # Frontend API Integration
│   └── style.css         # Styling & Responsive Layout
├── models.js             # Mongoose Schemas (User, Product, Order)
├── seed.js               # Database Seeder Script (50 Products)
├── server.js             # Express Backend Server & REST APIs
├── .env                  # Environment Variables
└── package.json          # Node.js Dependencies
