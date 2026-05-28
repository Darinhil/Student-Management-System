import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class DepartmentController {
  async getAllDepartments(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, [], 'Departments retrieved'));
  }

  async getDepartmentById(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Department retrieved'));
  }

  async createDepartment(req: Request, res: Response): Promise<void> {
    res.status(201).json(new ApiResponse(201, null, 'Department created'));
  }

  async updateDepartment(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Department updated'));
  }

  async deleteDepartment(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Department deleted'));
  }
}

export default DepartmentController;
