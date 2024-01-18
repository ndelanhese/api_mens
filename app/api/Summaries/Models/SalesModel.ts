/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatMoneyByCurrencySymbol } from '@app/src/Shared/Infrastructure/Utils/helpers/money';
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
      const { initial_date, final_date } = input;
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
      whereClause = { ...whereClause, status: { [Op.not]: 'canceled' } };
      return await salesModel.findAll({
        order: [['id', 'DESC']],
        where: whereClause,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar vendas.', error);
    }
  }

  public async getFullSalesData(input: ISaleFilter) {
    try {
      const { initial_date, final_date } = input;
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
      whereClause = { ...whereClause, status: { [Op.not]: 'canceled' } };
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
        const productData = sale.sales_products.map((product: any) => {
          return {
            sold_product_qty: product.quantity,
            product_final_value_unity: Number(product.final_value.toFixed(2)),
            product_final_value_unity_formatted: formatMoneyByCurrencySymbol(
              Number(product.final_value.toFixed(2)),
            ),
            products_final_value: Number(
              (product.final_value * product.quantity).toFixed(2),
            ),
            products_final_value_formatted: formatMoneyByCurrencySymbol(
              Number((product.final_value * product.quantity).toFixed(2)),
            ),
            ...(product.product.toJSON() as Product),
          };
        });

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
}
