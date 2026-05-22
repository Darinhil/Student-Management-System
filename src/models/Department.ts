export class Department {
  id?: number;
  name: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Department>) {
    this.id = data.id;
    this.name = data.name!;
    this.code = data.code!;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
