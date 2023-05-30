import express, { Router } from 'express';

import AddressesController from '../Controllers/AddressesController';
import createAddressMiddleware from '../Middleware/CreateAddressMiddleware';
import deleteAddressMiddleware from '../Middleware/DeleteAddressMiddleware';
import updateAddressMiddleware from '../Middleware/UpdateAddressMiddleware';

export default class AddressesRoute {
  private addressesRoute: Router;
  private addressesController: AddressesController;

  constructor() {
    this.addressesRoute = express.Router();
    this.addressesController = new AddressesController();
    this.setup();
  }

  private setup(): void {
    const getAddresses = this.addressesController.getAddresses.bind(
      this.addressesController,
    );
    const getAddress = this.addressesController.getAddress.bind(
      this.addressesController,
    );

    const createAddress = this.addressesController.createAddress.bind(
      this.addressesController,
    );
    const deleteAddress = this.addressesController.deleteAddress.bind(
      this.addressesController,
    );
    const updateAddress = this.addressesController.updateAddress.bind(
      this.addressesController,
    );
    this.addressesRoute.get('/', getAddresses);
    this.addressesRoute.get('/:id', getAddress);
    this.addressesRoute.post('/', createAddressMiddleware, createAddress);
    this.addressesRoute.delete('/:id', deleteAddressMiddleware, deleteAddress);
    this.addressesRoute.put('/:id', updateAddressMiddleware, updateAddress);
  }

  get addressRoute() {
    return this.addressesRoute;
  }
}
