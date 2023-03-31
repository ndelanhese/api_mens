import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import PermissionsModel from './PermissionsModel';
import RolesPermissionsModel from './RolesPermissionsModel';
import UsersModel from './UsersModel';
import UsersRolesModel from './UsersRolesModel';

import { sequelize } from '.';

export default class RolesModel extends Model<
  InferAttributes<RolesModel>,
  InferCreationAttributes<RolesModel>
> {
  public id!: CreationOptional<number>;

  public name!: string;

  public description!: string;
}

RolesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'roles',
  },
);
