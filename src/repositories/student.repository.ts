import pool from '../config/database.js';
import type { Student, CreateStudentDto, UpdateStudentDto } from '../interfaces/student.interfaces.js';

export class StudentRepository {

  async findAll(): Promise<Student[]> {
    const query = `
      SELECT id, user_id, first_name, last_name, department_id,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM students 
      ORDER BY id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id: number): Promise<Student | null> {
    const query = `
      SELECT id, user_id, first_name, last_name, department_id,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM students WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const query = `
      INSERT INTO students (user_id, first_name, last_name, department_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, first_name, last_name, department_id,
                TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
    const result = await pool.query(query, [
      data.user_id, data.first_name, data.last_name, data.department_id || null
    ]);
    return result.rows[0];
  }

  async update(id: number, data: UpdateStudentDto): Promise<Student | null> {
    const query = `
      UPDATE students 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          department_id = COALESCE($3, department_id),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, user_id, first_name, last_name, department_id,
                TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
    const result = await pool.query(query, [
      data.first_name, data.last_name, data.department_id, id
    ]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async searchByName(name: string): Promise<Student[]> {
    const query = `
      SELECT id, user_id, first_name, last_name, department_id,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM students 
      WHERE first_name ILIKE $1 OR last_name ILIKE $1
      ORDER BY id DESC
    `;
    const result = await pool.query(query, [`%${name}%`]);
    return result.rows;
  }

  async findByDepartment(departmentId: number): Promise<Student[]> {
    const query = `
      SELECT id, user_id, first_name, last_name, department_id,
             TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at,
             TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM students 
      WHERE department_id = $1
      ORDER BY id DESC
    `;
    const result = await pool.query(query, [departmentId]);
    return result.rows;
  }

  async createTableIfNotExists() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
          id SERIAL PRIMARY KEY,
          user_id INT UNIQUE NOT NULL,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          department_id INT,
          CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          CONSTRAINT fk_student_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
        );
      `);

      await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='created_at') THEN
            ALTER TABLE students ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='updated_at') THEN
            ALTER TABLE students ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
      console.log('✅ Students table is ready');
    } catch (error) {
      console.error('❌ Table init error:', error);
    }
  }
}