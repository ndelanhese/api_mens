import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class PromotionsModel extends Model<
  InferAttributes<PromotionsModel>,
  InferCreationAttributes<PromotionsModel>
> {
  public id!: CreationOptional<number>;
  public name!: string;
  public description!: CreationOptional<string>;
  public discount_amount!: number;
  public discount_type!: string;
  public initial_date!: CreationOptional<Date>;
  public final_date!: CreationOptional<Date>;
  public promotion_category_id!: number;
}

PromotionsModel.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initial_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    promotion_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'promotions_categories',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'promotions',
  },
);
