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
  userRoles?: {
    id: number;
    role_id: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface IUserData {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  password: string;
}
