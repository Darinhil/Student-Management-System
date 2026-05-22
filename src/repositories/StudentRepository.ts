import { BaseRepository } from '../base/BaseRepository.js';
import { Student } from '../models/Student.js';
import { db } from '../config/database.js';

export class StudentRepository extends BaseRepository<Student> {
  protected tableName = 'students';

  async create(student: Partial<Student>): Promise<Student> {
    const query = `
      INSERT INTO students (user_id, first_name, last_name, department_id, enrollment_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const params = [
      student.userId,
      student.firstName,
      student.lastName,
      student.departmentId,
      student.enrollmentDate || null
    ];
    
    const result = await db.query(query, params);
    return new Student(result.rows[0]);
  }

  async update(id: number, data: Partial<Student>): Promise<Student | null> {
    const query = `
      UPDATE students 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          department_id = COALESCE($3, department_id),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *;
    `;
    const params = [
      data.firstName,
      data.lastName,
      data.departmentId,
      id
    ];
    
    const result = await db.query(query, params);
    if (!result.rows[0]) return null;
    return new Student(result.rows[0]);
  }
}
