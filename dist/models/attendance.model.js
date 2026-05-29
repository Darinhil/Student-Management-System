export class AttendanceModel {
    id;
    student_id;
    course_id;
    date;
    status;
    created_at;
    updated_at;
    constructor(data) {
        this.id = data.id;
        this.student_id = data.student_id;
        this.course_id = data.course_id;
        this.date = data.date;
        this.status = data.status;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}
