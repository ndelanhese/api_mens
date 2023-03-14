import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class SalesProductsModel extends Model<
  InferAttributes<SalesProductsModel>,
  InferCreationAttributes<SalesProductsModel>
> {
  public id!: CreationOptional<number>;
}

SalesProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'sales_products',
  },
);
