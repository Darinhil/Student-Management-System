import express from 'express';
import studentRoutes from './routes/student.routes.ts';
import { StudentRepository } from './repositories/student.repository.ts';
import enrollmentRoutes from './routes/enrollment.route.ts';
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

export default app;