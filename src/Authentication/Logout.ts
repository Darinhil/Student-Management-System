/**
 * Logout Example
 * 
 * POST /api/auth/logout
 * 
 * This endpoint allows users to log out. Requires authentication.
 * 
 * Headers:
 * {
 *   "Authorization": "Bearer <jwt-token>"
 * }
 * 
 * Response (200):
 * {
 *   "success": true,
 *   "message": "Logged out successfully",
 *   "data": null
 * }
 * 
 * Error Response (401):
 * {
 *   "success": false,
 *   "message": "Unauthorized (missing Authorization header)"
 * }
 * 
 * Error Response (401):
 * {
 *   "success": false,
 *   "message": "Invalid or expired token"
 * }
 * 
 * Notes:
 * - This is a protected endpoint
 * - Requires valid JWT token in Authorization header
 * - Token should be removed from client-side storage after logout
 * - In a production environment, consider implementing token blacklisting
 */

export const logoutExample = {};
