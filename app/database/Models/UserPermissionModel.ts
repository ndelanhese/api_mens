import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class UserPermissionModel extends Model<InferAttributes<UserPermissionModel>,
InferCreationAttributes<UserPermissionModel>> {
  public id!: CreationOptional<number>;

  public permission_id!: number;

  public user_id!: number;
}

UserPermissionModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users_permissions',
});
