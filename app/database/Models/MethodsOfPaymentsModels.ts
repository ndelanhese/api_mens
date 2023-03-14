import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class MethodsOfPaymentsModel extends Model<
  InferAttributes<MethodsOfPaymentsModel>,
  InferCreationAttributes<MethodsOfPaymentsModel>
> {
  public id!: CreationOptional<number>;
}

MethodsOfPaymentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'methods_of_payments',
  },
);
