import { app } from './app.js';
import pool from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || 'localhost';
const startServer = async () => {
    try {
        // 1. Verify database connection
        console.log('Checking database connection...');
        const result = await pool.query('SELECT NOW()');
        console.log('✓ Database connection verified');
        console.log('✓ Database time:', result.rows[0]);
        // 2. Start Express server
        const server = app.listen(PORT, HOST, () => {
            console.log(`Server is running at http://${HOST}:${PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
    }
};
// Start the server
startServer();
