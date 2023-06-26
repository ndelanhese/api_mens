import express, { Router } from 'express';

import CustomersController from '../Controllers/CustomersController';
import createCustomerMiddleware from '../Middleware/CreateCustomerMiddleware';
import deleteCustomerMiddleware from '../Middleware/DeleteCustomerMiddleware';
import updateCustomerMiddleware from '../Middleware/UpdateCustomerMiddleware';

export default class CustomersRoute {
  private customersRoute: Router;

  private customerController: CustomersController;

  constructor() {
    this.customersRoute = express.Router();
    this.customerController = new CustomersController();
    this.setup();
  }

  private setup(): void {
    const getCustomers = this.customerController.getCustomers.bind(
      this.customerController,
    );
    const getCustomer = this.customerController.getCustomer.bind(
      this.customerController,
    );
    const createCustomer = this.customerController.createCustomer.bind(
      this.customerController,
    );
    const updateCustomer = this.customerController.updateCustomer.bind(
      this.customerController,
    );
    const deleteCustomer = this.customerController.deleteCustomer.bind(
      this.customerController,
    );
    const getCustomerStatus = this.customerController.getStatus.bind(
      this.customerController,
    );

    this.customersRoute.get('/status', getCustomerStatus);
    this.customersRoute.get('/', getCustomers);
    this.customersRoute.get('/:id', getCustomer);
    this.customersRoute.post('/', createCustomerMiddleware, createCustomer);
    this.customersRoute.put('/:id', updateCustomerMiddleware, updateCustomer);
    this.customersRoute.delete(
      '/:id',
      deleteCustomerMiddleware,
      deleteCustomer,
    );
  }

  get customerRoute() {
    return this.customersRoute;
  }
}
