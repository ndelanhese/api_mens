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
  public promotion_id!: number;
  public product_id!: number;
}

PromotionsProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'promotions',
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
    tableName: 'promotions_products',
  },
);
