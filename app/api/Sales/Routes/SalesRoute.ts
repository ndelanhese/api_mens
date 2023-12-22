import express, { Router } from 'express';

import SalesController from '../Controllers/SalesController';
import createSaleMiddleware from '../Middleware/CreateSaleMiddleware';
import updateSaleMiddleware from '../Middleware/UpdateSaleMiddleware';
import updateSaleStatusMiddleware from '../Middleware/UpdateSaleStatusMiddleware';

export default class SalesRoute {
  private salesRoute: Router;

  private salesController: SalesController;

  constructor() {
    this.salesRoute = express.Router();
    this.salesController = new SalesController();
    this.setup();
  }

  private setup(): void {
    const getSales = this.salesController.getSales.bind(this.salesController);
    const getSale = this.salesController.getSale.bind(this.salesController);
    const createSale = this.salesController.createSale.bind(
      this.salesController,
    );
    const updateSale = this.salesController.updateSale.bind(
      this.salesController,
    );
    const updateSaleStatus = this.salesController.updateSaleStatus.bind(
      this.salesController,
    );
    const exportSales = this.salesController.exportSales.bind(
      this.salesController,
    );
    const getPromotionStatus = this.salesController.getStatus.bind(
      this.salesController,
    );
    const getPromotionDiscountType = this.salesController.getDiscountTypes.bind(
      this.salesController,
    );
    const getMethodsOfPayments = this.salesController.getMethodsOfPayments.bind(
      this.salesController,
    );

    this.saleRoute.get('/status', getPromotionStatus);
    this.saleRoute.get('/discount-types', getPromotionDiscountType);
    this.saleRoute.get('/methods-of-payments', getMethodsOfPayments);
    this.saleRoute.get('/', getSales);
    this.saleRoute.get('/:id', getSale);
    this.saleRoute.put(
      '/:id/status',
      updateSaleStatusMiddleware,
      updateSaleStatus,
    );
    this.saleRoute.put('/:id', updateSaleMiddleware, updateSale);
    this.saleRoute.post('/export', exportSales);
    this.saleRoute.post('/', createSaleMiddleware, createSale);
  }

  get saleRoute() {
    return this.salesRoute;
  }
}
