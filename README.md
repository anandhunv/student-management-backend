# Student Management System - Backend

This is the **backend** of the Student Management System application. It is built using **Node.js**, **Express**, and **MongoDB**, and supports secure authentication, role-based access control, and CRUD operations for students and staff.

## 🚀 Deployment

### 🔗 Hosted Application:
Frontend: [https://student-management-frontend-peach.vercel.app](https://student-management-frontend-peach.vercel.app)  
Backend: [https://student-management-backend-6ecp.onrender.com](https://student-management-backend-6ecp.onrender.com)

---

## 👥 Roles and Credentials

### 🔐 Super Admin (default user)
- **Email:** `admin@gmail.com`
- **Password:** `123456`

### 👤 Staff User
- **Email:** `staff@gmail.com`
- **Password:** `123456`

> 📝 Super Admin can manage both students and staff, and assign permissions to staff users.

---

## ⚙️ Features

- Super Admin login & full access
- Staff login with limited permissions
- Student CRUD (Create, Read, Update, Delete)
- Staff CRUD + permission control
- Role-based access control via JWT
- Token Refresh via cookies (access & refresh tokens)
- Request-based permission system for staff

---

## 🔐 Token Management

- **Access Token**
  - Stored in: `httpOnly` cookie
  - Expires in: `15 minutes`
  - Sent automatically with each request for authentication

- **Refresh Token**
  - Stored in: `httpOnly` cookie
  - Expires in: `7 days`
  - Used to issue new access tokens when expired

💡 On every protected API call:
- The backend checks for a valid `accessToken`
- If expired and a valid `refreshToken` exists, a new `accessToken` is generated

---

## 🧪 API Routes

### 🔑 Authentication

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/api/auth/login`       | Login user (admin/staff)           |
| GET    | `/api/auth/profile`     | Get logged-in user profile         |

### 🧍 Student Management

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/api/students`         | Add student (if permitted)         |
| GET    | `/api/students`         | List all students                  |
| PUT    | `/api/students/:id`     | Edit student (if permitted)        |
| DELETE | `/api/students/:id`     | Delete student (if permitted)      |

### 👨‍🏫 Staff Management

| Method | Endpoint                        | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/api/staff`                    | Add new staff (admin only)         |
| GET    | `/api/staff`                    | View staff members                 |
| PUT    | `/api/staff/:id`                | Edit staff details                 |
| PUT    | `/api/staff/permissions/:id`    | Update staff permissions           |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/student-management-backend.git
cd student-management-backend

````
### 2. Install Dependencies

```

npm install

```

### 3. Configure Environment Variables

```

PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_token_secret
CLIENT_URL=https://student-management-frontend-peach.vercel.app

```

### 4. Run Server

```
 # For development
npm run dev

# For production
npm start

```

