export class Grade {
    id;
    studentId;
    courseId;
    score;
    dateRecorded;
    remarks;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.studentId = data.studentId;
        this.courseId = data.courseId;
        this.score = data.score;
        this.dateRecorded = data.dateRecorded;
        this.remarks = data.remarks;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
