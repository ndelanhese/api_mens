import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import RolesModel from './RolesModel';
import UsersModel from './UsersModel';

import { sequelize } from '.';

export default class UsersRolesModel extends Model<
  InferAttributes<UsersRolesModel>,
  InferCreationAttributes<UsersRolesModel>
> {
  public id!: CreationOptional<number>;
  public role_id!: number;
  public user_id!: number;
}

UsersRolesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
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
    tableName: 'users_roles',
  },
);
