import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class SuppliersModel extends Model<
  InferAttributes<SuppliersModel>,
  InferCreationAttributes<SuppliersModel>
> {
  public id!: CreationOptional<number>;
}

SuppliersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'suppliers',
  },
);
