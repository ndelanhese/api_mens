export interface IUser {
  id: number;
  user: string;
  email: string;
  status: string;
  password?: string;
  employee: {
    id: number;
    name: string;
  };
}
