import bcryptjs from 'bcryptjs';
import { db } from '../config/database.js';
import { generateToken} from '../utils/jwt.js';

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface JwtPayload{
  id: number;
  username: string;
  email: string;
  role: string;
  iss?: string | undefined;
}

export interface AuthResponse {
  user: Omit<UserData, 'password'>;
  token: string;
}

export class AuthService {

  //  Register a new user
  async register(username: string, email: string, password: string, role: string = 'student'): Promise<AuthResponse> {
    // Validation
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // Normalize inputs
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [normalizedUsername, normalizedEmail],
    );

    if (existingUser.rows.length > 0) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert user
    const result = await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [normalizedUsername, normalizedEmail, hashedPassword, role.toLowerCase()],
    );

    const user = result.rows[0] as UserData;

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }

  /**
   * Login user
   */
  async login(username? :string, email? : string, password?: string): Promise<AuthResponse> {
    
    // Validation

    if ((!username && !email) || !password) {
      throw new Error('Username/Email and password are required');
    }

    const normalizedInput = (username || email || '').trim().toLowerCase();

    // Find user
    const result = await db.query(
      `SELECT id, username, email, password, role
       FROM users
       WHERE username = $1 OR email = $1`,
      [normalizedInput],
    );

    const user = result.rows[0];

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Remove password 
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword as UserData,
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: number): Promise<UserData> {
    if (!userId || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    const result = await db.query('SELECT id, username, email, role FROM users WHERE id = $1', [
      userId,
    ]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0] as UserData;
  }

  /**
   * Logout (invalidate token on client side)
   */
  async logout(userId: number): Promise<void> {
    // Verify user exists
    const result = await db.query('SELECT id FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    // In a real application, you might want to:
    // 1. Add token to a blacklist
    // 2. Update a last_logout timestamp
    // 3. Revoke refresh tokens
    // For now, we just confirm the user exists
  }
}
