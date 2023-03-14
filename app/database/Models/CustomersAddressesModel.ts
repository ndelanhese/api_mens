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
  public customer_id!: number;
  public address_id!: number;
}

CustomersAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'customers',
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
    tableName: 'customers_addresses',
  },
);
