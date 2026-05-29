import { AttendanceService } from '../services/attendance.services.js';
export class AttendanceController {
    attendanceService;
    constructor() {
        this.attendanceService = new AttendanceService();
    }
    async create(req, res) {
        try {
            const data = req.body;
            const attendance = await this.attendanceService.createAttendance(data);
            res.status(201).json({ success: true, message: 'Attendance recorded', data: attendance });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error recording attendance', error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const attendances = await this.attendanceService.getAllAttendances();
            res.status(200).json({ success: true, count: attendances.length, data: attendances });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching attendances', error: error.message });
        }
    }
    async getByStudent(req, res) {
        try {
            const studentId = parseInt(req.params.studentId);
            if (isNaN(studentId))
                return res.status(400).json({ success: false, message: 'Invalid student ID' });
            const attendances = await this.attendanceService.getByStudent(studentId);
            res.status(200).json({ success: true, count: attendances.length, data: attendances });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching attendances', error: error.message });
        }
    }
    async getByCourse(req, res) {
        try {
            const courseId = parseInt(req.params.courseId);
            if (isNaN(courseId))
                return res.status(400).json({ success: false, message: 'Invalid course ID' });
            const attendances = await this.attendanceService.getByCourse(courseId);
            res.status(200).json({ success: true, count: attendances.length, data: attendances });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching attendances', error: error.message });
        }
    }
    async getByDate(req, res) {
        try {
            const date = req.query.date;
            if (!date)
                return res.status(400).json({ success: false, message: 'Date query parameter is required (YYYY-MM-DD)' });
            const attendances = await this.attendanceService.getByDate(date);
            res.status(200).json({ success: true, count: attendances.length, data: attendances });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching attendances', error: error.message });
        }
    }
    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res.status(400).json({ success: false, message: 'Invalid ID' });
            const data = req.body;
            const attendance = await this.attendanceService.updateAttendance(id, data);
            if (!attendance)
                return res.status(404).json({ success: false, message: 'Attendance not found' });
            res.status(200).json({ success: true, message: 'Attendance updated', data: attendance });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error updating attendance', error: error.message });
        }
    }
}
