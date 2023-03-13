import express, { Router } from 'express';

import ProductsController from '../Controllers/ProductsController';

export default class MyProductRoute {
  private productsRoute: Router;

  private controller: ProductsController;

  constructor() {
    this.productsRoute = express.Router();
    this.controller = new ProductsController();
    this.setup();
  }

  private setup(): void {
    const getProducts = this.controller.getProducts.bind(this.controller);
    const getProductsTypes = this.controller.getProductsType.bind(
      this.controller,
    );
    const getProductsManufacturers =
      this.controller.getProductsManufacturers.bind(this.controller);

    this.productRoute.get('/', getProducts);

    this.productRoute.get('/types', getProductsTypes);
    this.productRoute.get('/manufacturers', getProductsManufacturers);
  }

  get productRoute() {
    return this.productsRoute;
  }
}
