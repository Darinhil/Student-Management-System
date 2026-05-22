import { db } from '../config/database.js';

export abstract class BaseRepository<T> {
  protected abstract tableName: string;

  async query(text: string, params?: any[]): Promise<any[]> {
    const result = await db.query(text, params);
    return result.rows;
  }

  async findAll(): Promise<T[]> {
    return this.query(`SELECT * FROM ${this.tableName}`);
  }

  async findById(id: number): Promise<T | null> {
    const rows = await this.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    return (result as any).rowCount > 0;
  }
}
