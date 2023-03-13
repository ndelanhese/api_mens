import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class UserRoleModel extends Model<InferAttributes<UserRoleModel>,
InferCreationAttributes<UserRoleModel>> {
  public id!: CreationOptional<number>;

  public role_id!: number;

  public user_id!: number;
}

UserRoleModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users_roles',
});
