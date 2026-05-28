import { BaseRepository } from '../base/BaseRepository.js';
import { Teacher } from '../models/Teacher.js';
import { db } from '../config/database.js';

export class TeacherRepository extends BaseRepository<Teacher> {
  protected tableName = 'teachers';

  async create(teacher: Teacher): Promise<Teacher> {
    const { userId, firstName, lastName, departmentId } = teacher;
    const query = `
      INSERT INTO ${this.tableName} (user_id, first_name, last_name, department_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, user_id as "userId", first_name as "firstName", last_name as "lastName", 
                department_id as "departmentId", created_at as "createdAt", updated_at as "updatedAt"
    `;
    const result = await db.query(query, [userId, firstName, lastName, departmentId]);
    return result.rows[0];
  }

  async update(id: number, teacher: Partial<Teacher>): Promise<Teacher | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (teacher.firstName !== undefined) {
      fields.push(`first_name = $${values.length + 1}`);
      values.push(teacher.firstName);
    }
    if (teacher.lastName !== undefined) {
      fields.push(`last_name = $${values.length + 1}`);
      values.push(teacher.lastName);
    }
    if (teacher.departmentId !== undefined) {
      fields.push(`department_id = $${values.length + 1}`);
      values.push(teacher.departmentId);
    }

    if (fields.length === 0) return this.findById(id);

    const idParamIndex = values.length + 1;
    const query = `
      UPDATE ${this.tableName}
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${idParamIndex}
      RETURNING id, user_id as "userId", first_name as "firstName", last_name as "lastName",
                department_id as "departmentId", created_at as "createdAt", updated_at as "updatedAt"
    `;

    values.push(id);

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async findByDepartment(departmentId: number): Promise<Teacher[]> {
    const query = `
      SELECT id, user_id as "userId", first_name as "firstName", last_name as "lastName",
             department_id as "departmentId", created_at as "createdAt", updated_at as "updatedAt"
      FROM ${this.tableName}
      WHERE department_id = $1
      ORDER BY first_name, last_name
    `;
    return this.query(query, [departmentId]);
  }

  async findAll(): Promise<Teacher[]> {
    const query = `
      SELECT id, user_id as "userId", first_name as "firstName", last_name as "lastName",
             department_id as "departmentId", created_at as "createdAt", updated_at as "updatedAt"
      FROM ${this.tableName}
      ORDER BY first_name, last_name
    `;
    return this.query(query);
  }

  async findById(id: number): Promise<Teacher | null> {
    const query = `
      SELECT id, user_id as "userId", first_name as "firstName", last_name as "lastName",
             department_id as "departmentId", created_at as "createdAt", updated_at as "updatedAt"
      FROM ${this.tableName}
      WHERE id = $1
    `;
    const rows = await this.query(query, [id]);
    return rows[0] || null;
  }
}
