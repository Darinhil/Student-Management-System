import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class StudentController {
  async getAllStudents(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, [], 'Students retrieved'));
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Student retrieved'));
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    res.status(201).json(new ApiResponse(201, null, 'Student created'));
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Student updated'));
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Student deleted'));
  }
}

export default StudentController;
