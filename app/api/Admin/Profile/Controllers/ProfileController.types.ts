export interface IUserRolesReturn {
  role_id: number;
}

export interface IUserPermissions {
  id?: number;
  permission_id: number;
  user_id: number;
}

export interface IUserPermission {
  id: number;
  name: string;
  description: string;
  group: string;
}

export interface IPermissions {
  id: number;
  name: string;
  description: string;
  group: string;
}

export type GroupedObjects = {
  [key: string]: Object[];
};

export type GroupedObjectsReduce = {
  [key: string]: { group: string; items: Array<IPermission> };
};

export interface IPermission {
  id?: number;
  name: string;
  description: string;
  group: string;
}
