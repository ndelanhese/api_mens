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
  public user!: string;
  public email!: string;
  public password!: string;
  public status!: CreationOptional<string>;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'ativo',
    },
  },
  {
    sequelize,
    tableName: 'users',
  },
);
