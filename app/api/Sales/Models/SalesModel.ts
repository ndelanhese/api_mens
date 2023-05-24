import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import MethodsOfPaymentsModel from '@db-models/MethodsOfPaymentsModel';
import ProductsModel from '@db-models/ProductsModel';
import SalesMethodsOfPaymentsModel from '@db-models/SalesMethodsOfPaymentsModel';
import salesModel from '@db-models/SalesModel';
import SalesProductsModel from '@db-models/SalesProductsModel';
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
          {
            model: SalesMethodsOfPaymentsModel,
            as: 'methods_of_payments',
            include: [
              {
                model: MethodsOfPaymentsModel,
                as: 'method',
                attributes: ['id', 'name'],
              },
            ],
            attributes: ['installment'],
          },
          {
            model: SalesProductsModel,
            as: 'sales_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
                attributes: {
                  exclude: [
                    'createdAt',
                    'updatedAt',
                    'quantity',
                    'purchase_price',
                  ],
                },
              },
            ],
            attributes: [
              'quantity',
              'discount_amount',
              'discount_type',
              'final_value',
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
          {
            model: SalesMethodsOfPaymentsModel,
            as: 'methods_of_payments',
            include: [
              {
                model: MethodsOfPaymentsModel,
                as: 'method',
                attributes: ['id', 'name'],
              },
            ],
            attributes: ['id', 'installment'],
          },
          {
            model: SalesProductsModel,
            as: 'sales_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
                attributes: {
                  exclude: [
                    'createdAt',
                    'updatedAt',
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
      if (!sale) throw new HttpError(404, 'Venda não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar venda.', error);
    }
  }

  //TODO adicionar filtros para listagem de vendas (data, cliente, produto, etc)
}
