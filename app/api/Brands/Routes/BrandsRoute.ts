import express, { Router } from 'express';

import BrandsController from '../Controllers/BrandsController';
import createBrandMiddleware from '../Middleware/CreateBrandMiddleware';
import deleteBrandMiddleware from '../Middleware/DeleteBrandMiddleware';
import updateBrandMiddleware from '../Middleware/UpdateBrandMiddleware';

export default class BrandsRoute {
  private brandsRoute: Router;
  private brandsController: BrandsController;

  constructor() {
    this.brandsRoute = express.Router();
    this.brandsController = new BrandsController();
    this.setup();
  }

  private setup(): void {
    const getBrands = this.brandsController.getBrands.bind(
      this.brandsController,
    );
    const getBrand = this.brandsController.getBrand.bind(this.brandsController);

    const createBrand = this.brandsController.createBrand.bind(
      this.brandsController,
    );
    const deleteBrand = this.brandsController.deleteBrand.bind(
      this.brandsController,
    );
    const updateBrand = this.brandsController.updateBrand.bind(
      this.brandsController,
    );
    this.brandsRoute.get('/', getBrands);
    this.brandsRoute.get('/:id', getBrand);
    this.brandsRoute.post('/', createBrandMiddleware, createBrand);
    this.brandsRoute.delete('/:id', deleteBrandMiddleware, deleteBrand);
    this.brandsRoute.put('/:id', updateBrandMiddleware, updateBrand);
  }

  get brandRoute() {
    return this.brandsRoute;
  }
}
