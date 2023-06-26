import express, { Router } from 'express';

import SuppliersController from '../Controllers/SuppliersController';
import createSupplierMiddleware from '../Middleware/CreateSupplierMiddleware';
import deleteSupplierMiddleware from '../Middleware/DeleteSupplierMiddleware';
import updateSupplierMiddleware from '../Middleware/UpdateSupplierMiddleware';

export default class SuppliersRoute {
  private suppliersRoute: Router;

  private supplierController: SuppliersController;

  constructor() {
    this.suppliersRoute = express.Router();
    this.supplierController = new SuppliersController();
    this.setup();
  }

  private setup(): void {
    const getSuppliers = this.supplierController.getSuppliers.bind(
      this.supplierController,
    );
    const getSupplier = this.supplierController.getSupplier.bind(
      this.supplierController,
    );
    const createSupplier = this.supplierController.createSupplier.bind(
      this.supplierController,
    );
    const updateSupplier = this.supplierController.updateSupplier.bind(
      this.supplierController,
    );
    const deleteSupplier = this.supplierController.deleteSupplier.bind(
      this.supplierController,
    );
    const getEmployeeStatus = this.supplierController.getStatus.bind(
      this.supplierController,
    );

    this.suppliersRoute.get('/status', getEmployeeStatus);
    this.suppliersRoute.get('/', getSuppliers);
    this.suppliersRoute.get('/:id', getSupplier);
    this.suppliersRoute.post('/', createSupplierMiddleware, createSupplier);
    this.suppliersRoute.put('/:id', updateSupplierMiddleware, updateSupplier);
    this.suppliersRoute.delete(
      '/:id',
      deleteSupplierMiddleware,
      deleteSupplier,
    );
  }

  get supplierRoute() {
    return this.suppliersRoute;
  }
}
