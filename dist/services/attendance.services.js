import { AttendanceRepository } from '../repositories/attendance.repository.js';
export class AttendanceService {
    repository;
    constructor() {
        this.repository = new AttendanceRepository();
    }
    async getAllAttendances() { return this.repository.findAll(); }
    async getByStudent(studentId) { return this.repository.findByStudentId(studentId); }
    async getByCourse(courseId) { return this.repository.findByCourseId(courseId); }
    async getByDate(date) { return this.repository.findByDate(date); }
    async createAttendance(data) { return this.repository.create(data); }
    async updateAttendance(id, data) { return this.repository.update(id, data); }
}
