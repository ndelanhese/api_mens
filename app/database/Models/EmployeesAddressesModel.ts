import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class EmployeesAddressesModel extends Model<
  InferAttributes<EmployeesAddressesModel>,
  InferCreationAttributes<EmployeesAddressesModel>
> {
  public id!: CreationOptional<number>;
  public employee_id!: number;
  public address_id!: number;
}

EmployeesAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'employees',
        },
        key: 'id',
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'addresses',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'employees_addresses',
  },
);
