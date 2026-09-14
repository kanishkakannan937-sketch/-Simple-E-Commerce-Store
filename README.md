# Simple E-Commerce Store 🛍️

A full-stack e-commerce web application developed as part of the Code Alpha internship task.

The application allows users to browse products, view product details, manage their shopping cart, create an account, log in securely, place orders, and view their previous orders.

## 🚀 Features

### Product Management
- View all available products
- Product details page
- Product images
- Product categories
- Stock availability
- Search products
- Filter products by category

### Shopping Cart
- Add products to cart
- Increase and decrease quantity
- Remove products from cart
- Automatic subtotal calculation
- Automatic total calculation
- Stock limit validation

### User Authentication
- User registration
- Secure password hashing using bcrypt
- User login
- JWT-based authentication
- Protected checkout and order routes

### Order Processing
- Checkout page
- Shipping address collection
- Place orders
- Automatic total calculation
- Automatic stock reduction after order placement
- Order status management
- View user's previous orders

### Database
- MongoDB Atlas
- Products collection
- Users collection
- Orders collection

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## 📁 Project Structure

```text
ecommerce-store/
│
├── frontend/
│   ├── index.html
│   ├── product.html
│   ├── cart.html
│   ├── register.html
│   ├── login.html
│   ├── checkout.html
│   ├── orders.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── product.js
│       └── cart.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   │
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   │
│   └── middleware/
│       └── authMiddleware.js
│
└── README.md