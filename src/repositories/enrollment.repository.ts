import pool from '../config/database.js';
import { EnrollmentModel } from '../models/enrollment.medel.js';
import { CreateEnrollmentDto } from '../interfaces/enrollment.interface.js';

export class EnrollmentRepository {

  async findAll() {
    const query = `
      SELECT 
        id, 
        student_id, 
        course_id, 
        TO_CHAR(enrollment_date, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as enrollment_date
      FROM enrollments 
      ORDER BY id DESC
    `;
    const result = await pool.query(query);
    return result.rows.map(row => new EnrollmentModel(row));
  }

  async findByStudentId(studentId: number) {
    const query = `
      SELECT 
        id, 
        student_id, 
        course_id, 
        TO_CHAR(enrollment_date, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as enrollment_date
      FROM enrollments 
      WHERE student_id = $1
      ORDER BY id DESC
    `;
    const result = await pool.query(query, [studentId]);
    return result.rows.map(row => new EnrollmentModel(row));
  }

  async findByCourseId(courseId: number) {
    const query = `
      SELECT 
        id, 
        student_id, 
        course_id, 
        TO_CHAR(enrollment_date, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as enrollment_date
      FROM enrollments 
      WHERE course_id = $1
      ORDER BY id DESC
    `;
    const result = await pool.query(query, [courseId]);
    return result.rows.map(row => new EnrollmentModel(row));
  }

  async create(data: CreateEnrollmentDto) {
    const query = `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING 
        id, 
        student_id, 
        course_id, 
        TO_CHAR(enrollment_date, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as enrollment_date
    `;
    const result = await pool.query(query, [data.student_id, data.course_id]);
    return new EnrollmentModel(result.rows[0]);
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM enrollments WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }
}