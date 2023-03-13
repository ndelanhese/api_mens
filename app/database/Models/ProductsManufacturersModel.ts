import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';
import ProductsModel from './ProductsModel';

export default class ProductsManufacturersModel extends Model<
  InferAttributes<ProductsManufacturersModel>,
  InferCreationAttributes<ProductsManufacturersModel>
> {
  public slug!: CreationOptional<string>;

  public name!: string;
}

ProductsManufacturersModel.init(
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products_manufacturers',
  },
);
ProductsManufacturersModel.hasMany(ProductsModel, {
  foreignKey: 'manufacturer_slug',
  as: 'products',
});
