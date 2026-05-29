import { AttendanceService } from '../services/attendance.services.js';
export class AttendanceController {
    attendanceService = new AttendanceService();
    createAttendance = async (req, res) => {
        try {
            const data = req.body;
            if (!data.student_id || !data.course_id || !data.date) {
                return res.status(400).json({ success: false, message: 'student_id, course_id, and date are required' });
            }
            const allowed = ['present', 'absent', 'late'];
            if (data.status && !allowed.includes(data.status)) {
                return res.status(400).json({ success: false, message: `Invalid status. Allowed values: ${allowed.join(', ')}` });
            }
            const attendance = await this.attendanceService.createAttendance(data);
            res.status(201).json({ success: true, data: attendance });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error creating attendance",
                error: error.message
            });
        }
    };
    getAllAttendances = async (_req, res) => {
        try {
            const attendances = await this.attendanceService.getAllAttendances();
            res.status(200).json({
                success: true,
                data: attendances
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching attendances",
                error: error.message
            });
        }
    };
    getAttendanceByStudent = async (req, res) => {
        try {
            const studentId = Number(req.params.studentId);
            if (isNaN(studentId)) {
                return res.status(400).json({ success: false, message: 'Invalid student ID' });
            }
            const attendances = await this.attendanceService.getAttendanceByStudent(studentId);
            res.status(200).json({
                success: true,
                data: attendances
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching attendance by student",
                error: error.message
            });
        }
    };
    getAttendanceByCourse = async (req, res) => {
        try {
            const courseId = Number(req.params.courseId);
            if (isNaN(courseId)) {
                return res.status(400).json({ success: false, message: 'Invalid course ID' });
            }
            const attendances = await this.attendanceService.getAttendanceByCourse(courseId);
            res.status(200).json({
                success: true,
                data: attendances
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching attendance by course",
                error: error.message
            });
        }
    };
    getAttendanceByDate = async (req, res) => {
        try {
            const date = req.query.date;
            if (!date) {
                return res.status(400).json({ success: false, message: 'Date query parameter is required' });
            }
            const attendances = await this.attendanceService.getAttendanceByDate(date);
            res.status(200).json({
                success: true,
                data: attendances
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching attendance by date",
                error: error.message
            });
        }
    };
    updateAttendance = async (req, res) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Invalid attendance ID' });
            }
            const data = req.body;
            const allowed = ['present', 'absent', 'late'];
            if (data.status && !allowed.includes(data.status)) {
                return res.status(400).json({ success: false, message: `Invalid status. Allowed values: ${allowed.join(', ')}` });
            }
            const attendance = await this.attendanceService.updateAttendance(id, data);
            if (!attendance) {
                return res.status(404).json({ success: false, message: 'Attendance not found' });
            }
            res.status(200).json({ success: true, data: attendance });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating attendance",
                error: error.message
            });
        }
    };
}
