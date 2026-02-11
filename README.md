# Training Management WebApp

A comprehensive web application for managing training programs, user registrations, and administrative tasks. Built with a modern stack using React for the frontend and Express.js for the backend.

## 🎯 Project Overview

This application provides:
- **User Management**: Registration, authentication, and user profile management
- **Formation Management**: Browse, view details, and manage training formations
- **Registration System**: Users can register for formations
- **Admin Dashboard**: Complete administrative panel for managing users, formations, and registrations
- **Secure Authentication**: JWT-based authentication with role-based access control

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Project Structure Details](#project-structure-details)

## 📁 Project Structure

```
Training Management WebApp/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   └── index.ts           # Main server file
│   ├── seeder.ts              # Database seeding script
│   └── package.json
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── redux/             # Redux store & slices
│   │   ├── hooks/             # Custom hooks
│   │   └── main.tsx           # Entry point
│   └── package.json
└── README.md                   # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have installed:

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- **MongoDB**: Local instance or MongoDB Atlas connection string
- **Git**: For version control

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Training Management WebApp"
```

### 2. Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/training_management
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/training_management

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=5000
NODE_ENV=development
```

## 🚀 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build TypeScript

```bash
npm run build
```

### 4. Seed the Database (Optional)

To create an initial admin user:

```bash
npm run admin:create
```

### 5. Start the Backend Server

**Development Mode** (with hot reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The backend will run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## ▶️ Running the Application

### Option 1: Run Both Simultaneously (Recommended)

Open two terminal windows/tabs:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Run Individually

Backend:
```bash
cd backend && npm run dev
```

Frontend:
```bash
cd frontend && npm run dev
```

## 🛠 Technologies Used

### Backend
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Nodemailer**: Email service
- **Joi**: Data validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Material-UI**: Component library
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Hook Form**: Form state management
- **Yup**: Schema validation

## 📝 Backend Structure

### Controllers
- **userController.ts**: User authentication and profile management
- **formationController.ts**: Formation CRUD operations
- **registrationController.ts**: Registration management

### Models
- **User.ts**: User schema with roles (admin, user)
- **formation.ts**: Formation/Training schema
- **registration.ts**: Registration schema

### Routes
- **/api/users**: User endpoints (auth, profile)
- **/api/formations**: Formation endpoints
- **/api/registrations**: Registration endpoints

### Middleware
- **authMiddleware.ts**: JWT verification
- **hasRole.ts**: Role-based access control

## 🖥 Frontend Structure

### KEY Components
- **Auth**: Login, Register, ForgotPassword, ResetPassword
- **Admin Dashboard**: User management, Formation management, Registrations
- **User Pages**: Formation browsing, Registration management
- **Navigation**: Navbar, Sidebar, TopBar, Footer

### Redux Store
- **authSlice**: Authentication state management
- **API Calls**: 
  - **user.ts**: User API calls
  - **formation.ts**: Formation API calls
  - **registration.ts**: Registration API calls

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register or login
2. Backend provides JWT token
3. Token is stored in Redux store and localStorage
4. Token is sent with each request in Authorization header
5. Admin routes are protected with role-based middleware

## 📚 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `POST /api/users/forgot-password` - Initiate password reset
- `POST /api/users/reset-password/:token` - Reset password

### Formations
- `GET /api/formations` - Get all formations
- `GET /api/formations/:id` - Get formation details
- `POST /api/formations` - Create formation (admin only)
- `PUT /api/formations/:id` - Update formation (admin only)
- `DELETE /api/formations/:id` - Delete formation (admin only)

### Registrations
- `POST /api/registrations` - Create registration (user)
- `GET /api/registrations` - Get user's registrations (protected)
- `GET /api/registrations` - Get all registrations (admin)

## 🐛 Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check `.env` file has correct configuration
- Verify port 5000 is not in use

### Frontend Issues
- Clear `node_modules` and reinstall: `rm -r node_modules && npm install`
- Clear browser cache (Ctrl+Shift+Delete)
- Check that backend is running on `http://localhost:5000`

### CORS Errors
- Verify CORS is enabled in backend
- Check frontend is making requests to correct backend URL

## 📄 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 👥 Contributors

- Project Lead: [AMARA Montaha - Software Engineer ]

---

**Happy Coding! 🚀**
