import type { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class TeacherController {
  private teacherService: TeacherService;

  // Allow dependency injection of TeacherService for testing/mocking
  constructor(teacherService?: TeacherService) {
    this.teacherService = teacherService ?? new TeacherService();
  }

  async getAllTeachers(req: Request, res: Response): Promise<void> {
    try {
      const teachers = await this.teacherService.getAllTeachers();
      res.status(200).json(
        new ApiResponse(200, teachers, 'Teachers retrieved successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        new ApiResponse(500, null, error.message || 'Failed to retrieve teachers')
      );
    }
  }

  async getTeacherById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params || {};
      if (!id) {
        res.status(400).json(new ApiResponse(400, null, 'Teacher id param is required'));
        return;
      }

      const numericId = Number(id);
      if (!Number.isFinite(numericId) || Number.isNaN(numericId)) {
        res.status(400).json(new ApiResponse(400, null, 'Teacher id must be a number'));
        return;
      }

      const teacher = await this.teacherService.getTeacherById(numericId);

      if (!teacher) {
        res.status(404).json(
          new ApiResponse(404, null, 'Teacher not found')
        );
        return;
      }

      res.status(200).json(
        new ApiResponse(200, teacher, 'Teacher retrieved successfully')
      );
    } catch (error: any) {
      const msg = (error && (error.message || String(error))) || 'Unknown error';
      // log for debugging
      // eslint-disable-next-line no-console
      console.error('getTeacherById error:', msg);
      res.status(400).json(new ApiResponse(400, null, msg));
    }
  }

  async createTeacher(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) {
        res.status(400).json(new ApiResponse(400, null, 'Request body is required'));
        return;
      }

      const { userId, firstName, lastName, departmentId } = req.body as any;

      const teacher = await this.teacherService.createTeacher({
        userId,
        firstName,
        lastName,
        departmentId,
      });

      res.status(201).json(
        new ApiResponse(201, teacher, 'Teacher created successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        new ApiResponse(400, null, error.message)
      );
    }
  }

  async updateTeacher(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!req.body) {
        res.status(400).json(new ApiResponse(400, null, 'Request body is required'));
        return;
      }

      const { firstName, lastName, departmentId } = req.body as any;

      const teacher = await this.teacherService.updateTeacher(Number(id), {
        firstName,
        lastName,
        departmentId,
      });

      if (!teacher) {
        res.status(404).json(
          new ApiResponse(404, null, 'Teacher not found')
        );
        return;
      }

      res.status(200).json(
        new ApiResponse(200, teacher, 'Teacher updated successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        new ApiResponse(400, null, error.message)
      );
    }
  }

  async deleteTeacher(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.teacherService.deleteTeacher(Number(id));

      if (!success) {
        res.status(404).json(
          new ApiResponse(404, null, 'Teacher not found')
        );
        return;
      }

      res.status(200).json(
        new ApiResponse(200, { id: Number(id) }, 'Teacher deleted successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        new ApiResponse(400, null, error.message)
      );
    }
  }

  async getTeachersByDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { deptId } = req.params;
      const teachers = await this.teacherService.getTeachersByDepartment(Number(deptId));

      res.status(200).json(
        new ApiResponse(200, teachers, 'Teachers by department retrieved successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        new ApiResponse(400, null, error.message)
      );
    }
  }
}
