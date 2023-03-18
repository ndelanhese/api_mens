import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class EmployeeModel extends Model<
  InferAttributes<EmployeeModel>,
  InferCreationAttributes<EmployeeModel>
> {
  public id!: CreationOptional<number>;
  public name!: string;
  public cpf!: number;
  public rg!: number;
  public birth_date!: Date;
  public phone!: number;
  public pis_pasep!: number;
  public admission_date!: Date;
  public resignation_date!: Date;
  public status!: CreationOptional<string>;
}

EmployeeModel.init(
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
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    rg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pis_pasep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admission_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    resignation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'ativo',
    },
  },
  {
    sequelize,
    tableName: 'employees',
  },
);
