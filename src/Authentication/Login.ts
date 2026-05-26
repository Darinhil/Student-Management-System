/**
 * Login Example
 * 
 * POST /api/auth/login
 * 
 * This endpoint allows users to log in and receive a JWT token.
 * 
 * Request:
 * {
 *   "usernameOrEmail": "john_doe",
 *   "password": "password123"
 * }
 * 
 * Response (200):
 * {
 *   "success": true,
 *   "message": "Login successful",
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
 * Error Response (401):
 * {
 *   "success": false,
 *   "message": "Invalid credentials"
 * }
 * 
 * Notes:
 * - Use the returned token in the Authorization header for protected endpoints
 * - Format: Authorization: Bearer <token>
 * - Token expires after the configured JWT_EXPIRY duration (default: 7 days)
 */

export const loginExample = {};
