import express from 'express';
import studentRoutes from './routes/student.routes.js';
import { StudentRepository } from './repositories/student.repository.js';
import { AttendanceRepository } from './repositories/attendance.repository.js';
import enrollmentRoutes from './routes/enrollment.route.js';
import gradeRoutes from './routes/grade.routes.js';
import logger from './utils/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authRoutes, departmentRoutes } from './routes/index.js';
import attendanceRoutes from './routes/attendance.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const initDB = async () => {
    try {
        const studentRepo = new StudentRepository();
        await studentRepo.createTableIfNotExists();
        const attendanceRepo = new AttendanceRepository();
        await attendanceRepo.createTableIfNotExists();
    }
    catch (error) {
        console.error('Database init error:', error);
    }
};
initDB();
app.use('/api/attendances', attendanceRoutes);
app.get('/', (req, res) => {
    res.json({
        message: '✅ Server is running!',
        available_routes: ['/api/students', '/api/enrollments', '/api/attendances']
    });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/grades', gradeRoutes);
app.use((req, res) => {
    logger.warn(`404 Not Found: ${req.method} ${req.path}`);
    res.status(404).json({
        success: false,
        message: 'Users not found',
        path: req.path,
    });
});
app.use(errorMiddleware);
export default app;
