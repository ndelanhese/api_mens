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
}

PromotionsCategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'promotions_categories',
  },
);
