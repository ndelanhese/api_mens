import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class PromotionsProductsModel extends Model<
  InferAttributes<PromotionsProductsModel>,
  InferCreationAttributes<PromotionsProductsModel>
> {
  public id!: CreationOptional<number>;
}

PromotionsProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'promotions_products',
  },
);
