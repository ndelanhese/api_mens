import salesModel from '@db-models/SalesModel';
import HttpError from '@exceptions/HttpError';

export default class SalesModel {
  public async getSales() {
    try {
      return await salesModel.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar vendas.', error);
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

  //TODO adicionar filtros para listagem de vendas (data, cliente, produto, etc)
}
