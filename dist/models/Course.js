export class Course {
    id;
    name;
    code;
    credits;
    teacherId;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.code = data.code;
        this.credits = data.credits ?? 3;
        this.teacherId = data.teacherId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
