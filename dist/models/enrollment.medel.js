export class EnrollmentModel {
    id;
    student_id;
    course_id;
    enrollment_date;
    constructor(data) {
        this.id = data.id;
        this.student_id = data.student_id;
        this.course_id = data.course_id;
        this.enrollment_date = data.enrollment_date;
    }
    // Optional: Helper method to get full name or formatted data
    getFormattedDate() {
        if (!this.enrollment_date)
            return 'N/A';
        return new Date(this.enrollment_date).toISOString().split('T')[0];
    }
}
