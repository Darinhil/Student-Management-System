import { Router, Request, Response } from 'express';
import { CourseController } from '../controllers/CourseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const courseController = new CourseController();

/**
 * Course Routes
 * Protected routes - require authentication
 */

// Get all courses
router.get('/', authMiddleware, (req: Request, res: Response) =>
  courseController.getAllCourses(req, res)
);

// Get course by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) =>
  courseController.getCourseById(req, res)
);

// Create new course (admin/teacher only)
router.post('/', authMiddleware, roleMiddleware(['admin', 'teacher']), (req: Request, res: Response) =>
  courseController.createCourse(req, res)
);

// Update course (admin/course teacher only)
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'teacher']), (req: Request, res: Response) =>
  courseController.updateCourse(req, res)
);

// Delete course (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  courseController.deleteCourse(req, res)
);

export default router;
