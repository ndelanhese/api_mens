import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class EstimatesProductsModel extends Model<
  InferAttributes<EstimatesProductsModel>,
  InferCreationAttributes<EstimatesProductsModel>
> {
  public id!: CreationOptional<number>;

  public estimate_id!: number;

  public product_id!: number;

  public qtd!: number;
}

EstimatesProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    estimate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qtd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'estimates_products',
  },
);
