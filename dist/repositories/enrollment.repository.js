import pool from '../config/database.js';
import { EnrollmentModel } from '../models/enrollment.medel.js';
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
    async findByStudentId(studentId) {
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
    async findByCourseId(courseId) {
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
    async create(data) {
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
    async delete(id) {
        const result = await pool.query('DELETE FROM enrollments WHERE id = $1 RETURNING id', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    async createTableIfNotExists() {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS enrollments (
          id SERIAL PRIMARY KEY,
          student_id INT NOT NULL,
          course_id INT NOT NULL,
          enrollment_date DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
          CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
        );
      `);
            await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enrollments' AND column_name='enrollment_date') THEN
            ALTER TABLE enrollments ADD COLUMN enrollment_date DATE DEFAULT CURRENT_DATE;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enrollments' AND column_name='created_at') THEN
            ALTER TABLE enrollments ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enrollments' AND column_name='updated_at') THEN
            ALTER TABLE enrollments ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
            console.log('✅ Enrollments table is ready');
        }
        catch (error) {
            console.error('❌ Error creating enrollments table:', error);
        }
    }
}
