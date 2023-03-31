export interface ILogin {
  token: string;
  userData: {
    id: number;
    name: string;
    email: string;
  };
  expiresIn: Date;
}
export interface IUserRolesReturn {
  id: number;
  name: string;
}

export interface IUserPermissions {
  id?: number;
  permission_id: number;
  user_id: number;
}

export interface IPermissions {
  id: number;
  name: string;
  description: string;
}
