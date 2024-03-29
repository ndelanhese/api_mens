import express, { Router } from 'express';

import ProductsController from '../Controllers/ProductsController';
import createProductMiddleware from '../Middleware/CreateProductMiddleware';
import deleteProductMiddleware from '../Middleware/DeleteProductMiddleware';
import updateProductMiddleware from '../Middleware/UpdateProductMiddleware';
import updateProductStockMiddleware from '../Middleware/UpdateProductStockMiddleware';

export default class ProductsRoute {
  private productsRoute: Router;

  private productsController: ProductsController;

  constructor() {
    this.productsRoute = express.Router();
    this.productsController = new ProductsController();
    this.setup();
  }

  private setup(): void {
    const getProducts = this.productsController.getProducts.bind(
      this.productsController,
    );
    const getProduct = this.productsController.getProduct.bind(
      this.productsController,
    );
    const createProduct = this.productsController.createProduct.bind(
      this.productsController,
    );
    const deleteProduct = this.productsController.deleteProduct.bind(
      this.productsController,
    );
    const updateProduct = this.productsController.updateProduct.bind(
      this.productsController,
    );
    const updateProductStock = this.productsController.updateProductStock.bind(
      this.productsController,
    );
    const exportProducts = this.productsController.exportProducts.bind(
      this.productsController,
    );
    const getProductsStock = this.productsController.getProductsStock.bind(
      this.productsController,
    );
    const getProductsStatus = this.productsController.getStatus.bind(
      this.productsController,
    );

    this.productRoute.get('/status', getProductsStatus);
    this.productRoute.get('/', getProducts);
    this.productRoute.get('/stock', getProductsStock);
    this.productRoute.get('/:id', getProduct);
    this.productRoute.post('/', createProductMiddleware, createProduct);
    this.productRoute.put(
      '/:id/stock',
      updateProductStockMiddleware,
      updateProductStock,
    );
    this.productRoute.put('/:id', updateProductMiddleware, updateProduct);
    this.productRoute.post('/export', exportProducts);
    this.productRoute.delete('/:id', deleteProductMiddleware, deleteProduct);
  }

  get productRoute() {
    return this.productsRoute;
  }
}
