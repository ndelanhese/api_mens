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
}

PromotionsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'promotions',
  },
);
