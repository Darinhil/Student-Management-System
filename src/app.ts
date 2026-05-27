import express from 'express';
import studentRoutes from './routes/student.routes.js';
import { StudentRepository } from './repositories/student.repository.js';
import enrollmentRoutes from './routes/enrollment.route.js';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database Table
const initDB = async () => {
  try {
    const repo = new StudentRepository();
    await repo.createTableIfNotExists();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

initDB();

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
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


import type { Request, Response } from 'express';
import logger from './utils/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authRoutes, departmentRoutes } from './routes/index.js';

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use((req: Request, res: Response) => {
  logger.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Users not found',
    path: req.path,
  });
});

app.use(errorMiddleware);

export default app;
