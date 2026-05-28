import { Teacher } from '../models/Teacher.js';
import { TeacherRepository } from '../repositories/TeacherRepository.js';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.findAll();
  }

  async getTeacherById(id: number): Promise<Teacher | null> {
    if (!id && id !== 0) {
      throw new Error('Teacher ID is required');
    }

    if (!Number.isFinite(id) || Number.isNaN(id)) {
      throw new Error('Teacher ID must be a number');
    }

    return this.teacherRepository.findById(id);
  }

  async createTeacher(data: Partial<Teacher>): Promise<Teacher> {
    // Validate required fields
    if (!data.userId || !data.firstName || !data.lastName || !data.departmentId) {
      throw new Error('Missing required fields: userId, firstName, lastName, departmentId');
    }

    const teacher = new Teacher(data);
    return this.teacherRepository.create(teacher);
  }

  async updateTeacher(id: number, data: Partial<Teacher>): Promise<Teacher | null> {
    if (!id) {
      throw new Error('Teacher ID is required');
    }

    const existing = await this.teacherRepository.findById(id);
    if (!existing) {
      return null;
    }

    return this.teacherRepository.update(id, data);
  }

  async deleteTeacher(id: number): Promise<boolean> {
    if (!id) {
      throw new Error('Teacher ID is required');
    }

    const existing = await this.teacherRepository.findById(id);
    if (!existing) {
      return false;
    }

    return this.teacherRepository.delete(id);
  }

  async getTeachersByDepartment(departmentId: number): Promise<Teacher[]> {
    if (!departmentId) {
      throw new Error('Department ID is required');
    }
    return this.teacherRepository.findByDepartment(departmentId);
  }
}
