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
  email: string;
  status: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  employee: IEmployee;
  users_roles?: { role_id: number }[];
  users_permissions?: { permission_id: number }[];
}

interface IEmployeeResponse {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string | null;
  phone: string;
  pis_pasep: string;
  admission_date: string | null;
  resignation_date: string | null;
  status: string;
}

export interface IUserResponse {
  id: number;
  user: string;
  email: string;
  status: string;
  employee: IEmployeeResponse;
}
