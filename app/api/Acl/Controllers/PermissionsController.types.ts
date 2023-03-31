export type IGroup = {
  group_name: string;
  permissions: Array<IPermission>;
};

export interface IPermission {
  id?: number;
  name: string;
  description: string;
  group: string;
}
