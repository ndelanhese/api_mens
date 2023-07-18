export interface IUser {
  id: number;
  user: string;
  email: string;
  status: string;
  employee_id?: number;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  userRoles?: {
    id: number;
    role_id: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  employee: {
    name: string;
  };
}
