export interface IUsers {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    status: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
  }[];
}

export interface IUsersDeleted {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface IUser {
  id: number;
  user: string;
  phone_number: string;
  email: string;
  status: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  employee: {
    name: string;
    cpf: string;
  };
  users_roles: { role_id: number }[];
  users_permissions: { permission_id: number }[];
}

export interface IUserData {
  id: number;
  user: string;
  email: string;
  password: string;
  status: string;
  employee_id: number;
}
