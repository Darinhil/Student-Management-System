/**
 * Register Example
 * 
 * POST /api/auth/register
 * 
 * This endpoint allows users to create a new account.
 * 
 * Request:
 * {
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "password": "password123",
 *   "role": "student"
 * }
 * 
 * Response (201):
 * {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "data": {
 *     "user": {
 *       "id": 1,
 *       "username": "john_doe",
 *       "email": "john@example.com",
 *       "role": "student",
 *       "created_at": "2024-05-22T10:00:00Z",
 *       "updated_at": "2024-05-22T10:00:00Z"
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 * }
 * 
 * Validation:
 * - Username: min 3 chars, unique
 * - Email: valid email, unique
 * - Password: min 6 chars (will be hashed)
 * - Role: optional, defaults to 'student'
 */

export const registerExample = {};
