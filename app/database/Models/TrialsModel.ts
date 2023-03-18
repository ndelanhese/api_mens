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
  public date!: Date;
  public observation!: CreationOptional<string>;
  public status!: CreationOptional<string>;
  public customer_id!: number;
  public employee_id!: number;
  public user_id!: number;
}

TrialsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'realizada',
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'customers',
        },
        key: 'id',
      },
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
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'trials',
  },
);
