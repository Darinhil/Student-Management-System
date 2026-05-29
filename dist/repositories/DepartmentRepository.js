import { db } from '../config/database.js';
import { Department } from '../models/Department.js';
import pool from '../config/database.js';
export class DepartmentRepository {
    async createTableIfNotExists() {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS departments (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='departments' AND column_name='created_at') THEN
            ALTER TABLE departments ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='departments' AND column_name='updated_at') THEN
            ALTER TABLE departments ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
          END IF;
        END $$;
      `);
            console.log('✅ Departments table is ready');
        }
        catch (error) {
            console.error('❌ Error creating departments table:', error);
        }
    }
    async getAll() {
        const result = await db.query('SELECT id, name, description, created_at AS "createdAt", updated_at AS "updatedAt" FROM departments ORDER BY id ASC');
        return result.rows.map((row) => new Department(row));
    }
    async getById(id) {
        const result = await db.query('SELECT id, name, description, created_at AS "createdAt", updated_at AS "updatedAt" FROM departments WHERE id = $1', [id]);
        const row = result.rows[0];
        return row ? new Department(row) : null;
    }
    async existsByName(name, excludeId) {
        const normalized = name.trim();
        const result = await db.query(excludeId
            ? 'SELECT id FROM departments WHERE name = $1 AND id <> $2 LIMIT 1'
            : 'SELECT id FROM departments WHERE name = $1 LIMIT 1', excludeId ? [normalized, excludeId] : [normalized]);
        return result.rows.length > 0;
    }
    async create(data) {
        const name = data.name.trim();
        const description = data.description?.trim() || null;
        const result = await db.query('INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING id', [name, description]);
        const created = await this.getById(result.rows[0].id);
        if (!created)
            throw new Error('Failed to create department');
        return created;
    }
    async update(id, data) {
        const name = data.name.trim();
        const description = data.description?.trim() || null;
        const result = await db.query('UPDATE departments SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING id', [name, description, id]);
        const updated = await this.getById(result.rows[0].id);
        if (!updated)
            throw new Error('Failed to update department');
        return updated;
    }
    async delete(id) {
        await db.query('DELETE FROM departments WHERE id = $1', [id]);
    }
}
