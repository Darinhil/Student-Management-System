export class Department {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description ?? null;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
