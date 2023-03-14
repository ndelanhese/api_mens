import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class UsersModel extends Model<
  InferAttributes<UsersModel>,
  InferCreationAttributes<UsersModel>
> {
  public id!: CreationOptional<number>;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  },
);
