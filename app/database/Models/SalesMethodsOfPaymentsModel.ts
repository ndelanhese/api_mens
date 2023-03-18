import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class SalesMethodsOfPaymentsModel extends Model<
  InferAttributes<SalesMethodsOfPaymentsModel>,
  InferCreationAttributes<SalesMethodsOfPaymentsModel>
> {
  public id!: CreationOptional<number>;
  public installment!: CreationOptional<number>;
  public sale_id!: number;
  public method_id!: number;
}

SalesMethodsOfPaymentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    installment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
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
    method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'methods_of_payments',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'sales_methods_of_payments',
  },
);
