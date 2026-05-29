import pool from '../config/database.js';
export class UserRepository {
    async createTableIfNotExists() {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL DEFAULT 'student',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='created_at') THEN
            ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='updated_at') THEN
            ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
            console.log('✅ Users table is ready');
        }
        catch (error) {
            console.error('❌ Error creating users table:', error);
        }
    }
}
