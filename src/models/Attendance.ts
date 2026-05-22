export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late',
  EXCUSED = 'Excused'
}

export class Attendance {
  id?: number;
  studentId: number;
  courseId: number;
  date: Date;
  status: AttendanceStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Attendance>) {
    this.id = data.id;
    this.studentId = data.studentId!;
    this.courseId = data.courseId!;
    this.date = data.date!;
    this.status = data.status!;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
