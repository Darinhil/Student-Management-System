import { db } from '../config/database.js';
export class BaseRepository {
    async query(text, params) {
        const result = await db.query(text, params);
        return result.rows;
    }
    async findAll() {
        return this.query(`SELECT * FROM ${this.tableName}`);
    }
    async findById(id) {
        const rows = await this.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return rows[0] || null;
    }
    async delete(id) {
        const result = await db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
        return result.rowCount > 0;
    }
}
