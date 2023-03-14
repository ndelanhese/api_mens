import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class BrandsModel extends Model<
  InferAttributes<BrandsModel>,
  InferCreationAttributes<BrandsModel>
> {
  public id!: CreationOptional<number>;
}

BrandsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'brands',
  },
);
