import { AttendanceRepository } from '../repositories/attendent.repository.js';
export class AttendanceService {
    attendanceRepository = new AttendanceRepository();
    async createAttendance(data) {
        return await this.attendanceRepository.create(data);
    }
    async getAllAttendances() {
        return await this.attendanceRepository.findAll();
    }
    async getAttendanceByStudent(studentId) {
        return await this.attendanceRepository.findByStudentId(studentId);
    }
    async getAttendanceByCourse(courseId) {
        return await this.attendanceRepository.findByCourseId(courseId);
    }
    async getAttendanceByDate(date) {
        return await this.attendanceRepository.findByDate(date);
    }
    async updateAttendance(id, data) {
        return await this.attendanceRepository.update(id, data);
    }
}
