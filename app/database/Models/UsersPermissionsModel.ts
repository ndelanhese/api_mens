import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import PermissionsModel from './PermissionsModel';
import UsersModel from './UsersModel';

import { sequelize } from '.';

export default class UsersPermissionsModel extends Model<
  InferAttributes<UsersPermissionsModel>,
  InferCreationAttributes<UsersPermissionsModel>
> {
  public id!: CreationOptional<number>;
  public permission_id!: number;
  public user_id!: number;
}

UsersPermissionsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users_permissions',
  },
);
