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
  public quantity!: number;
  public order_id!: number;
  public product_id!: number;
}

OrdersProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'orders',
        },
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'products',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'orders_products',
  },
);
