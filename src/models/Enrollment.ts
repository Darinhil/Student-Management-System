export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped'
}

export class Enrollment {
  id?: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  status: EnrollmentStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Enrollment>) {
    this.id = data.id;
    this.studentId = data.studentId!;
    this.courseId = data.courseId!;
    this.enrollmentDate = data.enrollmentDate!;
    this.status = data.status ?? EnrollmentStatus.ACTIVE;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
