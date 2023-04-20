export interface IRolesResponse {
  data: {
    id: number;
    name: string;
    description: string;
  }[];
}

export interface IRoleResponse {
  id: number;
  name: string;
  description: string;
}

export interface interfaceIRoleWithPermissions {
  id: number;
  name: string;
  description: string;
  permissions: Array<{ permission_id: number }>;
}
