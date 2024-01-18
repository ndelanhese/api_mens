import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class PromotionsCategoriesModel extends Model<
  InferAttributes<PromotionsCategoriesModel>,
  InferCreationAttributes<PromotionsCategoriesModel>
> {
  public id!: CreationOptional<number>;
  public name!: string;
  public status!: CreationOptional<string>;
}

PromotionsCategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'promotions_categories',
  },
);
