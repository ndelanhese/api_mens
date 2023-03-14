import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class CustomersAddressesModel extends Model<
  InferAttributes<CustomersAddressesModel>,
  InferCreationAttributes<CustomersAddressesModel>
> {
  public id!: CreationOptional<number>;
}

CustomersAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'customers_addresses',
  },
);
