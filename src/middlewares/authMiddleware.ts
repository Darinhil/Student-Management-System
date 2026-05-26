import type { Request, Response, NextFunction,} from 'express';
import { verifyToken } from '../utils/jwt.js';

// Authentication middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {

    // Get Authorization header
    const authHeader =
      req.headers.authorization ||
      req.header('Authorization') ||
      (req.header('x-access-token') ?? undefined) ||
      (req.header('x-auth-token') ?? undefined);

    // Check if header exists
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing Authorization header',
      });
      return;
    }

    // Accept either:
    // - "Bearer <token>" (recommended)
    // - "<token>" (fallback for simple clients)
    const parts = authHeader.trim().split(/\s+/);
    const scheme = parts[0]?.toLowerCase().replace(/:$/, '');
    let token =
      parts.length === 1 ? parts[0] : parts.length === 2 && scheme === 'bearer' ? parts[1] : null;

    // Strip accidental surrounding quotes: Bearer "<token>"
    if (token) token = token.replace(/^["'](.+)["']$/, '$1');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Invalid Authorization format. Use: Bearer <token>',
      });
      return;
    }

    // Verify JWT token
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
      return;
    }

    // Attach user payload to request
    req.user = payload;

    // Continue
    next();

  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};
