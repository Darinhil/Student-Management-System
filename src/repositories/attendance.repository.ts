import pool from '../config/database.js';
import type { Attendance, CreateAttendanceDto, UpdateAttendanceDto } from '../interfaces/attendance.interface.js';

export class AttendanceRepository {

  async findAll(): Promise<Attendance[]> {
    try {
      const query = `
        SELECT 
          id, 
          student_id, 
          course_id, 
          status,
          TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
        FROM attendances 
        ORDER BY id DESC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      console.error('FindAll Error:', error.message);
      throw error;
    }
  }

  async findByStudentId(studentId: number): Promise<Attendance[]> {
    const query = `
      SELECT id, student_id, course_id, status,
             TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
      FROM attendances 
      WHERE student_id = $1
      ORDER BY date DESC
    `;
    const result = await pool.query(query, [studentId]);
    return result.rows;
  }

  async findByCourseId(courseId: number): Promise<Attendance[]> {
    const query = `
      SELECT id, student_id, course_id, status,
             TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
      FROM attendances 
      WHERE course_id = $1
      ORDER BY date DESC
    `;
    const result = await pool.query(query, [courseId]);
    return result.rows;
  }

  async findByDate(date: string): Promise<Attendance[]> {
    const query = `
      SELECT id, student_id, course_id, status,
             TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
      FROM attendances 
      WHERE date = $1
      ORDER BY student_id
    `;
    const result = await pool.query(query, [date]);
    return result.rows;
  }

  async create(data: CreateAttendanceDto): Promise<Attendance> {
    const query = `
      INSERT INTO attendances (student_id, course_id, date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id, student_id, course_id, status,
                TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
    `;
    try {
      const result = await pool.query(query, [
        data.student_id,
        data.course_id,
        data.attendance_date,
        data.status || 'present'
      ]);
      return result.rows[0];
    } catch (error: any) {
      console.error('❌ Attendance.create Error:', error.message, { query, params: [data.student_id, data.course_id, data.attendance_date, data.status] });
      throw error;
    }
  }

  async update(id: number, data: UpdateAttendanceDto): Promise<Attendance | null> {
    const query = `
      UPDATE attendances
      SET status = $1
      WHERE id = $2
      RETURNING id, student_id, course_id, status,
                TO_CHAR(date, 'YYYY-MM-DD') as attendance_date
    `;
    try {
      const result = await pool.query(query, [data.status, id]);
      return result.rows[0] || null;
    } catch (error: any) {
      console.error('❌ Attendance.update Error:', error.message, { query, params: [data.status, id] });
      throw error;
    }
  }

  async createTableIfNotExists() {
    try {
      console.log();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS attendances (
          id SERIAL PRIMARY KEY,
          student_id INT NOT NULL,
          course_id INT NOT NULL,
          date DATE,
          status VARCHAR(20) DEFAULT 'present',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT fk_attendance_student 
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
          
          CONSTRAINT fk_attendance_course 
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          
          CONSTRAINT unique_student_course_date 
            UNIQUE (student_id, course_id, date)
        );
      `);
      try {
        const statusesRes = await pool.query(`SELECT DISTINCT status FROM attendances;`);
        const statuses = statusesRes.rows.map((r: any) => r.status);

        const valid = ['present', 'absent', 'late'];
        const invalid = statuses.filter((s: any) => s !== null && !valid.includes(s));
        if (invalid.length > 0) {
          console.warn('⚠️ Found invalid attendance.status values, normalizing to "present":', invalid);
          await pool.query(`UPDATE attendances SET status = 'present' WHERE status IS NULL OR status = '' OR status NOT IN ('present','absent','late');`);
          console.log('');
        }

        await pool.query(`ALTER TABLE attendances DROP CONSTRAINT IF EXISTS attendances_status_check;`);
        await pool.query(`ALTER TABLE attendances ADD CONSTRAINT attendances_status_check CHECK (status IN ('present','absent','late'));`);
        console.log('');
      } catch (constraintErr: any) {
        console.error('❌ Error ensuring attendances_status_check constraint:', constraintErr.message);
      }

      await pool.query(`
        DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'attendances' AND column_name = 'attendance_date'
          ) AND NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'attendances' AND column_name = 'date'
          ) THEN
            ALTER TABLE attendances RENAME COLUMN attendance_date TO date;
          END IF;
        END $$;
      `);

      console.log('');
    } catch (error) {
      console.error('❌ Error initializing attendances table:', error);
    }
  }
}