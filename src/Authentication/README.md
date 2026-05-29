# Authentication APIs Documentation

## Endpoints

### 1. POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // optional, default: "student"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "student",
      "created_at": "2024-05-22T10:00:00Z",
      "updated_at": "2024-05-22T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- Username: minimum 3 characters, must be unique
- Email: valid email format, must be unique
- Password: minimum 8 characters
- Role: optional, defaults to "student"

---

### 2. POST /api/auth/login
Login with username/email and password

**Request Body:**
```json
{
  "usernameOrEmail": "john_doe",  // or email
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "student",
      "created_at": "2024-05-22T10:00:00Z",
      "updated_at": "2024-05-22T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. GET /api/auth/profile
Get current user profile (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "student",
    "created_at": "2024-05-22T10:00:00Z",
    "updated_at": "2024-05-22T10:00:00Z"
  }
}
```

---

### 4. POST /api/auth/logout
Logout user (requires authentication)

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

## Error Responses

All endpoints return errors with appropriate HTTP status codes:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Error Codes:**
- 400 Bad Request: Missing/invalid fields
- 401 Unauthorized: Invalid credentials or missing token
- 409 Conflict: Username/email already exists

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 2. Configure Environment Variables
Add to your `.env` file:
```
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d
```

### 3. Database Schema
Ensure your `users` table has the following columns:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Usage Examples

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "john_doe",
    "password": "password123"
  }'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Architecture

The authentication system follows clean architecture principles:

1. **Routes** (`authRoutes.ts`): HTTP endpoint mapping
2. **Controller** (`AuthController.ts`): Request/response handling
3. **Service** (`AuthService.ts`): Business logic & validation
4. **Middleware** (`authMiddleware.ts`): JWT token verification
5. **Utils** (`jwt.ts`): Token generation/verification
