import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class TrialsProductsModel extends Model<
  InferAttributes<TrialsProductsModel>,
  InferCreationAttributes<TrialsProductsModel>
> {
  public id!: CreationOptional<number>;
}

TrialsProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'trials_products',
  },
);
