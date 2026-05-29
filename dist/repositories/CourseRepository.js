import pool from '../config/database.js';
export class CourseRepository {
    async createTableIfNotExists() {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS courses (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          code VARCHAR(20) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='created_at') THEN
            ALTER TABLE courses ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='updated_at') THEN
            ALTER TABLE courses ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
            console.log('✅ Courses table is ready');
        }
        catch (error) {
            console.error('❌ Error creating courses table:', error);
        }
    }
}
