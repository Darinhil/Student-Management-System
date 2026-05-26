import { Router } from "express";
import { DepartmentController } from "../controllers/DepartmentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()
const departmentController = new DepartmentController();

// Public routes (read only)
router.get('/departments', departmentController.getAll.bind(departmentController));
router.get('/departments/:id', departmentController.getById.bind(departmentController));

// Protected routes (write operations)
router.post('/departments', authMiddleware, departmentController.create.bind(departmentController));
router.put('/departments/:id', authMiddleware, departmentController.update.bind(departmentController));
router.delete('/departments/:id', authMiddleware, departmentController.delete.bind(departmentController));

export default router;




