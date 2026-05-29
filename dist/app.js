import express from 'express';
import studentRoutes from './routes/student.routes.js';
import { StudentRepository } from './repositories/student.repository.js';
import { AttendanceRepository } from './repositories/attendance.repository.js';
import enrollmentRoutes from './routes/enrollment.route.js';
import attendanceRoutes from './routes/attendance.route.js';
import { UserRepository } from './repositories/UserRepository.js';
import { DepartmentRepository } from './repositories/DepartmentRepository.js';
import { CourseRepository } from './repositories/CourseRepository.js';
import { EnrollmentRepository } from './repositories/enrollment.repository.js';
import logger from './utils/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authRoutes, departmentRoutes } from './routes/index.js';
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Initialize Database Tables
const initDB = async () => {
    try {
        const userRepo = new UserRepository();
        await userRepo.createTableIfNotExists();
        const departmentRepo = new DepartmentRepository();
        await departmentRepo.createTableIfNotExists();
        const studentRepo = new StudentRepository();
        await studentRepo.createTableIfNotExists();
        const courseRepo = new CourseRepository();
        await courseRepo.createTableIfNotExists();
        const enrollmentRepo = new EnrollmentRepository();
        await enrollmentRepo.createTableIfNotExists();
        const attendanceRepo = new AttendanceRepository();
        await attendanceRepo.createTableIfNotExists();
    }
    catch (error) {
        console.error('Database initialization error:', error);
    }
};
initDB();
// Routes
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendances', attendanceRoutes);
// Health Check
app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully!',
        database: 'PostgreSQL',
        endpoints: {
            getAllStudents: 'GET /api/students'
        }
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
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
