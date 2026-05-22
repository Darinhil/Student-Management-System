export class Student {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  enrollmentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Student>) {
    this.id = data.id;
    this.userId = data.userId!;
    this.firstName = data.firstName!;
    this.lastName = data.lastName!;
    this.departmentId = data.departmentId!;
    this.enrollmentDate = data.enrollmentDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
