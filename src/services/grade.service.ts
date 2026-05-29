import pool from '../config/database.js'
import type { CreateGradeDto, UpdateGradeDto } from '../interfaces/grade.interface.js'

export class GradeService {
    async create(data:CreateGradeDto) {
        const query = ` INSERT INTO grades (student_id, course_id, score) VALUES ($1, $2, $3) RETURNING *;`;
        const values = [
            data.student_id, 
            data.course_id, 
            data.score];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async findAll() {
        const result = await pool.query(
            `SELECT * FROM grades;`
        );
        return result.rows
    }

    async findByStudent(studentId:number) {
        const result = await pool.query(
            `SELECT * FROM grades WHERE student_id = $1;`,
            [studentId]
        );
        return result.rows
    }

    async findByCourse(courseId:number) {
        const result = await pool.query(
            `SELECT * FROM grades WHERE course_id = $1;`,
            [courseId]
        );
        return result.rows
    }

    async findById(id: number) {
        const result = await pool.query(
            `SELECT * FROM grades WHERE id = $1;`,
            [id]
        );
        return result.rows[0];
    }
    
    async update(id:number, data:UpdateGradeDto) {
        const query = ` UPDATE grades SET 
            student_id = COALESCE($1, student_id),
            course_id = COALESCE($2, course_id),
            score = COALESCE($3, score),
            updated_at = NOW()
            WHERE id = $4 RETURNING *;`;
        const values = [
            data.student_id,
            data.course_id,
            data.score, id];

        const result = await pool.query(query, values)
        return result.rows[0];
    }
    
    async delete(id:number) {
        await pool.query(
            `DELETE FROM grades WHERE id = $1;`,
            [id]
        );
        return true;
    }
}