/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import ordersModel from '@db-models/OrdersModel';
import OrdersProductsModel from '@db-models/OrdersProductsModel';
import ProductsModel from '@db-models/ProductsModel';
import UsersModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import {
  Customer,
  Employee,
  IOrderFilter,
  Order,
  Product,
} from './OrdersModel.types';

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
      const orders: any = await ordersModel.findAll({
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

      const simplifiedOrder = orders.map((order: any) => {
        const orderData = order.toJSON() as Order;
        const customer = order.customer.toJSON() as Customer;
        const employee = order.user.employee.toJSON() as Employee;
        const productData = order.orders_products.map(
          (product: any) => product.product.toJSON() as Product,
        );

        const { id, date, description, observation, status, createdAt } =
          orderData;

        return {
          id,
          date,
          observation,
          description,
          status,
          createdAt,
          customer,
          employee,
          orders_products: productData.map((product: Product) => ({
            id: product.id,
            quantity: product.quantity,
            createdAt,
            product,
          })),
        };
      });

      return simplifiedOrder;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar pedidos.', error);
    }
  }

  public async getOrder(orderId: number) {
    try {
      const order: any = await ordersModel.findByPk(orderId, {
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
      if (!order) throw new HttpError(404, 'Pedido não encontrada.');
      const orderData = order.toJSON() as Order;
      const customer = order.customer.toJSON() as Customer;
      const employee = order.user.employee.toJSON() as Employee;
      const productData = order.orders_products.map(
        (product: any) => product.product.toJSON() as Product,
      );

      const { id, date, description, observation, status, createdAt } =
        orderData;

      return {
        id,
        date,
        observation,
        description,
        status,
        createdAt,
        customer,
        employee,
        orders_products: productData.map((product: Product) => ({
          id: product.id,
          quantity: product.quantity,
          createdAt,
          product,
        })),
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar pedido.', error);
    }
  }
}
