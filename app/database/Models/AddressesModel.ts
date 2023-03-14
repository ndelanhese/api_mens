import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class AddressesModel extends Model<
  InferAttributes<AddressesModel>,
  InferCreationAttributes<AddressesModel>
> {
  public id!: CreationOptional<number>;
}

AddressesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'addresses',
  },
);
