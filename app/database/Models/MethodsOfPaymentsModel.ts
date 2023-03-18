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
  public name!: string;
}

MethodsOfPaymentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'methods_of_payments',
  },
);
