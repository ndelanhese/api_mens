export interface IConfig {
  [key: string]: {
    dialect: string | undefined;
    host: string | undefined;
    port: number | undefined;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    seederStorage?: string | undefined;
    seederStorageTableName?: string | undefined;
  };
}
