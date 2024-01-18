/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import ListPaymentMethodsFactory from '../Factories/ListPaymentMethodsFactory';
import ListProductsBrandsFactory from '../Factories/ListProductsBrandsFactory';
import ListProductsCategoryFactory from '../Factories/ListProductsCategoryFactory';
import ListProductsFactory from '../Factories/ListProductsFactory';
import ListSaleFactory from '../Factories/ListSaleFactory';
import CustomersModel from '../Models/CustomersModel';
import OrdersModel from '../Models/OrdersModel';
import PaymentMethodsModel from '../Models/PaymentsMethods';
import ProductsBrandsModel from '../Models/ProductsBrandsModel';
import ProductsCategoriesModel from '../Models/ProductsCategoriesModel';
import ProductsModel from '../Models/ProductsModel';
import SalesModel from '../Models/SalesModel';

import {
  IBrandSummary,
  ICategorySummary,
  IMethodSummary,
  IPaymentMethodsResponse,
  IProductSummary,
  IProductsBrandsResponse,
  IProductsCategoriesResponse,
  IProductsResponse,
  IMonthlyData,
  ISaleData,
} from './SummariesController.types';

export default class SummariesController extends BaseController {
  public async getTopProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-summaries-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsModel();
      const { final_date, final_value, initial_date, initial_value } =
        ListProductsFactory.fromRequest(req);
      const { direction, order } = PaginationFactory.fromRequest(req);
      const summaries = await summariesModel.getProducts(
        initial_date,
        final_date,
        initial_value,
        final_value,
        order,
        direction,
      );
      const calculatedProductsSummary = this.returnInData(
        this.calculateProductSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsSummary);
      return res.status(200).json(calculatedProductsSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getTopMethodsOfPayments(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `methods-of-payments-summaries-${JSON.stringify(
        req.query,
      )}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const paymentMethodsModel = new PaymentMethodsModel();
      const { final_date, initial_date } =
        ListPaymentMethodsFactory.fromRequest(req);
      const { direction, order } = PaginationFactory.fromRequest(req);
      const summaries = await paymentMethodsModel.getPaymentMethods(
        initial_date,
        final_date,
        order,
        direction,
      );
      const calculatedPaymentMethodsSummary = this.returnInData(
        this.calculatePaymentMethodsSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedPaymentMethodsSummary);
      return res.status(200).json(calculatedPaymentMethodsSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getTopProductsCategories(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-categories-summaries-${JSON.stringify(
        req.query,
      )}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsCategoriesModel();
      const { final_date, initial_date } =
        ListProductsCategoryFactory.fromRequest(req);
      const { direction, order } = PaginationFactory.fromRequest(req);
      const summaries = await summariesModel.getProducts(
        initial_date,
        final_date,
        order,
        direction,
      );
      const calculatedProductsCategoriesSummary = this.returnInData(
        this.calculateProductsCategoriesSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsCategoriesSummary);
      return res.status(200).json(calculatedProductsCategoriesSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getTopProductsBrands(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-brands-summaries-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsBrandsModel();
      const { final_date, initial_date } =
        ListProductsBrandsFactory.fromRequest(req);
      const { direction, order } = PaginationFactory.fromRequest(req);
      const summaries = await summariesModel.getProducts(
        initial_date,
        final_date,
        order,
        direction,
      );
      const calculatedProductsBrandsSummary = this.returnInData(
        this.calculateProductsBrandsSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsBrandsSummary);
      return res.status(200).json(calculatedProductsBrandsSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getOverview(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `sales-summaries${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }

      const inputData = ListSaleFactory.fromRequest(req);
      const salesModel = new SalesModel();
      const sales = await salesModel.getSales(inputData);
      const customersModel = new CustomersModel();
      const customers = await customersModel.getCustomers(inputData);
      const ordersModel = new OrdersModel();
      const orders = await ordersModel.getOrders(inputData);
      const fullSales = await salesModel.getFullSalesData(inputData);
      const currentDate = new Date();
      const lastMonth = new Date(currentDate);
      lastMonth.setMonth(currentDate.getMonth() - 1);
      const lastYear = new Date(currentDate);
      lastYear.setFullYear(currentDate.getFullYear() - 1);

      const lastMonthSales = await salesModel.getSales({
        final_date: currentDate,
        initial_date: lastMonth,
      });
      const lastMonthCustomers = await customersModel.getCustomers({
        final_date: currentDate,
        initial_date: lastMonth,
      });
      const lastMonthOrders = await ordersModel.getOrders({
        final_date: currentDate,
        initial_date: lastMonth,
      });

      const totalRevenue = sales.reduce(
        (accumulator, sale) => accumulator + sale.final_value,
        0,
      );
      const lastMonthTotalRevenue = lastMonthSales.reduce(
        (accumulator, sale) => accumulator + sale.final_value,
        0,
      );
      const differenceBetweenTotalRevenue = this.calculatePercentage(
        totalRevenue,
        lastMonthTotalRevenue,
      );

      const salesQty = sales.length;
      const lastMonthSalesQty = lastMonthSales.length;
      const differenceBetweenSalesQty = this.calculatePercentage(
        salesQty,
        lastMonthSalesQty,
      );

      const customersQty = customers.length;
      const lastMonthCustomersQty = lastMonthCustomers.length;
      const differenceBetweenCustomersQty = this.calculatePercentage(
        customersQty,
        lastMonthCustomersQty,
      );

      const ordersQty = orders.length;
      const lastMonthOrdersQty = lastMonthOrders.length;
      const differenceBetweenOrdersQty = this.calculatePercentage(
        ordersQty,
        lastMonthOrdersQty,
      );

      const lastYearSales: ISaleData[] = (await salesModel.getSales({
        final_date: currentDate,
        initial_date: lastYear,
      })) as any[];

      const overviewData = {
        total_revenue: totalRevenue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        total_revenue_difference_from_last_month: differenceBetweenTotalRevenue,
        sales_qty: salesQty,
        sales_qty_difference_from_last_month: differenceBetweenSalesQty,
        customers_qty: customersQty,
        customers_qty_difference_from_last_month: differenceBetweenCustomersQty,
        orders_qty: ordersQty,
        orders_qty_difference_from_last_month: differenceBetweenOrdersQty,
        overview: this.getMonthlyData(lastYearSales),
        recent_sales: fullSales.slice(0, 5),
        last_month_sales_qty: lastMonthSalesQty,
      };
      await this.createCache(cacheKey, overviewData);
      return res.status(200).json(overviewData);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private getMonthlyData(data: ISaleData[]): IMonthlyData[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const monthlyData: IMonthlyData[] = [];

    for (let i = 12; i > 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12;
      const targetYear = currentYear - Math.floor((currentMonth - i + 12) / 12);

      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === targetMonth &&
          itemDate.getFullYear() === targetYear
        );
      });

      const totalRevenue = filteredData.reduce(
        (sum, item) => sum + item.final_value,
        0,
      );

      monthlyData.push({
        month_name: `${monthNames[targetMonth].slice(0, 3)}`,
        total_revenue: totalRevenue,
      });
    }

