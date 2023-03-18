import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { sequelize } from '.';

export default class TrialsProductsModel extends Model<
  InferAttributes<TrialsProductsModel>,
  InferCreationAttributes<TrialsProductsModel>
> {
  public id!: CreationOptional<number>;
  public quantity!: number;
  public trial_id!: number;
  public product_id!: number;
}

TrialsProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'trials',
        },
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'products',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'trials_products',
  },
);
