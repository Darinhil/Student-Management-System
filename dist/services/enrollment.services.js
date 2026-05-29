import { EnrollmentRepository } from '../repositories/enrollment.repository.js';
import { EnrollmentModel } from '../models/enrollment.medel.js';
export class EnrollmentService {
    repository;
    constructor() {
        this.repository = new EnrollmentRepository();
    }
    async getAllEnrollments() {
        return this.repository.findAll();
    }
    async getEnrollmentsByStudent(studentId) {
        return this.repository.findByStudentId(studentId);
    }
    async getEnrollmentsByCourse(courseId) {
        return this.repository.findByCourseId(courseId);
    }
    async createEnrollment(data) {
        return this.repository.create(data);
    }
    async deleteEnrollment(id) {
        return this.repository.delete(id);
    }
}
