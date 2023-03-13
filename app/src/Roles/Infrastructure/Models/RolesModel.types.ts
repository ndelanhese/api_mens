export interface IRolesModel {
  id: number;
  name: string;
  description: string;
}

export interface IRolesPermissions {
  role_id: number;
  permission_id: number;
}

export interface IRolesPermissionsOutput {
  id?: number;
  role_id: number;
  permission_id: number;
}
