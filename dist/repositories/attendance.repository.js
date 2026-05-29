import pool from '../config/database.js';
export class AttendanceRepository {
    async findAll() {
        const query = `
      SELECT id, student_id, course_id, date, status,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM attendances 
      ORDER BY date DESC, id DESC
    `;
        const result = await pool.query(query);
        return result.rows;
    }
    async findByStudentId(studentId) {
        const query = `
      SELECT id, student_id, course_id, date, status,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM attendances 
      WHERE student_id = $1
      ORDER BY date DESC
    `;
        const result = await pool.query(query, [studentId]);
        return result.rows;
    }
    async findByCourseId(courseId) {
        const query = `
      SELECT id, student_id, course_id, date, status,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM attendances 
      WHERE course_id = $1
      ORDER BY date DESC
    `;
        const result = await pool.query(query, [courseId]);
        return result.rows;
    }
    async findByDate(date) {
        const query = `
      SELECT id, student_id, course_id, date, status,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM attendances 
      WHERE date = $1
      ORDER BY student_id
    `;
        const result = await pool.query(query, [date]);
        return result.rows;
    }
    async create(data) {
        const query = `
      INSERT INTO attendances (student_id, course_id, date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id, student_id, course_id, date, status,
                TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
        const result = await pool.query(query, [
            data.student_id,
            data.course_id,
            data.date,
            data.status || 'present'
        ]);
        return result.rows[0];
    }
    async update(id, data) {
        const query = `
      UPDATE attendances 
      SET status = COALESCE($1, status),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, student_id, course_id, date, status,
                TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
        const result = await pool.query(query, [data.status, id]);
        return result.rows[0] || null;
    }
    async createTableIfNotExists() {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS attendances (
          id SERIAL PRIMARY KEY,
          student_id INT NOT NULL,
          course_id INT NOT NULL,
          date DATE NOT NULL,
          status VARCHAR(20) DEFAULT 'present',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          
          CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
          CONSTRAINT fk_attendance_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          CONSTRAINT unique_student_course_date UNIQUE (student_id, course_id, date)
        );
      `);
            await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='attendances' AND column_name='created_at') THEN
            ALTER TABLE attendances ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='attendances' AND column_name='updated_at') THEN
            ALTER TABLE attendances ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
            console.log('✅ Attendances table is ready');
        }
        catch (error) {
            console.error('❌ Error creating attendances table:', error);
        }
    }
}
