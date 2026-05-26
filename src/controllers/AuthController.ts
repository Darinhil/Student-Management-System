import type { Request, Response } from 'express';
import { BaseController } from '../base/BaseController.js';
import type { LoginRequest, RegisterRequest } from '../interfaces/IAuth.js';
import { AuthService } from '../services/AuthService.js';

export class AuthController extends BaseController {
  private authService = new AuthService();

  // POST /api/auth/register
  async register(req: RegisterRequest, res: Response): Promise<void> {
    await this.handleAsyncError(res, async () => {
      const { username, email, password, role } = req.body;

      const result = await this.authService.register(username!, email!, password!, role);

      this.sendSuccess(
        res,
        {
          user: result.user,
          token: result.token,
        },
        'User registered successfully',
        201,
      );
    });
  }

  //  POST /api/auth/login
  async login(req: LoginRequest, res: Response): Promise<void> {
    await this.handleAsyncError(res, async () => {
      const { username, email, usernameOrEmail, password } = req.body;
      const identifier = usernameOrEmail ?? username ?? email;
      if (!identifier || !password) {
        this.sendError(res, 'Username/email and password are required', 400);
        return;
      }
      const result = await this.authService.login(identifier, '', password);

      this.sendSuccess(
        res,
        {
          user: result.user,
          token: result.token,
        },
        'Login successful',
        200,
      );
    });
  }
  // GET /api/auth/profile
  async getProfile(req: Request, res: Response): Promise<void> {
    await this.handleAsyncError(res, async () => {
      const userId = req.user?.id;
      if (!userId) {
        this.sendError(res, 'Unauthorized', 401);
        return;
      }

      const user = await this.authService.getProfile(userId);

      this.sendSuccess(res, user, 'Profile retrieved successfully', 200);
    });
  }

  // POST /api/auth/logout
  
  async logout(req: Request, res: Response): Promise<void> {
    await this.handleAsyncError(res, async () => {
      const userId = req.user?.id;
      if (userId) {
        await this.authService.logout(userId);
      }

      this.sendSuccess(res, null, 'Logged out successfully', 200);
    });
  }
}
