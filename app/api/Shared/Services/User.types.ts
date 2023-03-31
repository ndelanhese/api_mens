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

export interface IPermissionsReturn {
  id: number;
  name: string;
  description?: string;
}
