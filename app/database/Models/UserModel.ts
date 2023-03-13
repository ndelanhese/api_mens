import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';
import RoleModel from './RoleModel';
import RolePermissionModel from './RolePermissionModel';
import UserPermissionModel from './UserPermissionModel';
import UserRoleModel from './UserRoleModel';
import EstimateModel from './EstimateModel';
import ProductsModel from './ProductsModel';
import EstimatesProductsModel from './EstimateProducts';
import BannersModel from './BannersModel';
import MediaModel from './MediasModel';
import PermissionModel from './PermissionModel';
import ProductsManufacturersModel from './ProductsManufacturersModel';

export default class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  public id!: CreationOptional<number>;

  public first_name!: string;

  public last_name!: string;

  public phone_number!: string;

  public email!: string;

  public password!: string;

  public status!: string;

  public deletedAt!: CreationOptional<Date | null>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  },
);

UserModel.hasMany(UserRoleModel, {
  foreignKey: 'user_id',
  as: 'users_roles',
});

UserModel.hasMany(UserPermissionModel, {
  foreignKey: 'user_id',
  as: 'users_permissions',
});

RolePermissionModel.hasMany(RoleModel, {
  foreignKey: 'id',
});

UserRoleModel.belongsTo(RoleModel, {
  foreignKey: 'id',
});

EstimateModel.hasMany(EstimatesProductsModel, {
  as: 'products',
  foreignKey: 'estimate_id',
});

ProductsModel.hasMany(EstimatesProductsModel, {
  as: 'estimates',
  foreignKey: 'product_id',
});

EstimatesProductsModel.belongsTo(ProductsModel, {
  as: 'product',
  foreignKey: 'product_id',
});

RoleModel.hasMany(RolePermissionModel, {
  as: 'permissions',
  foreignKey: 'role_id',
});

PermissionModel.hasMany(RolePermissionModel, {
  as: 'permissions',
  foreignKey: 'permission_id',
});

BannersModel.belongsTo(MediaModel, {
  as: 'desktop_image',
  foreignKey: 'desktop_image_id',
});

BannersModel.belongsTo(MediaModel, {
  as: 'mobile_image',
  foreignKey: 'mobile_image_id',
});

MediaModel.hasMany(BannersModel, {
  foreignKey: 'desktop_image_id',
  as: 'desktop_image_media',
});

MediaModel.hasMany(BannersModel, {
  foreignKey: 'mobile_image_id',
  as: 'mobile_image_media',
});

ProductsModel.belongsTo(ProductsManufacturersModel, {
  foreignKey: 'manufacturer_slug',
  as: 'slug',
});

ProductsManufacturersModel.hasMany(ProductsModel, {
  foreignKey: 'manufacturer_slug',
  as: 'slug-product',
});
