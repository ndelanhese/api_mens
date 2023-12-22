/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomersModel from '@db-models/CustomersModel';
import EmployeesModel from '@db-models/EmployeesModel';
import MethodsOfPaymentsModel from '@db-models/MethodsOfPaymentsModel';
import ProductsModel from '@db-models/ProductsModel';
import SalesMethodsOfPaymentsModel from '@db-models/SalesMethodsOfPaymentsModel';
import salesModel from '@db-models/SalesModel';
import SalesProductsModel from '@db-models/SalesProductsModel';
import UsersModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import {
  Customer,
  Employee,
  ISaleFilter,
  MethodOfPayment,
  Product,
  Sale,
} from './SalesModel.types';

export default class SalesModel {
  public async getSales(input: ISaleFilter) {
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
      const sales = await salesModel.findAll({
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
                attributes: ['id', 'name', 'cpf'],
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
              },
            ],
          },
          {
            model: SalesProductsModel,
            as: 'sales_products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
              },
            ],
          },
        ],
      });

      const simplifiedSales = sales.map((sale: any) => {
        const saleData = sale.toJSON() as Sale;
        const customer = sale.customer.toJSON() as Customer;
        const employee = sale.user.employee.toJSON() as Employee;
        const methodsOfPayments = sale.methods_of_payments.map(
          (method: any) => {
            const methodData = method.toJSON() as MethodOfPayment;
            return {
              ...methodData,
              installment: method.installment,
            };
          },
        );
        const productData = sale.sales_products.map(
          (product: any) => product.product.toJSON() as Product,
        );

        const {
          id,
          date,
          observation,
          total_value,
          discount_amount,
          discount_type,
          final_value,
          status,
          createdAt,
        } = saleData;

        return {
          id,
          date,
          observation,
          total_value,
          discount_amount,
          discount_type,
          final_value,
          status,
          createdAt,
          customer,
          employee,
          methods_of_payments: methodsOfPayments,
          products: productData,
        };
      });

      return simplifiedSales;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar vendas.', error);
    }
  }

  public async getSale(id: number) {
    try {
      const sale: any = await salesModel.findByPk(id, {
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
                attributes: ['id', 'name', 'cpf'],
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
                  exclude: ['createdAt', 'updatedAt'],
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
      const saleData = sale.toJSON() as Sale;
      const customer = sale.customer.toJSON() as Customer;
      const employee = sale.user.employee.toJSON() as Employee;
      const methodsOfPayments = sale.methods_of_payments.map((method: any) => {
        const methodData = method.toJSON() as MethodOfPayment;
        return {
          ...methodData,
          installment: method.installment,
        };
      });
      const productData = sale.sales_products.map(
        (product: any) => product.product.toJSON() as Product,
      );

      const {
        id: saleId,
        date,
        observation,
        total_value,
        discount_amount,
        discount_type,
        final_value,
        status,
        createdAt,
      } = saleData;

      return {
        id: saleId,
        date,
        observation,
        total_value,
        discount_amount,
        discount_type,
        final_value,
        status,
        createdAt,
        customer,
        employee,
        methods_of_payments: methodsOfPayments,
        products: productData,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar venda.', error);
    }
  }

  public async getMethodsOfPayment() {
    try {
      return MethodsOfPaymentsModel.findAll({
        attributes: ['id', 'name'],
      });
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar métodos de pagamento.', error);
    }
  }
}
