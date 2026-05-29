import { DepartmentService } from '../services/DepartmentService.js';
export class DepartmentController {
    departmentService = new DepartmentService();
    async getAll(req, res) {
        try {
            const departments = await this.departmentService.getAll();
            res.status(200).json({
                success: true,
                data: departments,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error?.message ?? 'Internal server error',
            });
        }
    }
    // GET /api/departments/:id
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.getById(id);
            res.status(200).json({
                success: true,
                data: department,
            });
        }
        catch (error) {
            res.status(Number(error?.statusCode) || 404).json({
                success: false,
                message: error?.message ?? 'Department not found',
            });
        }
    }
    // POST /api/departments
    async create(req, res) {
        try {
            const department = await this.departmentService.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Department created successfully',
                data: department,
            });
        }
        catch (error) {
            res.status(Number(error?.statusCode) || 400).json({
                success: false,
                message: error?.message ?? 'Bad request',
            });
        }
    }
    // PUT /api/departments/:id
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.update(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Department updated successfully',
                data: department,
            });
        }
        catch (error) {
            res.status(Number(error?.statusCode) || 400).json({
                success: false,
                message: error?.message ?? 'Bad request',
            });
        }
    }
    // DELETE /api/departments/:id
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await this.departmentService.delete(id);
            res.status(200).json({
                success: true,
                message: 'Department deleted successfully',
            });
        }
        catch (error) {
            res.status(Number(error?.statusCode) || 400).json({
                success: false,
                message: error?.message ?? 'Bad request',
            });
        }
    }
}
