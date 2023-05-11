import productModel from '@db-models/SalesModel';
import HttpError from '@exceptions/HttpError';

import Sale from '../../Domain/Entities/Sale';
import { statusEnum } from '../../Domain/Enums/Status';

export default class SalesModel {
  public async createSale(payload: Sale) {
    // TODO -> adicionar produtos
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const employeeId = payload.getEmployee()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      return await productModel.create({
        date: payload.getDate(),
        observation: payload.getObservation(),
        total_value: payload.getTotalValue(),
        discount_amount: payload.getDiscountAmount(),
        discount_type: payload.getDiscountType(),
        final_value: payload.getFinalValue(),
        status: payload.getStatus(),
        customer_id: customerId,
        employee_id: employeeId,
        user_id: userId,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar venda.', error);
    }
  }

  public async updateSale(payload: Sale): Promise<void> {
    //TODO -> adicionar produtos
    try {
      const customerId = payload.getCustomer()?.getId() ?? 1;
      const employeeId = payload.getEmployee()?.getId() ?? 1;
      const userId = payload.getUser()?.getId() ?? 1;
      await productModel.update(
        {
          date: payload.getDate(),
          observation: payload.getObservation(),
          total_value: payload.getTotalValue(),
          discount_amount: payload.getDiscountAmount(),
          discount_type: payload.getDiscountType(),
          final_value: payload.getFinalValue(),
          status: payload.getStatus(),
          customer_id: customerId,
          employee_id: employeeId,
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

  public async updateSaleStatus(id: number, status: statusEnum) {
    try {
      await productModel.update(
        {
          status,
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
      await productModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar o venda.', error);
    }
  }

  public async exportSales() {
    // TODO -> adicionar produtos
    try {
      return await productModel.findAll({
        order: [['id', 'DESC']],
        include: { all: true },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os vendas.', error);
    }
  }
}
