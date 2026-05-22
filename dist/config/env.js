import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
export const env = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    db: {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password123',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
        database: process.env.DB_NAME || 'student_management',
    },
};
