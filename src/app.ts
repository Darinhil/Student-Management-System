import express from 'express';
import studentRoutes from './routes/student.routes.ts';
import attendanceRoutes from './routes/attendance.routes.ts';
import { AttendanceRepository } from './repositories/attendance.repository.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Tables
const initDB = async () => {
  try {
    const attendanceRepo = new AttendanceRepository();
    await attendanceRepo.createTableIfNotExists();
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('Database init error:', error);
  }
};

initDB();

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/attendances', attendanceRoutes);

app.get('/', (req, res) => {
  res.json({ message: '✅ Server is running!' });
});

export default app;