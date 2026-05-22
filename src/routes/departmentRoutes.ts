import { Router, Request, Response } from 'express';
import { DepartmentController } from '../controllers/DepartmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const departmentController = new DepartmentController();

/**
 * Department Routes
 * Protected routes - require authentication
 */

// Get all departments
router.get('/', authMiddleware, (req: Request, res: Response) =>
  departmentController.getAllDepartments(req, res)
);

// Get department by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) =>
  departmentController.getDepartmentById(req, res)
);

// Create new department (admin only)
router.post('/', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  departmentController.createDepartment(req, res)
);

// Update department (admin only)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  departmentController.updateDepartment(req, res)
);

// Delete department (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  departmentController.deleteDepartment(req, res)
);

export default router;
