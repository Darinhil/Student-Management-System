import express from 'express';
import bodyParser from 'body-parser';
import { TeacherController } from './dist/controllers/TeacherController.js';

const app = express();
app.use(bodyParser.json());

// Mock service implementing the same methods used by TeacherController
const mockService = {
  getAllTeachers: async () => [
    { id: 1, userId: 10, firstName: 'Alice', lastName: 'Smith', departmentId: 1 },
    { id: 2, userId: 11, firstName: 'Bob', lastName: 'Jones', departmentId: 2 },
  ],
  getTeacherById: async (id) => (id === 1 ? { id: 1, userId: 10, firstName: 'Alice', lastName: 'Smith', departmentId: 1 } : null),
  createTeacher: async (data) => ({ id: 99, ...data }),
  updateTeacher: async (id, data) => (id === 1 ? { id: 1, ...data } : null),
  deleteTeacher: async (id) => id === 1,
  getTeachersByDepartment: async (deptId) => (deptId === 1 ? [ { id: 1, userId: 10, firstName: 'Alice', lastName: 'Smith', departmentId: 1 } ] : []),
};

const controller = new TeacherController(mockService);

app.get('/api/teachers', (req, res) => controller.getAllTeachers(req, res));
app.get('/api/teachers/:id', (req, res) => controller.getTeacherById(req, res));
app.post('/api/teachers', (req, res) => controller.createTeacher(req, res));
app.put('/api/teachers/:id', (req, res) => controller.updateTeacher(req, res));
app.delete('/v1/teachers/:id', (req, res) => controller.deleteTeacher(req, res));
app.get('/api/teachers/department/:deptId', (req, res) => controller.getTeachersByDepartment(req, res));

const PORT = process.env.PORT || 300;
app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
