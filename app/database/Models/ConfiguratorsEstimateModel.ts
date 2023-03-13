import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class ConfiguratorsEstimateModel extends Model<
  InferAttributes<ConfiguratorsEstimateModel>,
  InferCreationAttributes<ConfiguratorsEstimateModel>
> {
  public id!: CreationOptional<number>;

  public configurator_key!: string;

  public content!: JSON;

  public rpm_content!: JSON;
}

ConfiguratorsEstimateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    configurator_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    rpm_content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'configurators_estimates',
  },
);
