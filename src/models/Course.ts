export class Course {
  id?: number;
  name: string;
  code: string;
  credits: number;
  teacherId: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Course>) {
    this.id = data.id;
    this.name = data.name!;
    this.code = data.code!;
    this.credits = data.credits ?? 3;
    this.teacherId = data.teacherId!;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
