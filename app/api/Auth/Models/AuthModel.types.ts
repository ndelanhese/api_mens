export interface IUser {
  id: number;
  user: string;
  email: string;
  status: string;
  employee_id?: number;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  userRoles?: {
    id: number;
    role_id: number;
    created_at: Date;
    updated_at: Date;
  }[];
}
