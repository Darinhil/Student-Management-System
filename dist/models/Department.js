export class Department {
    id;
    name;
    code;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.code = data.code;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
