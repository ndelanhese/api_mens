export interface ILogin {
  token: string;
  userData: {
    id: number;
    name: string;
    email: any;
  };
  expiresIn: Date;
}
