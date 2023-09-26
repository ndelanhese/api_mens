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

export interface IUsersDeleted {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface IEmployee {
  id: number;
  name: string;
  cpf: string;
  rg: string | null;
  birth_date: Date;
  phone: string;
  pis_pasep: string;
  admission_date: Date;
  resignation_date: Date | null;
  status: string;
}

export interface IUser {
  id: number;
  user: string;
  phone_number: string;
  email: string;
  status: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  employee: IEmployee;
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
