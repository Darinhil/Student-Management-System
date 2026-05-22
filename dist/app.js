import express from 'express';
import logger from './utils/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
export const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// Import and register route modules here
// app.use('/api/students', studentRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/departments', departmentRoutes);
app.use((req, res) => {
    logger.warn(`404 Not Found: ${req.method} ${req.path}`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
    });
});
app.use(errorMiddleware);
export default app;
