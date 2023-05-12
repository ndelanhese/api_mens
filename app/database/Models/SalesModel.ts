import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class SalesModel extends Model<
  InferAttributes<SalesModel>,
  InferCreationAttributes<SalesModel>
> {
  public id!: CreationOptional<number>;
  public date!: Date;
  public observation!: CreationOptional<string>;
  public total_value!: number;
  public discount_amount!: CreationOptional<number>;
  public discount_type!: CreationOptional<string>;
  public final_value!: number;
  public status!: CreationOptional<string>;
  public customer_id!: number;
  public user_id!: number;
}

SalesModel.init(
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
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    final_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'finalizada',
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
    tableName: 'sales',
  },
);
