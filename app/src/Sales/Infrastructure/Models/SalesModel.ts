import salesModel from '@db-models/SalesModel';
import HttpError from '@exceptions/HttpError';

import Sale from '../../Domain/Entities/Sale';
import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';

export default class SalesModel {
  public async createSale(payload: Sale) {
    // TODO -> adicionar produtos e métodos de pagamento
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      return await salesModel.create({
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
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar venda.', error);
    }
  }

  public async updateSale(payload: Sale): Promise<void> {
    //TODO -> adicionar produtos e métodos de pagamento
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

  public async exportSales() {
    // TODO -> adicionar produtos e métodos de pagamento
    try {
      return await salesModel.findAll({
        order: [['id', 'DESC']],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os vendas.', error);
    }
  }

  public async getSale(id: number) {
    try {
      const sale = await salesModel.findByPk(id, { include: { all: true } });
      if (!sale) throw new HttpError(404, 'Venda não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar venda.', error);
    }
  }
}
