/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';
import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import ordersModel from '@db-models/OrdersModel';
import ordersProductsModel from '@db-models/OrdersProductsModel';
import ProductsModel from '@db-models/ProductsModel';
import UsersModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import Order from '../../Domain/Entities/Order';
import { IOrderExportResponse } from '../Repositories/OrdersRepository.types';

import { IOrderFilter } from './OrdersModel.types';

export default class OrdersModel {
  public async createOrder(payload: Order) {
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      const order = await ordersModel.create({
        date: payload.getDate(),
        observation: payload.getObservation(),
        description: payload.getDescription(),
        status: payload.getStatus(),
        customer_id: customerId,
        user_id: userId,
      });

      const ordersProducts = payload.getProducts();
      if (ordersProducts) {
        const products = ordersProducts.map(product => ({
          quantity: product.getQuantity(),
          order_id: order.id,
          product_id: product.getId(),
        }));
        await ordersProductsModel.bulkCreate(products);
      }
      return order;
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar pedido.', error);
    }
  }

  public async updateOrder(payload: Order): Promise<void> {
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      await ordersModel.update(
        {
          date: payload.getDate(),
          observation: payload.getObservation(),
          description: payload.getDescription(),
          status: payload.getStatus(),
          customer_id: customerId,
          user_id: userId,
        },
        {
          where: {
            id: payload.getId(),
          },
        },
      );
      const ordersProducts = payload.getProducts();
      if (ordersProducts) {
        const products = ordersProducts.map(product => ({
          quantity: product.getQuantity(),
          order_id: Number(payload.getId()),
          product_id: product.getId(),
        }));
        await ordersProductsModel.bulkCreate(products);
      }
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o pedido.', error);
    }
  }

  public async updateOrderStatus(
    id: number,
    status: StatusTypesOptions,
    observation: string,
  ) {
    try {
      await ordersModel.update(
        {
          status,
          observation,
        },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o status do pedido.', error);
    }
  }

  public async deleteOrder(id: number): Promise<void> {
    try {
      await ordersModel.destroy({
        where: {
          id,
        },
        cascade: true,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar o pedido.', error);
    }
  }

  public async exportOrders(
    input: IOrderFilter,
  ): Promise<IOrderExportResponse[]> {
    try {
      const { initial_date, final_date, status, customers_id, users_id } =
        input;
      let whereClause: WhereOptions = {};
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          created_at: {
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
      return (await ordersModel.findAll({
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
            model: ordersProductsModel,
            as: 'orders_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
              },
            ],
          },
        ],
      })) as any[];
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os pedidos.', error);
    }
  }

  public async getOrder(id: number) {
    try {
      const order = await ordersModel.findByPk(id, {
        include: { all: true },
      });
      if (!order) throw new HttpError(404, 'Venda não encontrada.');
      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar pedido.', error);
    }
  }
}
