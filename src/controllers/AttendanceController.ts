import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class AttendanceController {
  async getAttendanceRecords(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, [], 'Attendance records'));
  }

  async getAttendanceById(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Attendance record'));
  }

  async markAttendance(req: Request, res: Response): Promise<void> {
    res.status(201).json(new ApiResponse(201, null, 'Attendance marked'));
  }

  async updateAttendance(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Attendance updated'));
  }

  async deleteAttendance(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Attendance deleted'));
  }

  async getStudentAttendanceReport(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, [], 'Student attendance report'));
  }
}

export default AttendanceController;
