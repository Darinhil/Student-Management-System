import { Router } from 'express';
import type { Request, Response } from 'express';
import { TeacherController } from '../controllers/TeacherController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const teacherController = new TeacherController();

/**
 * Teacher Routes
 * Protected routes - require authentication
 */

// Get all teachers
router.get('/', authMiddleware, (req: Request, res: Response) =>
  teacherController.getAllTeachers(req, res)
);

// Get teacher by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) =>
  teacherController.getTeacherById(req, res)
);

// Get teachers by department
router.get('/department/:deptId', authMiddleware, (req: Request, res: Response) =>
  teacherController.getTeachersByDepartment(req, res)
);

// Create new teacher (admin only)
router.post('/', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  teacherController.createTeacher(req, res)
);

// Update teacher (admin only)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  teacherController.updateTeacher(req, res)
);

// Delete teacher (admin only) - Note: uses /v1/ in your spec
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  teacherController.deleteTeacher(req, res)
);

export default router;
