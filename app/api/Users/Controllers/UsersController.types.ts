export interface IUsers {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }[];
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  users_roles: { role_id: number }[];
  users_permissions: { permission_id: number }[];
}
