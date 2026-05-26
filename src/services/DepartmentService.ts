import type { createDepartmentDto, updateDepartmentDto } from '../interfaces/department.interface.js';
import { DepartmentRepository } from '../repositories/DepartmentRepository.js';
import { Department } from '../models/Department.js';

class DepartmentError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class DepartmentService {
  private departmentRepository = new DepartmentRepository();

  async getAll(): Promise<Department[]> {
    return this.departmentRepository.getAll();
  }

  async getById(id: number): Promise<Department> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new DepartmentError(400, 'Invalid department id');
    }

    const department = await this.departmentRepository.getById(id);
    if (!department) {
      throw new DepartmentError(404, 'Department not found');
    }

    return department;
  }

  async create(data: createDepartmentDto): Promise<Department> {
    const name = data.name?.trim();
    if (!name) {
      throw new DepartmentError(400, 'Name is required');
    }

    const exists = await this.departmentRepository.existsByName(name);
    if (exists) {
      throw new DepartmentError(409, 'Department with this name already exists');
    }

    const description = data.description?.trim() || null;
    return this.departmentRepository.create({ name, description });
  }

  async update(id: number, data: updateDepartmentDto): Promise<Department> {
    const existing = await this.getById(id);

    const name = data.name !== undefined ? data.name.trim() : existing.name;
    if (!name) {
      throw new DepartmentError(400, 'Name is required');
    }

    const exists = await this.departmentRepository.existsByName(name, id);
    if (exists) {
      throw new DepartmentError(409, 'Department with this name already exists');
    }

    const description =
      data.description !== undefined ? (data.description?.trim() || null) : existing.description ?? null;

    return this.departmentRepository.update(id, { name, description });
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.departmentRepository.delete(id);
  }
}
