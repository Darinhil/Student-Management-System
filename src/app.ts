import express from 'express';
import type { Request, Response } from 'express';
import logger from './utils/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authRoutes, departmentRoutes } from './routes/index.js';

const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
