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
  public cpf!: string;
  public rg!: CreationOptional<string>;
  public birth_date!: Date;
  public phone!: string;
  public pis_pasep!: string;
  public admission_date!: Date;
  public resignation_date!: CreationOptional<Date>;
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
    pis_pasep: {
      type: DataTypes.STRING,
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
