export class Grade {
  id?: number;
  studentId: number;
  courseId: number;
  score: number;
  dateRecorded: Date;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Grade>) {
    this.id = data.id;
    this.studentId = data.studentId!;
    this.courseId = data.courseId!;
    this.score = data.score!;
    this.dateRecorded = data.dateRecorded!;
    this.remarks = data.remarks;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
