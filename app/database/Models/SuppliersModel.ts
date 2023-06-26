import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class SuppliersModel extends Model<
  InferAttributes<SuppliersModel>,
  InferCreationAttributes<SuppliersModel>
> {
  public id!: CreationOptional<number>;
  public contact_name!: string;
  public corporate_name!: string;
  public cnpj!: string;
  public status!: CreationOptional<string>;
}

SuppliersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    corporate_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'suppliers',
  },
);
