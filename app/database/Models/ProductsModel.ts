import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class ProductsModel extends Model<
  InferAttributes<ProductsModel>,
  InferCreationAttributes<ProductsModel>
> {
  public id!: CreationOptional<number>;
  public part_number!: CreationOptional<string>;
  public name!: string;
  public description!: string;
  public purchase_price!: CreationOptional<number>;
  public price!: number;
  public size!: CreationOptional<string>;
  public color!: CreationOptional<string>;
  public quantity!: number;
  public status!: CreationOptional<string>;
  public category_id!: number;
  public brand_id!: number;
  public supplier_id!: number;
}

ProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    part_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchase_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'categories',
        },
        key: 'id',
      },
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'brands',
        },
        key: 'id',
      },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'suppliers',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'products',
  },
);
