import { StudentRepository } from '../repositories/student.repository.js';
export class StudentService {
    repository;
    constructor() {
        this.repository = new StudentRepository();
    }
    async getAllStudents() { return this.repository.findAll(); }
    async getStudentById(id) { return this.repository.findById(id); }
    async createStudent(data) { return this.repository.create(data); }
    async updateStudent(id, data) { return this.repository.update(id, data); }
    async deleteStudent(id) { return this.repository.delete(id); }
    async searchStudents(name) { return this.repository.searchByName(name); }
    async getStudentsByDepartment(departmentId) { return this.repository.findByDepartment(departmentId); }
}
