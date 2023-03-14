import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class CategoriesModel extends Model<
  InferAttributes<CategoriesModel>,
  InferCreationAttributes<CategoriesModel>
> {
  public id!: CreationOptional<number>;
}

CategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
  },
);
