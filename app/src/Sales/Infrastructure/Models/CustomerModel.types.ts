export interface IUser {
  id: number;
  user: string;
  email: string;
  status: string;
  employee: {
    name: string;
    cpf: string;
    id: number;
  };
}
