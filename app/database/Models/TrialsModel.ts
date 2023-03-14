import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class TrialsModel extends Model<
  InferAttributes<TrialsModel>,
  InferCreationAttributes<TrialsModel>
> {
  public id!: CreationOptional<number>;
}

TrialsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'trials',
  },
);
