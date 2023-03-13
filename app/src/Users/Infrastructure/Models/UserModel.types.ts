export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  password?: string;
}
