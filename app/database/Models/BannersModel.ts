import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class BannersModel extends Model<
  InferAttributes<BannersModel>,
  InferCreationAttributes<BannersModel>
> {
  public id!: CreationOptional<number>;

  public order!: number;

  public title!: string;

  public area!: string;

  public desktop_image_id!: CreationOptional<number>;

  public mobile_image_id!: CreationOptional<number>;

  public url!: CreationOptional<string>;

  public start_date!: CreationOptional<Date>;

  public end_date!: CreationOptional<Date>;

  public status!: string;
}

BannersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desktop_image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobile_image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'unpublished',
    },
  },
  {
    sequelize,
    tableName: 'banners',
  },
);
