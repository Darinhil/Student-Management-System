import { EnrollmentRepository } from '../repositories/enrollment.repository.ts';
import { CreateEnrollmentDto } from '../interfaces/enrollment.interface.ts';
import { EnrollmentModel } from '../models/enrollment.medel.ts';

export class EnrollmentService {
  private repository: EnrollmentRepository;

  constructor() {
    this.repository = new EnrollmentRepository();
  }

  async getAllEnrollments(): Promise<EnrollmentModel[]> {
    return this.repository.findAll();
  }

  async getEnrollmentsByStudent(studentId: number): Promise<EnrollmentModel[]> {
    return this.repository.findByStudentId(studentId);
  }

  async getEnrollmentsByCourse(courseId: number): Promise<EnrollmentModel[]> {
    return this.repository.findByCourseId(courseId);
  }

  async createEnrollment(data: CreateEnrollmentDto): Promise<EnrollmentModel> {
    return this.repository.create(data);
  }

  async deleteEnrollment(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}