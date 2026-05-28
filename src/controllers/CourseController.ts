import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';

export class CourseController {
  async getAllCourses(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, [], 'Courses retrieved'));
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Course retrieved'));
  }

  async createCourse(req: Request, res: Response): Promise<void> {
    res.status(201).json(new ApiResponse(201, null, 'Course created'));
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Course updated'));
  }

  async deleteCourse(req: Request, res: Response): Promise<void> {
    res.status(200).json(new ApiResponse(200, null, 'Course deleted'));
  }
}

export default CourseController;
