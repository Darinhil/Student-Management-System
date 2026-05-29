export class StudentModel {
    id;
    user_id;
    first_name;
    last_name;
    department_id;
    created_at;
    updated_at;
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.department_id = data.department_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}
