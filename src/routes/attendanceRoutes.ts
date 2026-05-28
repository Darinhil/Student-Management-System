import { Router } from 'express';
import type { Request, Response } from 'express';
import { AttendanceController } from '../controllers/AttendanceController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const attendanceController = new AttendanceController();

/**
 * Attendance Routes
 * Protected routes - require authentication
 */

// Get attendance records (filtered by course and date)
router.get('/', authMiddleware, (req: Request, res: Response) =>
  attendanceController.getAttendanceRecords(req, res)
);

// Get attendance by ID
router.get('/:id', authMiddleware, (req: Request, res: Response) =>
  attendanceController.getAttendanceById(req, res)
);

// Mark attendance (teacher only)
router.post('/', authMiddleware, roleMiddleware(['teacher']), (req: Request, res: Response) =>
  attendanceController.markAttendance(req, res)
);

// Update attendance (teacher only)
router.put('/:id', authMiddleware, roleMiddleware(['teacher']), (req: Request, res: Response) =>
  attendanceController.updateAttendance(req, res)
);

// Delete attendance record (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) =>
  attendanceController.deleteAttendance(req, res)
);

// Get attendance report for a student
router.get('/student/:studentId', authMiddleware, (req: Request, res: Response) =>
  attendanceController.getStudentAttendanceReport(req, res)
);

export default router;
