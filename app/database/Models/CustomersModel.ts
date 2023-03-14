import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '.';

export default class CustomerModel extends Model<
  InferAttributes<CustomerModel>,
  InferCreationAttributes<CustomerModel>
> {
  public id!: CreationOptional<number>;
  public name!: string;
  public cpf!: number;
  public rg!: number;
  public birth_date!: Date;
  public phone!: number;
  public status!: CreationOptional<string>;
}

CustomerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    rg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
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
    tableName: 'customers',
  },
);
