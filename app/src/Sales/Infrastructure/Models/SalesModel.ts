import salesMethodsOfPaymentsModel from '@db-models/SalesMethodsOfPaymentsModel';
import salesModel from '@db-models/SalesModel';
import salesProductsModel from '@db-models/SalesProductsModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import Sale from '../../Domain/Entities/Sale';
import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';

import { ISaleFilter } from './SalesModel.types';

export default class SalesModel {
  public async createSale(payload: Sale) {
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      const sale = await salesModel.create({
        date: payload.getDate(),
        observation: payload.getObservation(),
        total_value: payload.getTotalValue(),
        discount_amount: payload.getDiscountAmount(),
        discount_type: payload.getDiscountType(),
        final_value: payload.getFinalValue(),
        status: payload.getStatus(),
        customer_id: customerId,
        user_id: userId,
      });
      const salesMethodsOfPayments = payload.getPayment();
      if (salesMethodsOfPayments) {
        const payments = salesMethodsOfPayments.map(payment => ({
          installment: payment.getInstallment(),
          sale_id: sale.id,
          method_id: payment.getType(),
        }));
        await salesMethodsOfPaymentsModel.bulkCreate(payments);
      }
      const salesProducts = payload.getProducts();
      if (salesProducts) {
        const products = salesProducts.map(product => ({
          quantity: product.getQuantity(),
          discount_amount: product.getDiscountAmount(),
          discount_type: product.getDiscountType(),
          final_value: product.getFinalValue(),
          sale_id: sale.id,
          product_id: product.getId(),
        }));
        await salesProductsModel.bulkCreate(products);
      }
      return sale;
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar venda.', error);
    }
  }

  public async updateSale(payload: Sale): Promise<void> {
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      await salesModel.update(
        {
          date: payload.getDate(),
          observation: payload.getObservation(),
          total_value: payload.getTotalValue(),
          discount_amount: payload.getDiscountAmount(),
          discount_type: payload.getDiscountType(),
          final_value: payload.getFinalValue(),
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
      const salesMethodsOfPayments = payload.getPayment();
      if (salesMethodsOfPayments) {
        const payments = salesMethodsOfPayments.map(payment => ({
          installment: payment.getInstallment(),
          sale_id: Number(payload.getId()),
          method_id: payment.getType(),
        }));
        await salesMethodsOfPaymentsModel.bulkCreate(payments);
      }
      const salesProducts = payload.getProducts();
      if (salesProducts) {
        const products = salesProducts.map(product => ({
          quantity: product.getQuantity(),
          discount_amount: product.getDiscountAmount(),
          discount_type: product.getDiscountType(),
          final_value: product.getFinalValue(),
          sale_id: Number(payload.getId()),
          product_id: product.getId(),
        }));
        await salesProductsModel.bulkCreate(products);
      }
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o venda.', error);
    }
  }

  public async updateSaleStatus(
    id: number,
    status: StatusTypesOptions,
    observation: string,
  ) {
    try {
      await salesModel.update(
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
      throw new HttpError(500, 'Erro ao atualizar o status do venda.', error);
    }
  }

  public async deleteSale(id: number): Promise<void> {
    // TODO -> adicionar o remover produtos
    try {
      await salesModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar o venda.', error);
    }
  }

  public async exportSales(input: ISaleFilter) {
    // TODO -> adicionar produtos e métodos de pagamento
    // TODO -> adicionar todos filtros
    try {
      const { initial_date, final_date } = input;
      let whereClause: WhereOptions = {};
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          createdAt: {
            ...(initial_date && { [Op.gte]: initial_date }),
            ...(final_date && { [Op.lte]: final_date }),
          },
        };
      }
      return await salesModel.findAll({
        order: [['id', 'DESC']],
        include: { all: true },
        where: whereClause,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os vendas.', error);
    }
  }

  public async getSale(id: number) {
    try {
      const sale = await salesModel.findByPk(id, {
        include: { all: true },
      });
      if (!sale) throw new HttpError(404, 'Venda não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar venda.', error);
    }
  }
}
