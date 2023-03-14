import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class OrdersModel extends Model<
  InferAttributes<OrdersModel>,
  InferCreationAttributes<OrdersModel>
> {
  public id!: CreationOptional<number>;
}

OrdersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'or',
  },
);
