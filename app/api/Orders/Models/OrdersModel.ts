import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import ordersModel from '@db-models/OrdersModel';
import OrdersProductsModel from '@db-models/OrdersProductsModel';
import ProductsModel from '@db-models/ProductsModel';
import UsersModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { IOrderFilter } from './OrdersModel.types';

export default class OrdersModel {
  public async getOrders(input: IOrderFilter) {
    try {
      const { initial_date, final_date, status, customers_id, users_id } =
        input;
      let whereClause: WhereOptions = {};
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          date: {
            ...(initial_date && { [Op.gte]: initial_date }),
            ...(final_date && { [Op.lte]: final_date }),
          },
        };
      }
      if (status) whereClause = { ...whereClause, status: { [Op.in]: status } };
      if (customers_id) {
        whereClause = {
          ...whereClause,
          customer_id: { [Op.in]: customers_id },
        };
      }
      if (users_id) {
        whereClause = {
          ...whereClause,
          user_id: { [Op.in]: users_id },
        };
      }
      return await ordersModel.findAll({
        order: [['id', 'DESC']],
        where: whereClause,
        include: [
          {
            model: CustomersModel,
            as: 'customer',
          },
          {
            model: UsersModel,
            as: 'user',
            attributes: { exclude: ['password'] },
            include: [
              {
                model: EmployeesModel,
                as: 'employee',
              },
            ],
          },
          {
            model: OrdersProductsModel,
            as: 'orders_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar pedidos.', error);
    }
  }

  public async getOrder(id: number) {
    try {
      const order = await ordersModel.findByPk(id, {
        include: [
          {
            model: CustomersModel,
            as: 'customer',
            attributes: { exclude: ['status', 'created_at', 'updated_at'] },
          },
          {
            model: UsersModel,
            as: 'user',
            attributes: ['id'],
            include: [
              {
                model: EmployeesModel,
                as: 'employee',
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: OrdersProductsModel,
            as: 'orders_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
                attributes: {
                  exclude: [
                    'created_at',
                    'updated_at',
                    'quantity',
                    'purchase_price',
                  ],
                },
              },
            ],
            attributes: [
              'id',
              'quantity',
              'discount_amount',
              'discount_type',
              'final_value',
            ],
          },
        ],
      });
      if (!order) throw new HttpError(404, 'Pedido não encontrada.');
      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar pedido.', error);
    }
  }
}
