import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class OrdersProductsModel extends Model<
  InferAttributes<OrdersProductsModel>,
  InferCreationAttributes<OrdersProductsModel>
> {
  public id!: CreationOptional<number>;
}

OrdersProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'orders_products',
  },
);
