import { BaseController } from '../base/BaseController.js';
import { AuthService } from '../services/AuthService.js';
export class AuthController extends BaseController {
    authService = new AuthService();
    // POST /api/auth/register
    async register(req, res) {
        await this.handleAsyncError(res, async () => {
            const body = req.body;
            if (!body || typeof body !== 'object') {
                this.sendError(res, 'Request body is required (send JSON with Content-Type: application/json)', 400);
                return;
            }
            const { username, email, password, role } = body;
            const result = await this.authService.register(username, email, password, role);
            this.sendSuccess(res, {
                user: result.user,
                token: result.token,
            }, 'User registered successfully', 201);
        });
    }
    // POST /api/auth/login
    async login(req, res) {
        await this.handleAsyncError(res, async () => {
            const body = req.body;
            if (!body || typeof body !== 'object') {
                this.sendError(res, 'Request body is required (send JSON with Content-Type: application/json)', 400);
                return;
            }
            const { username, email, password } = body;
            const identifier = username ?? email;
            if (!identifier || !password) {
                this.sendError(res, 'Username/email and password are required', 400);
                return;
            }
            const isEmail = identifier.includes('@');
            const result = await this.authService.login(isEmail ? undefined : identifier, isEmail ? identifier : undefined, password);
            this.sendSuccess(res, {
                user: result.user,
                token: result.token,
            }, 'Login successful', 200);
        });
    }
    // GET /api/auth/profile
    async getProfile(req, res) {
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
    async logout(req, res) {
        await this.handleAsyncError(res, async () => {
            const userId = req.user?.id;
            if (userId) {
                await this.authService.logout(userId);
            }
            this.sendSuccess(res, null, 'Logged out successfully', 200);
        });
    }
}
