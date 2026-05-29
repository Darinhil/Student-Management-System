import jwt, {} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET ||
    'your-secret-key-change-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
// Generate JWT token
export const generateToken = (payload) => {
    const options = {
        expiresIn: JWT_EXPIRY,
    };
    return jwt.sign(payload, JWT_SECRET, options);
};
// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
};
// Decode token without verification
export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    }
    catch (error) {
        return null;
    }
};
