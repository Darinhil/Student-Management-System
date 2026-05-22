import { Router, Request, Response } from 'express';
import { StudentController } from '../controllers/StudentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const studentController = new StudentController();

/**
 * Student Routes
 * Protected routes - require authentication
 */

// Get all students (admin/teacher only)
router.get('/', authMiddleware, roleMiddleware(['admin', 'teacher']), (req: Request, res: Response) =>
  studentController.getAllStudents(req, res)
);

// Get student by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) =>
  studentController.getStudentById(req, res)
);

// Create new student (admin only)
router.post('/', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  studentController.createStudent(req, res)
);

// Update student (admin/own student)
router.put('/:id', authMiddleware, (req: Request, res: Response) =>
  studentController.updateStudent(req, res)
);

// Delete student (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  studentController.deleteStudent(req, res)
);

export default router;
