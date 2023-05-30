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
  public date!: Date;
  public description!: CreationOptional<string>;
  public observation!: CreationOptional<string>;
  public status!: CreationOptional<string>;
  public customer_id!: number;
  public user_id!: number;
}

OrdersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'realizada',
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'orders',
  },
);
