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
}

SalesMethodsOfPaymentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'sales_methods_of_payments',
  },
);
