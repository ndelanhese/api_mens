import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class SuppliersAddressesModel extends Model<
  InferAttributes<SuppliersAddressesModel>,
  InferCreationAttributes<SuppliersAddressesModel>
> {
  public id!: CreationOptional<number>;
}

SuppliersAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'suppliers_addresses',
  },
);
