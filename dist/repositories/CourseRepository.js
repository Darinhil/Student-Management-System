import { BaseRepository } from '../base/BaseRepository.js';
import { Course } from '../models/Course.js';
import { db } from '../config/database.js';
export class CourseRepository extends BaseRepository {
    tableName = 'courses';
    async create(course) {
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
    async findByTeacherId(teacherId) {
        const query = `SELECT * FROM courses WHERE teacher_id = $1`;
        const result = await db.query(query, [teacherId]);
        return result.rows.map((row) => new Course(row));
    }
}
