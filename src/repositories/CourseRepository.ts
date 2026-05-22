import { BaseRepository } from '../base/BaseRepository.js';
import { Course } from '../models/Course.js';
import { db } from '../config/database.js';

export class CourseRepository extends BaseRepository<Course> {
  protected tableName = 'courses';

  async create(course: Partial<Course>): Promise<Course> {
    const query = `
      INSERT INTO courses (name, code, credits, teacher_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [
      course.name,
      course.code,
      course.credits || 3,
      course.teacherId
    ];
    
    const result = await db.query(query, params);
    return new Course(result.rows[0]);
  }

  async findByTeacherId(teacherId: number): Promise<Course[]> {
    const query = `SELECT * FROM courses WHERE teacher_id = $1`;
    const result = await db.query(query, [teacherId]);
    return result.rows.map((row: any) => new Course(row));
  }
}
