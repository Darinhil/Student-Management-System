import { db } from '../config/database.js';
export class DepartmentService {
    // GET ALL
    async getAll() {
        const result = await db.query(`
      SELECT *
      FROM departments
      ORDER BY id ASC
      `);
        return result.rows;
    }
    // GET BY ID
    async getById(id) {
        const result = await db.query(`
      SELECT *
      FROM departments
      WHERE id = $1
      `, [id]);
        if (result.rows.length === 0) {
            throw new Error('Department not found');
        }
        return result.rows[0];
    }
    // CREATE
    async create(data) {
        const { name, description } = data;
        if (!name) {
            throw new Error('Department name is required');
        }
        const existing = await db.query(`
      SELECT id
      FROM departments
      WHERE name = $1
      `, [name.trim()]);
        if (existing.rows.length > 0) {
            throw new Error('Department already exists');
        }
        const result = await db.query(`
      INSERT INTO departments (
        name,
        description
      )
      VALUES ($1, $2)
      RETURNING *
      `, [
            name.trim(),
            description || null,
        ]);
        return result.rows[0];
    }
    // UPDATE
    async update(id, data) {
        const department = await this.getById(id);
        const updatedName = data.name || department.name;
        const updatedDescription = data.description || department.description;
        const result = await db.query(`
      UPDATE departments
      SET
        name = $1,
        description = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
      `, [
            updatedName,
            updatedDescription,
            id,
        ]);
        return result.rows[0];
    }
    // DELETE
    async delete(id) {
        await this.getById(id);
        await db.query(`
      DELETE FROM departments
      WHERE id = $1
      `, [id]);
    }
}
