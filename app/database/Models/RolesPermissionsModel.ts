import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class RolesPermissionsModel extends Model<
  InferAttributes<RolesPermissionsModel>,
  InferCreationAttributes<RolesPermissionsModel>
> {
  public id!: CreationOptional<number>;

  public role_id!: number;

  public permission_id!: number;
}

RolesPermissionsModel.init(
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
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'roles_permissions',
  },
);
