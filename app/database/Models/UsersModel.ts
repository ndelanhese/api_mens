import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import AddressesModel from './AddressesModel';
import BrandsModel from './BrandsModel';
import CategoriesModel from './CategoriesModel';
import CustomersAddressesModel from './CustomersAddressesModel';
import CustomerModel from './CustomersModel';
import CustomersModel from './CustomersModel';
import EmployeesAddressesModel from './EmployeesAddressesModel';
import EmployeeModel from './EmployeesModel';
import MethodsOfPaymentsModel from './MethodsOfPaymentsModel';
import OrdersModel from './OrdersModel';
import OrdersProductsModel from './OrdersProductsModel';
import PermissionsModel from './PermissionsModel';
import ProductsModel from './ProductsModel';
import PromotionsCategoriesModel from './PromotionsCategoriesModel';
import PromotionsModel from './PromotionsModel';
import RolesModel from './RolesModel';
import RolesPermissionsModel from './RolesPermissionsModel';
import SalesMethodsOfPaymentsModel from './SalesMethodsOfPaymentsModel';
import SalesModel from './SalesModel';
import SalesProductsModel from './SalesProductsModel';
import SuppliersAddressesModel from './SuppliersAddressesModel';
import SuppliersModel from './SuppliersModel';
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
    timestamps: true,
    paranoid: true,
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

//CUSTOMER
CustomersAddressesModel.belongsTo(CustomerModel, {
  foreignKey: 'customer_id',
});

CustomersAddressesModel.belongsTo(AddressesModel, {
  foreignKey: 'address_id',
  as: 'address',
});

AddressesModel.hasMany(CustomersAddressesModel, {
  as: 'addresses',
  foreignKey: 'address_id',
});

CustomerModel.hasMany(CustomersAddressesModel, {
  as: 'addresses',
  foreignKey: 'customer_id',
});

//EMPLOYEE
EmployeesAddressesModel.belongsTo(EmployeeModel, {
  foreignKey: 'employee_id',
});

EmployeesAddressesModel.belongsTo(AddressesModel, {
  foreignKey: 'address_id',
  as: 'address',
});

AddressesModel.hasMany(EmployeesAddressesModel, {
  foreignKey: 'address_id',
});

EmployeeModel.hasMany(EmployeesAddressesModel, {
  as: 'employee_addresses',
  foreignKey: 'employee_id',
});

//SUPPLIERS
SuppliersAddressesModel.belongsTo(SuppliersModel, {
  foreignKey: 'supplier_id',
});

SuppliersAddressesModel.belongsTo(AddressesModel, {
  foreignKey: 'address_id',
  as: 'address',
});

AddressesModel.hasMany(SuppliersAddressesModel, {
  foreignKey: 'address_id',
});

SuppliersModel.hasMany(SuppliersAddressesModel, {
  as: 'supplier_addresses',
  foreignKey: 'supplier_id',
});

ProductsModel.belongsTo(CategoriesModel, {
  as: 'category',
  foreignKey: 'category_id',
});

CategoriesModel.hasMany(ProductsModel, {
  foreignKey: 'category_id',
  as: 'category_product',
});

ProductsModel.belongsTo(BrandsModel, {
  as: 'brand',
  foreignKey: 'brand_id',
});

BrandsModel.hasMany(ProductsModel, {
  foreignKey: 'brand_id',
  as: 'brand_product',
});

ProductsModel.belongsTo(SuppliersModel, {
  as: 'supplier',
  foreignKey: 'supplier_id',
});

SuppliersModel.hasMany(ProductsModel, {
  foreignKey: 'supplier_id',
  as: 'supplier_product',
});

SalesModel.belongsTo(CustomersModel, {
  foreignKey: 'customer_id',
  as: 'customer',
});

CustomersModel.hasMany(SalesModel, {
  foreignKey: 'customer_id',
  as: 'customer_sale',
});

SalesModel.belongsTo(UsersModel, {
  foreignKey: 'user_id',
  as: 'user',
});

UsersModel.hasMany(SalesModel, {
  foreignKey: 'user_id',
  as: 'user_sale',
});

// Sales x methods of payments
SalesModel.hasMany(SalesMethodsOfPaymentsModel, {
  foreignKey: 'sale_id',
  as: 'methods_of_payments',
});

SalesMethodsOfPaymentsModel.belongsTo(SalesModel, {
  foreignKey: 'sale_id',
});

SalesMethodsOfPaymentsModel.belongsTo(MethodsOfPaymentsModel, {
  foreignKey: 'method_id',
  as: 'method',
});

MethodsOfPaymentsModel.hasMany(SalesMethodsOfPaymentsModel, {
  foreignKey: 'method_id',
  as: 'sale_methods_of_payments',
});

// Sales x products
SalesModel.hasMany(SalesProductsModel, {
  foreignKey: 'sale_id',
  as: 'sales_products',
});

SalesProductsModel.belongsTo(SalesModel, {
  foreignKey: 'sale_id',
});

SalesProductsModel.belongsTo(ProductsModel, {
  foreignKey: 'product_id',
  as: 'product',
});

ProductsModel.hasMany(SalesProductsModel, {
  foreignKey: 'product_id',
  as: 'sales_products',
});

// Order x products
OrdersModel.hasMany(OrdersProductsModel, {
  foreignKey: 'order_id',
  as: 'orders_products',
});

OrdersProductsModel.belongsTo(OrdersModel, {
  foreignKey: 'order_id',
});

OrdersProductsModel.belongsTo(ProductsModel, {
  foreignKey: 'product_id',
  as: 'product',
});

ProductsModel.hasMany(OrdersProductsModel, {
  foreignKey: 'product_id',
  as: 'orders_products',
});

OrdersModel.belongsTo(CustomersModel, {
  foreignKey: 'customer_id',
  as: 'customer',
});

CustomersModel.hasMany(OrdersModel, {
  foreignKey: 'customer_id',
  as: 'customer_order',
});

OrdersModel.belongsTo(UsersModel, {
  foreignKey: 'user_id',
  as: 'user',
});

UsersModel.hasMany(OrdersModel, {
  foreignKey: 'user_id',
  as: 'user_order',
});

// Promotion x Promotion Category
PromotionsModel.belongsTo(PromotionsCategoriesModel, {
  as: 'category',
  foreignKey: 'promotion_category_id',
});

PromotionsCategoriesModel.hasMany(PromotionsModel, {
  foreignKey: 'promotion_category_id',
  as: 'category_promotion',
});
