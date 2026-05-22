import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();
const authController = new AuthController();

/**
 * Authentication Routes
 */

// Public routes
router.post('/register', (req: Request, res: Response) => authController.register(req, res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));

// Protected routes
router.post('/logout', authMiddleware, (req: Request, res: Response) => authController.logout(req, res));

export default router;
