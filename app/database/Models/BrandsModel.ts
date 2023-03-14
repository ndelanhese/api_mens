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
  public name!: string;
}

BrandsModel.init(
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
  },
  {
    sequelize,
    tableName: 'brands',
  },
);
