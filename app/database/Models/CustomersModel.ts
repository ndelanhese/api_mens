import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class CustomersModel extends Model<
  InferAttributes<CustomersModel>,
  InferCreationAttributes<CustomersModel>
> {
  public id!: CreationOptional<number>;
  public name!: string;
  public cpf!: string;
  public rg!: CreationOptional<string>;
  public birth_date!: Date;
  public phone!: string;
  public status!: CreationOptional<string>;
}

CustomersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'customers',
  },
);
