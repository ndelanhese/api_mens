import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class EstimateModel extends Model<
  InferAttributes<EstimateModel>,
  InferCreationAttributes<EstimateModel>
> {
  public id!: CreationOptional<number>;

  public name!: string;

  public email!: string;

  public phone!: string;

  public corporate_name!: CreationOptional<string>;

  public cnpj!: CreationOptional<string>;

  public address!: CreationOptional<string>;

  public state!: CreationOptional<string>;

  public postal_code!: CreationOptional<string>;

  public district!: CreationOptional<string>;

  public city!: CreationOptional<string>;
}

EstimateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    corporate_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'estimates',
  },
);
