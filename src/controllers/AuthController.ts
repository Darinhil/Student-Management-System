import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    res.status(201).json(new ApiResponse(201, null, 'User registered'));
  }

  async login(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, { token: 'stub-token' }, 'Logged in'));
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Logged out'));
  }
}

export default AuthController;
