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
}

EmployeesAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'employees_addresses',
  },
);
