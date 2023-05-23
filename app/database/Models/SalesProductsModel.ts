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
  public quantity!: number;
  public discount_amount!: CreationOptional<number>;
  public discount_type!: CreationOptional<string>;
  public final_value!: number;
  public sale_id!: number;
  public product_id!: number;
}

SalesProductsModel.init(
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
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'sales',
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
    tableName: 'sales_products',
  },
);
