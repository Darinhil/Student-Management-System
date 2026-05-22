import { BaseRepository } from '../base/BaseRepository.js';
import { Attendance } from '../models/Attendance.js';
import { db } from '../config/database.js';

export class AttendanceRepository extends BaseRepository<Attendance> {
  protected tableName = 'attendances';

  async create(attendance: Partial<Attendance>): Promise<Attendance> {
    const query = `
      INSERT INTO attendances (student_id, course_id, date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [
      attendance.studentId,
      attendance.courseId,
      attendance.date,
      attendance.status
    ];
    
    const result = await db.query(query, params);
    return new Attendance(result.rows[0]);
  }

  async findByCourseAndDate(courseId: number, date: Date | string): Promise<Attendance[]> {
    const query = `SELECT * FROM attendances WHERE course_id = $1 AND date = $2`;
    const result = await db.query(query, [courseId, date]);
    return result.rows.map((row: any) => new Attendance(row));
  }

  async findByStudentId(studentId: number): Promise<Attendance[]> {
    const query = `SELECT * FROM attendances WHERE student_id = $1 ORDER BY date DESC`;
    const result = await db.query(query, [studentId]);
    return result.rows.map((row: any) => new Attendance(row));
  }
}
