export var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "Present";
    AttendanceStatus["ABSENT"] = "Absent";
    AttendanceStatus["LATE"] = "Late";
    AttendanceStatus["EXCUSED"] = "Excused";
})(AttendanceStatus || (AttendanceStatus = {}));
export class Attendance {
    id;
    studentId;
    courseId;
    date;
    status;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.date = data.date;
        this.status = data.status;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