    return monthlyData;
  }

  private calculatePercentage(totalValue: number, otherValue: number) {
    if (totalValue <= 0 && otherValue <= 0) return '0%';
    if (totalValue <= 0) return '100%';
    if (otherValue <= 0) return '-100%';
    return Math.round((otherValue * 100) / totalValue).toString() + '%';
  }

  private calculateProductSummary(salesProducts: IProductsResponse[]) {
    const productsSummary: Record<number, IProductSummary> =
      salesProducts.reduce((summary, saleProduct) => {
        const { product } = saleProduct;
        const { id } = product;

        if (summary[id]) {
          summary[id].quantity += saleProduct.quantity;
        } else {
          summary[id] = {
            id,
            name: product.name,
            description: product.description,
            quantity: saleProduct.quantity,
          };
        }
        return summary;
      }, {} as Record<number, IProductSummary>);
    return Object.values(productsSummary);
  }

  private calculatePaymentMethodsSummary(
    paymentMethods: IPaymentMethodsResponse[],
  ) {
    const paymentMethodsSummary: Record<number, IMethodSummary> =
      paymentMethods.reduce((summary, paymentMethod) => {
        const { method } = paymentMethod;
        const { id } = method;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: method.name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, IMethodSummary>);
    return Object.values(paymentMethodsSummary);
  }

  private calculateProductsCategoriesSummary(
    productsCategories: IProductsCategoriesResponse[],
  ) {
    const productsCategoriesSummary: Record<number, ICategorySummary> =
      productsCategories.reduce((summary, productCategory) => {
        const { product } = productCategory;
        const { id, name } = product.category;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, ICategorySummary>);
    return Object.values(productsCategoriesSummary);
  }

  private calculateProductsBrandsSummary(
    productsBrands: IProductsBrandsResponse[],
  ) {
    const productsBrandsSummary: Record<number, IBrandSummary> =
      productsBrands.reduce((summary, productBrand) => {
        const { product } = productBrand;
        const { id, name } = product.brand;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, IBrandSummary>);
    return Object.values(productsBrandsSummary);
  }
}

//TODO -> Gerar pdf (exportar)
//TODO -> Gerar excel (exportar)
