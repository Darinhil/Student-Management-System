export class Teacher {
    id;
    userId;
    firstName;
    lastName;
    departmentId;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.departmentId = data.departmentId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
