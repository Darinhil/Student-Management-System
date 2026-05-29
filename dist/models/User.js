export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["TEACHER"] = "teacher";
    UserRole["STUDENT"] = "student";
})(UserRole || (UserRole = {}));
export class User {
    id;
    username;
    password;
    email;
    role;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.role = data.role;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
