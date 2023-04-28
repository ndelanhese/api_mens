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
  public supplier_id!: number;
  public address_id!: number;
}

SuppliersAddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'suppliers',
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
    tableName: 'suppliers_addresses',
  },
);
