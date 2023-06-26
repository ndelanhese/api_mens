import express, { Router } from 'express';

import OrdersController from '../Controllers/OrdersController';
import createOrderMiddleware from '../Middleware/CreateOrderMiddleware';
import updateOrderMiddleware from '../Middleware/UpdateOrderMiddleware';
import updateOrderStatusMiddleware from '../Middleware/UpdateOrderStatusMiddleware';

export default class OrdersRoute {
  private ordersRoute: Router;

  private ordersController: OrdersController;

  constructor() {
    this.ordersRoute = express.Router();
    this.ordersController = new OrdersController();
    this.setup();
  }

  private setup(): void {
    const getOrders = this.ordersController.getOrders.bind(
      this.ordersController,
    );
    const getOrder = this.ordersController.getOrder.bind(this.ordersController);
    const createOrder = this.ordersController.createOrder.bind(
      this.ordersController,
    );
    const updateOrder = this.ordersController.updateOrder.bind(
      this.ordersController,
    );
    const updateOrderStatus = this.ordersController.updateOrderStatus.bind(
      this.ordersController,
    );
    const exportOrders = this.ordersController.exportOrders.bind(
      this.ordersController,
    );
    const getOrdersStatus = this.ordersController.getStatus.bind(
      this.ordersController,
    );

    this.orderRoute.get('/status', getOrdersStatus);
    this.orderRoute.get('/', getOrders);
    this.orderRoute.get('/:id', getOrder);
    this.orderRoute.put(
      '/:id/status',
      updateOrderStatusMiddleware,
      updateOrderStatus,
    );
    this.orderRoute.put('/:id', updateOrderMiddleware, updateOrder);
    this.orderRoute.post('/export', exportOrders);
    this.orderRoute.post('/', createOrderMiddleware, createOrder);
  }

  get orderRoute() {
    return this.ordersRoute;
  }
}
