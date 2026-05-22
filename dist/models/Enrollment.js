export var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["ACTIVE"] = "active";
    EnrollmentStatus["COMPLETED"] = "completed";
    EnrollmentStatus["DROPPED"] = "dropped";
})(EnrollmentStatus || (EnrollmentStatus = {}));
export class Enrollment {
    id;
    studentId;
    courseId;
    enrollmentDate;
    status;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.enrollmentDate = data.enrollmentDate;
        this.status = data.status ?? EnrollmentStatus.ACTIVE;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
