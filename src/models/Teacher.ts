export class Teacher {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Teacher>) {
    this.id = data.id;
    this.userId = data.userId!;
    this.firstName = data.firstName!;
    this.lastName = data.lastName!;
    this.departmentId = data.departmentId!;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
