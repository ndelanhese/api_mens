import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import EmployeeModel from './EmployeesModel';
import PermissionsModel from './PermissionsModel';
import RolesModel from './RolesModel';
import RolesPermissionsModel from './RolesPermissionsModel';
import UsersPermissionsModel from './UsersPermissionsModel';
import UsersRolesModel from './UsersRolesModel';

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
  public employee_id!: number;
  public deletedAt!: CreationOptional<Date | null>;
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
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'employees',
        },
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  },
);

EmployeeModel.hasOne(UsersModel, {
  foreignKey: 'employee_id',

  as: 'employee',
});

UsersModel.belongsTo(EmployeeModel, {
  foreignKey: 'employee_id',
  as: 'employee',
});

UsersModel.hasMany(UsersRolesModel, {
  foreignKey: 'user_id',
  as: 'users_roles',
});

UsersModel.hasMany(UsersPermissionsModel, {
  foreignKey: 'user_id',
  as: 'users_permissions',
});

RolesPermissionsModel.belongsTo(RolesModel, {
  foreignKey: 'role_id',
});

UsersRolesModel.belongsTo(RolesModel, {
  foreignKey: 'role_id',
});

RolesModel.hasMany(RolesPermissionsModel, {
  as: 'permissions',
  foreignKey: 'role_id',
});

PermissionsModel.hasMany(RolesPermissionsModel, {
  as: 'permissions',
  foreignKey: 'permission_id',
});
