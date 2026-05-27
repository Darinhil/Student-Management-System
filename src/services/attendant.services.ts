import { AttendanceRepository } from '../repositories/attendent.repository.js';
import { Attendance, CreateAttendanceDto, UpdateAttendanceDto } from '../interfaces/attendent.interface.js';

export class AttendanceService {
  private repository: AttendanceRepository;

  constructor() {
    this.repository = new AttendanceRepository();
  }

  async getAll() { return this.repository.findAll(); }
  async getByStudent(studentId: number) { return this.repository.findByStudentId(studentId); }
  async getByCourse(courseId: number) { return this.repository.findByCourseId(courseId); }
  async getByDate(date: string) { return this.repository.findByDate(date); }
  async create(data: CreateAttendanceDto) { return this.repository.create(data); }
  async update(id: number, data: UpdateAttendanceDto) { return this.repository.update(id, data); }
}