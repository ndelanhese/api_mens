import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class PermissionsModel extends Model<
  InferAttributes<PermissionsModel>,
  InferCreationAttributes<PermissionsModel>
> {
  public id!: CreationOptional<number>;

  public name!: string;

  public description!: string;

  public group!: string;
}

PermissionsModel.init(
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
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'permissions',
  },
);
