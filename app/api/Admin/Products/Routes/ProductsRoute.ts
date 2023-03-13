import express, { Router } from 'express';
import ProductsController from '../Controllers/ProductsController';
import deleteProductMiddleware from '../Middleware/DeleteProductMiddleware ';
import updateProductMiddleware from '../Middleware/UpdateProductMiddleware';
import createProductMiddleware from '../Middleware/CreateProductMiddleware';
import importProductsMiddleware from '../Middleware/ImportProductMiddleware';

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
    const createProduct = this.productsController.createProduct.bind(
      this.productsController,
    );
    const deleteProduct = this.productsController.deleteProduct.bind(
      this.productsController,
    );
    const updateProduct = this.productsController.updateProduct.bind(
      this.productsController,
    );
    const importProducts = this.productsController.importProducts.bind(
      this.productsController,
    );
    const exportProducts = this.productsController.exportProducts.bind(
      this.productsController,
    );
    const getProductsTypes = this.productsController.getProductsTypes.bind(
      this.productsController,
    );

    this.productsRoute.get('/:path(*)', getProducts);
    this.productsRoute.get('/types', getProductsTypes);

    this.productRoute.post('/argox',createProductMiddleware ,createProduct);
    this.productRoute.post('/datalogic',createProductMiddleware ,createProduct);
    this.productRoute.post('/dimep',createProductMiddleware ,createProduct);
    this.productRoute.post('/elgin_bematech',createProductMiddleware ,createProduct);
    this.productRoute.post('/elo',createProductMiddleware ,createProduct);
    this.productRoute.post('/epson',createProductMiddleware ,createProduct);
    this.productRoute.post('/gerbo',createProductMiddleware ,createProduct);
    this.productRoute.post('/gertec',createProductMiddleware ,createProduct);
    this.productRoute.post('/gts',createProductMiddleware ,createProduct);
    this.productRoute.post('/honeywell',createProductMiddleware ,createProduct);
    this.productRoute.post('/logic_controls',createProductMiddleware ,createProduct);
    this.productRoute.post('/menno',createProductMiddleware ,createProduct);
    this.productRoute.post('/monus',createProductMiddleware ,createProduct);
    this.productRoute.post('/postech',createProductMiddleware ,createProduct);
    this.productRoute.post('/tanca',createProductMiddleware ,createProduct);
    this.productRoute.post('/zebra', createProductMiddleware, createProduct);

    this.productRoute.put('/argox/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/datalogic/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/dimep/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/elgin_bematech/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/elo/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/epson/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/gerbo/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/gertec/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/gts/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/honeywell/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/logic_controls/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/menno/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/monus/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/postech/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/tanca/:product_id',updateProductMiddleware ,updateProduct);
    this.productRoute.put('/zebra/:product_id', updateProductMiddleware, updateProduct);
    
    this.productRoute.post('/argox/export', exportProducts);
    this.productRoute.post('/datalogic/export', exportProducts);
    this.productRoute.post('/dimep/export', exportProducts);
    this.productRoute.post('/elgin_bematech/export', exportProducts);
    this.productRoute.post('/elo/export', exportProducts);
    this.productRoute.post('/epson/export', exportProducts);
    this.productRoute.post('/gerbo/export', exportProducts);
    this.productRoute.post('/gertec/export', exportProducts);
    this.productRoute.post('/gts/export', exportProducts);
    this.productRoute.post('/honeywell/export', exportProducts);
    this.productRoute.post('/logic_controls/export', exportProducts);
    this.productRoute.post('/menno/export', exportProducts);
    this.productRoute.post('/monus/export', exportProducts);
    this.productRoute.post('/postech/export', exportProducts);
    this.productRoute.post('/tanca/export', exportProducts);
    this.productRoute.post('/zebra/export', exportProducts);

    this.productRoute.post('/argox/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/datalogic/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/dimep/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/elgin_bematech/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/elo/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/epson/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/gerbo/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/gertec/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/gts/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/honeywell/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/logic_controls/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/menno/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/monus/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/postech/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/tanca/import', importProductsMiddleware,importProducts);
    this.productRoute.post('/zebra/import', importProductsMiddleware, importProducts);
    
    this.productRoute.delete('/argox/:product_id', deleteProductMiddleware, deleteProduct);
    this.productRoute.delete('/datalogic/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/dimep/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/elgin_bematech/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/elo/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/epson/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/gerbo/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/gertec/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/gts/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/honeywell/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/logic_controls/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/menno/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/monus/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/postech/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/tanca/:product_id', deleteProductMiddleware,deleteProduct);
    this.productRoute.delete('/zebra/:product_id', deleteProductMiddleware,deleteProduct);
  }

  get productRoute() {
    return this.productsRoute;
  }
}
