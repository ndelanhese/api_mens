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

  public manufacturer_slug!: string;

  public type!: string;

  public part_number!: string;

  public description!: string;

  public currency!: CreationOptional<string>;

  public contributor_price!: number;

  public exempt_price!: CreationOptional<number>;

  public note!: CreationOptional<string>;

  public outlet!: boolean;
}

ProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    manufacturer_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    part_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contributor_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    exempt_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    outlet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
  },
);
