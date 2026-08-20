# Zerodha Clone

A full-stack stock trading platform inspired by Zerodha.

This project is built using the **MERN stack** and provides a trading platform
with user authentication, authorization, watchlist, holdings, orders, positions,
funds, and interactive charts.

---

## 🚀 Live Demo

- **Frontend:** https://zerodha-clone-frontend-ow9l.onrender.com
- **Dashboard:** https://zerodha-clone-dashboard-0r3r.onrender.com
- **Backend API:** https://zerodha-clone-backend-864o.onrender.com

---

## 📌 Features

### 🔐 Authentication & Authorization

- User Signup and Login
- JWT-based authentication
- Token verification using middleware
- Protected routes
- Role-based authorization
- Authentication using cookies/localStorage

### 📊 Trading Dashboard

- Watchlist for tracking stocks
- Holdings management
- Orders management
- Positions tracking
- Funds management
- Apps section
- Buy Action Window

### 📈 Charts & Visualization

- Doughnut Chart for portfolio visualization
- Vertical/Bar graphs
- Interactive dashboard components

### 💰 Trading Features

- Stock buying interface
- Buy Action Window
- Holdings management
- Orders management
- Positions tracking
- Funds management

### 🎨 User Interface

- Responsive UI
- React component-based architecture
- React Router navigation
- Bootstrap styling
- Material UI components and icons
- Context API for global state management

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Bootstrap
- Material UI
- Axios
- Chart.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS
- dotenv

---

## 🏗️ Project Architecture

```text
Zerodha_Clone
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── dashboard
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── util
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

### Frontend

The `frontend` application contains the main Zerodha-inspired landing website.

It includes:

- Home page
- Products page
- Pricing page
- About page
- Signup page
- Login page
- Navbar
- Footer

### Dashboard

The `dashboard` application contains the main trading interface.

It includes:

- Watchlist
- Summary
- Orders
- Holdings
- Positions
- Funds
- Apps
- Buy Action Window
- Charts and graphs

### Backend

The `backend` application provides the server-side functionality and REST APIs.

It includes:

- Express server
- MongoDB database integration
- Authentication
- Authorization
- JWT verification
- User APIs
- Holdings APIs
- Orders APIs
- Positions APIs

---

## 👨‍💻 Author

**Piyush Chauhan**
- LinkedIn: https://www.linkedin.com/in/piyush-chauhan-766967370/
