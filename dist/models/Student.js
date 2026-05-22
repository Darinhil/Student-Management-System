export class Student {
    id;
    userId;
    firstName;
    lastName;
    departmentId;
    enrollmentDate;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.departmentId = data.departmentId;
        this.enrollmentDate = data.enrollmentDate;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
