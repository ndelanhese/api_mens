export type GroupedObjects = {
  [key: string]: Object[];
};

export interface IPermission {
  id?: number;
  name: string;
  description: string;
  group: string;
}
