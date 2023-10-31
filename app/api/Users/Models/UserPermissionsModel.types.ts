export interface IUserPermissions {
  id?: number;
  permission_id: number;
  user_id: number;
  PermissionsModel: {
    name: string;
    description: string;
  };
}
