import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import salesModel from '@db-models/SalesModel';
import UsersModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';

export default class SalesModel {
  public async getSales() {
    try {
      return await salesModel.findAll({
        include: [
          {
            model: CustomersModel,
            as: 'customer',
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
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
        ],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar vendas.', error);
    }
  }

  public async getSale(id: number) {
    try {
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: CustomersModel,
            as: 'customer',
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
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
        ],
      });
      if (!sale) throw new HttpError(404, 'Venda não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar venda.', error);
    }
  }

  //TODO adicionar filtros para listagem de vendas (data, cliente, produto, etc)
}
