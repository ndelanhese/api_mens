// import express, { Router } from 'express';

// import ProductsArgoxController from '../Controllers/ProductsArgoxController';
// import ProductsController from '../Controllers/ProductsController';
// import ProductsDatalogicController from '../Controllers/ProductsDatalogicController';
// import ProductsDimepController from '../Controllers/ProductsDimepController';
// import ProductsElginBematechController from '../Controllers/ProductsElginBematechController';
// import ProductsEloController from '../Controllers/ProductsEloController';
// import ProductsEpsonController from '../Controllers/ProductsEpsonController';
// import ProductsExtremeController from '../Controllers/ProductsExtremeController';
// import ProductsGerboController from '../Controllers/ProductsGerboController';
// import ProductsGertecController from '../Controllers/ProductsGertecController';
// import ProductsGtsController from '../Controllers/ProductsGtsController';
// import ProductsHoneywellController from '../Controllers/ProductsHoneywellController';
// import ProductsLogicControlsController from '../Controllers/ProductsLogicControlsController';
// import ProductsMennoController from '../Controllers/ProductsMennoController';
// import ProductsNonusController from '../Controllers/ProductsNonusController';
// import ProductsPostechController from '../Controllers/ProductsPostechController';
// import ProductsTancaController from '../Controllers/ProductsTancaController';
// import ProductsZebraController from '../Controllers/ProductsZebraController';
// import createEmailMiddleware from '../Middleware/Emails/CreateEmailMiddleware';
// import deleteEmailMiddleware from '../Middleware/Emails/DeleteEmailMiddleware';
// import updateEmailMiddleware from '../Middleware/Emails/UpdateEmailMiddleware';
// import createProductMiddleware from '../Middleware/CreateProductMiddleware';
// import deleteProductMiddleware from '../Middleware/Products/DeleteProductMiddleware ';
// import importProductsMiddleware from '../Middleware/Products/ImportProductMiddleware';
// import updateProductMiddleware from '../Middleware/Products/UpdateProductMiddleware';

// export default class ProductsRoute {
//   private productsRoute: Router;

//   private productsController: ProductsController;
//   private productsArgoxController: ProductsArgoxController;
//   private productsDatalogicController: ProductsDatalogicController;
//   private productsDimepController: ProductsDimepController;
//   private productsElginBematechController: ProductsElginBematechController;
//   private productsEloController: ProductsEloController;
//   private productsEpsonController: ProductsEpsonController;
//   private productsExtremeController: ProductsExtremeController;
//   private productsGerboController: ProductsGerboController;
//   private productsGertecController: ProductsGertecController;
//   private productsGtsController: ProductsGtsController;
//   private productsHoneywellController: ProductsHoneywellController;
//   private productsLogicControlsController: ProductsLogicControlsController;
//   private productsMennoController: ProductsMennoController;
//   private productsNonusController: ProductsNonusController;
//   private productsPostechController: ProductsPostechController;
//   private productsTancaController: ProductsTancaController;
//   private productsZebraController: ProductsZebraController;

//   constructor() {
//     this.productsRoute = express.Router();
//     this.productsController = new ProductsController();
//     this.productsArgoxController = new ProductsArgoxController();
//     this.productsDatalogicController = new ProductsDatalogicController();
//     this.productsDimepController = new ProductsDimepController();
//     this.productsElginBematechController =
//       new ProductsElginBematechController();
//     this.productsEloController = new ProductsEloController();
//     this.productsEpsonController = new ProductsEpsonController();
//     this.productsExtremeController = new ProductsExtremeController();
//     this.productsGerboController = new ProductsGerboController();
//     this.productsGertecController = new ProductsGertecController();
//     this.productsGtsController = new ProductsGtsController();
//     this.productsHoneywellController = new ProductsHoneywellController();
//     this.productsLogicControlsController =
//       new ProductsLogicControlsController();
//     this.productsMennoController = new ProductsMennoController();
//     this.productsNonusController = new ProductsNonusController();
//     this.productsPostechController = new ProductsPostechController();
//     this.productsTancaController = new ProductsTancaController();
//     this.productsZebraController = new ProductsZebraController();
//     this.setup();
//   }

//   private setup(): void {
//     const getArgoxProducts = this.productsArgoxController.getProducts.bind(
//       this.productsController,
//     );
//     const getDatalogicProducts =
//       this.productsDatalogicController.getProducts.bind(
//         this.productsController,
//       );
//     const getDimepProducts = this.productsDimepController.getProducts.bind(
//       this.productsController,
//     );
//     const getElginBematechProducts =
//       this.productsElginBematechController.getProducts.bind(
//         this.productsController,
//       );
//     const getEloProducts = this.productsEloController.getProducts.bind(
//       this.productsController,
//     );
//     const getEpsonProducts = this.productsEpsonController.getProducts.bind(
//       this.productsController,
//     );
//     const getExtremeProducts = this.productsExtremeController.getProducts.bind(
//       this.productsController,
//     );
//     const getGerboProducts = this.productsGerboController.getProducts.bind(
//       this.productsController,
//     );
//     const getGertecProducts = this.productsGertecController.getProducts.bind(
//       this.productsController,
//     );
//     const getGtsProducts = this.productsGtsController.getProducts.bind(
//       this.productsController,
//     );
//     const getHoneywellProducts =
//       this.productsHoneywellController.getProducts.bind(
//         this.productsController,
//       );
//     const getLogicControlsProducts =
//       this.productsLogicControlsController.getProducts.bind(
//         this.productsController,
//       );
//     const getMennoProducts = this.productsMennoController.getProducts.bind(
//       this.productsController,
//     );
//     const getNonusProducts = this.productsNonusController.getProducts.bind(
//       this.productsController,
//     );
//     const getPostechProducts = this.productsPostechController.getProducts.bind(
//       this.productsController,
//     );
//     const getTancaProducts = this.productsTancaController.getProducts.bind(
//       this.productsController,
//     );
//     const getZebraProducts = this.productsZebraController.getProducts.bind(
//       this.productsController,
//     );

//     const createArgoxProduct = this.productsArgoxController.createProduct.bind(
//       this.productsController,
//     );
//     const createDatalogicProduct =
//       this.productsDatalogicController.createProduct.bind(
//         this.productsController,
//       );
//     const createDimepProduct = this.productsDimepController.createProduct.bind(
//       this.productsController,
//     );
//     const createElginBematechProduct =
//       this.productsElginBematechController.createProduct.bind(
//         this.productsController,
//       );
//     const createEloProduct = this.productsEloController.createProduct.bind(
//       this.productsController,
//     );
//     const createEpsonProduct = this.productsEpsonController.createProduct.bind(
//       this.productsController,
//     );
//     const createExtremeProduct =
//       this.productsExtremeController.createProduct.bind(
//         this.productsController,
//       );
//     const createGerboProduct = this.productsGerboController.createProduct.bind(
//       this.productsController,
//     );
//     const createGertecProduct =
//       this.productsGertecController.createProduct.bind(this.productsController);
//     const createGtsProduct = this.productsGtsController.createProduct.bind(
//       this.productsController,
//     );
//     const createHoneywellProduct =
//       this.productsHoneywellController.createProduct.bind(
//         this.productsController,
//       );
//     const createLogicControlsProduct =
//       this.productsLogicControlsController.createProduct.bind(
//         this.productsController,
//       );
//     const createMennoProduct = this.productsMennoController.createProduct.bind(
//       this.productsController,
//     );
//     const createNonusProduct = this.productsNonusController.createProduct.bind(
//       this.productsController,
//     );
//     const createPostechProduct =
//       this.productsPostechController.createProduct.bind(
//         this.productsController,
//       );
//     const createTancaProduct = this.productsTancaController.createProduct.bind(
//       this.productsController,
//     );
//     const createZebraProduct = this.productsZebraController.createProduct.bind(
//       this.productsController,
//     );

//     const deleteArgoxProduct = this.productsArgoxController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteDatalogicProduct =
//       this.productsDatalogicController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteDimepProduct = this.productsDimepController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteElginBematechProduct =
//       this.productsElginBematechController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteEloProduct = this.productsEloController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteEpsonProduct = this.productsEpsonController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteExtremeProduct =
//       this.productsExtremeController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteGerboProduct = this.productsGerboController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteGertecProduct =
//       this.productsGertecController.deleteProduct.bind(this.productsController);
//     const deleteGtsProduct = this.productsGtsController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteHoneywellProduct =
//       this.productsHoneywellController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteLogicControlsProduct =
//       this.productsLogicControlsController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteMennoProduct = this.productsMennoController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteNonusProduct = this.productsNonusController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deletePostechProduct =
//       this.productsPostechController.deleteProduct.bind(
//         this.productsController,
//       );
//     const deleteTancaProduct = this.productsTancaController.deleteProduct.bind(
//       this.productsController,
//     );
//     const deleteZebraProduct = this.productsZebraController.deleteProduct.bind(
//       this.productsController,
//     );

//     const updateArgoxProduct = this.productsArgoxController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateDatalogicProduct =
//       this.productsDatalogicController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateDimepProduct = this.productsDimepController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateElginBematechProduct =
//       this.productsElginBematechController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateEloProduct = this.productsEloController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateEpsonProduct = this.productsEpsonController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateExtremeProduct =
//       this.productsExtremeController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateGerboProduct = this.productsGerboController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateGertecProduct =
//       this.productsGertecController.updateProduct.bind(this.productsController);
//     const updateGtsProduct = this.productsGtsController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateHoneywellProduct =
//       this.productsHoneywellController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateLogicControlsProduct =
//       this.productsLogicControlsController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateMennoProduct = this.productsMennoController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateNonusProduct = this.productsNonusController.updateProduct.bind(
//       this.productsController,
//     );
//     const updatePostechProduct =
//       this.productsPostechController.updateProduct.bind(
//         this.productsController,
//       );
//     const updateTancaProduct = this.productsTancaController.updateProduct.bind(
//       this.productsController,
//     );
//     const updateZebraProduct = this.productsZebraController.updateProduct.bind(
//       this.productsController,
//     );

//     const importArgoxProducts =
//       this.productsArgoxController.importProducts.bind(this.productsController);
//     const importDatalogicProducts =
//       this.productsDatalogicController.importProducts.bind(
//         this.productsController,
//       );
//     const importDimepProducts =
//       this.productsDimepController.importProducts.bind(this.productsController);
//     const importElginBematechProducts =
//       this.productsElginBematechController.importProducts.bind(
//         this.productsController,
//       );
//     const importEloProducts = this.productsEloController.importProducts.bind(
//       this.productsController,
//     );
//     const importEpsonProducts =
//       this.productsEpsonController.importProducts.bind(this.productsController);
//     const importExtremeProducts =
//       this.productsExtremeController.importProducts.bind(
//         this.productsController,
//       );
//     const importGerboProducts =
//       this.productsGerboController.importProducts.bind(this.productsController);
//     const importGertecProducts =
//       this.productsGertecController.importProducts.bind(
//         this.productsController,
//       );
//     const importGtsProducts = this.productsGtsController.importProducts.bind(
//       this.productsController,
//     );
//     const importHoneywellProducts =
//       this.productsHoneywellController.importProducts.bind(
//         this.productsController,
//       );
//     const importLogicControlsProducts =
//       this.productsLogicControlsController.importProducts.bind(
//         this.productsController,
//       );
//     const importMennoProducts =
//       this.productsMennoController.importProducts.bind(this.productsController);
//     const importNonusProducts =
//       this.productsNonusController.importProducts.bind(this.productsController);
//     const importPostechProducts =
//       this.productsPostechController.importProducts.bind(
//         this.productsController,
//       );
//     const importTancaProducts =
//       this.productsTancaController.importProducts.bind(this.productsController);
//     const importZebraProducts =
//       this.productsZebraController.importProducts.bind(this.productsController);

//     const exportArgoxProducts =
//       this.productsArgoxController.exportProducts.bind(this.productsController);
//     const exportDatalogicProducts =
//       this.productsDatalogicController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportDimepProducts =
//       this.productsDimepController.exportProducts.bind(this.productsController);
//     const exportElginBematechProducts =
//       this.productsElginBematechController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportEloProducts = this.productsEloController.exportProducts.bind(
//       this.productsController,
//     );
//     const exportEpsonProducts =
//       this.productsEpsonController.exportProducts.bind(this.productsController);
//     const exportExtremeProducts =
//       this.productsExtremeController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportGerboProducts =
//       this.productsGerboController.exportProducts.bind(this.productsController);
//     const exportGertecProducts =
//       this.productsGertecController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportGtsProducts = this.productsGtsController.exportProducts.bind(
//       this.productsController,
//     );
//     const exportHoneywellProducts =
//       this.productsHoneywellController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportLogicControlsProducts =
//       this.productsLogicControlsController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportMennoProducts =
//       this.productsMennoController.exportProducts.bind(this.productsController);
//     const exportNonusProducts =
//       this.productsNonusController.exportProducts.bind(this.productsController);
//     const exportPostechProducts =
//       this.productsPostechController.exportProducts.bind(
//         this.productsController,
//       );
//     const exportTancaProducts =
//       this.productsTancaController.exportProducts.bind(this.productsController);
//     const exportZebraProducts =
//       this.productsZebraController.exportProducts.bind(this.productsController);

//     const getProductsTypes = this.productsController.getProductsTypes.bind(
//       this.productsController,
//     );

//     this.productRoute.get('/argox', getArgoxProducts);
//     this.productRoute.get('/datalogic', getDatalogicProducts);
//     this.productRoute.get('/dimep', getDimepProducts);
//     this.productRoute.get('/elgin_bematech', getElginBematechProducts);
//     this.productRoute.get('/elo', getEloProducts);
//     this.productRoute.get('/epson', getEpsonProducts);
//     this.productRoute.get('/extreme', getExtremeProducts);
//     this.productRoute.get('/gerbo', getGerboProducts);
//     this.productRoute.get('/gertec', getGertecProducts);
//     this.productRoute.get('/gts', getGtsProducts);
//     this.productRoute.get('/honeywell', getHoneywellProducts);
//     this.productRoute.get('/logic_controls', getLogicControlsProducts);
//     this.productRoute.get('/menno', getMennoProducts);
//     this.productRoute.get('/nonus', getNonusProducts);
//     this.productRoute.get('/postech', getPostechProducts);
//     this.productRoute.get('/tanca', getTancaProducts);
//     this.productRoute.get('/zebra', getZebraProducts);

//     this.productsRoute.get('/types', getProductsTypes);
//     this.productRoute.post(
//       '/argox',
//       createProductMiddleware,
//       createArgoxProduct,
//     );
//     this.productRoute.post(
//       '/datalogic',
//       createProductMiddleware,
//       createDatalogicProduct,
//     );
//     this.productRoute.post(
//       '/dimep',
//       createProductMiddleware,
//       createDimepProduct,
//     );
//     this.productRoute.post(
//       '/elgin_bematech',
//       createProductMiddleware,
//       createElginBematechProduct,
//     );
//     this.productRoute.post('/elo', createProductMiddleware, createEloProduct);
//     this.productRoute.post(
//       '/epson',
//       createProductMiddleware,
//       createEpsonProduct,
//     );
//     this.productRoute.post(
//       '/extreme',
//       createProductMiddleware,
//       createExtremeProduct,
//     );
//     this.productRoute.post(
//       '/gerbo',
//       createProductMiddleware,
//       createGerboProduct,
//     );
//     this.productRoute.post(
//       '/gertec',
//       createProductMiddleware,
//       createGertecProduct,
//     );
//     this.productRoute.post('/gts', createProductMiddleware, createGtsProduct);
//     this.productRoute.post(
//       '/honeywell',
//       createProductMiddleware,
//       createHoneywellProduct,
//     );
//     this.productRoute.post(
//       '/logic_controls',
//       createProductMiddleware,
//       createLogicControlsProduct,
//     );
//     this.productRoute.post(
//       '/menno',
//       createProductMiddleware,
//       createMennoProduct,
//     );
//     this.productRoute.post(
//       '/nonus',
//       createProductMiddleware,
//       createNonusProduct,
//     );
//     this.productRoute.post(
//       '/postech',
//       createProductMiddleware,
//       createPostechProduct,
//     );
//     this.productRoute.post(
//       '/tanca',
//       createProductMiddleware,
//       createTancaProduct,
//     );
//     this.productRoute.post(
//       '/zebra',
//       createProductMiddleware,
//       createZebraProduct,
//     );
//     this.productRoute.put(
//       '/argox/:product_id',
//       updateProductMiddleware,
//       updateArgoxProduct,
//     );
//     this.productRoute.put(
//       '/datalogic/:product_id',
//       updateProductMiddleware,
//       updateDatalogicProduct,
//     );
//     this.productRoute.put(
//       '/dimep/:product_id',
//       updateProductMiddleware,
//       updateDimepProduct,
//     );
//     this.productRoute.put(
//       '/elgin_bematech/:product_id',
//       updateProductMiddleware,
//       updateElginBematechProduct,
//     );
//     this.productRoute.put(
//       '/elo/:product_id',
//       updateProductMiddleware,
//       updateEloProduct,
//     );
//     this.productRoute.put(
//       '/epson/:product_id',
//       updateProductMiddleware,
//       updateEpsonProduct,
//     );
//     this.productRoute.put(
//       '/extreme/:product_id',
//       updateProductMiddleware,
//       updateExtremeProduct,
//     );
//     this.productRoute.put(
//       '/gerbo/:product_id',
//       updateProductMiddleware,
//       updateGerboProduct,
//     );
//     this.productRoute.put(
//       '/gertec/:product_id',
//       updateProductMiddleware,
//       updateGertecProduct,
//     );
//     this.productRoute.put(
//       '/gts/:product_id',
//       updateProductMiddleware,
//       updateGtsProduct,
//     );
//     this.productRoute.put(
//       '/honeywell/:product_id',
//       updateProductMiddleware,
//       updateHoneywellProduct,
//     );
//     this.productRoute.put(
//       '/logic_controls/:product_id',
//       updateProductMiddleware,
//       updateLogicControlsProduct,
//     );
//     this.productRoute.put(
//       '/menno/:product_id',
//       updateProductMiddleware,
//       updateMennoProduct,
//     );
//     this.productRoute.put(
//       '/nonus/:product_id',
//       updateProductMiddleware,
//       updateNonusProduct,
//     );
//     this.productRoute.put(
//       '/postech/:product_id',
//       updateProductMiddleware,
//       updatePostechProduct,
//     );
//     this.productRoute.put(
//       '/tanca/:product_id',
//       updateProductMiddleware,
//       updateTancaProduct,
//     );
//     this.productRoute.put(
//       '/zebra/:product_id',
//       updateProductMiddleware,
//       updateZebraProduct,
//     );

//     this.productRoute.post('/argox/export', exportArgoxProducts);
//     this.productRoute.post('/datalogic/export', exportDatalogicProducts);
//     this.productRoute.post('/dimep/export', exportDimepProducts);
//     this.productRoute.post(
//       '/elgin_bematech/export',
//       exportElginBematechProducts,
//     );
//     this.productRoute.post('/elo/export', exportEloProducts);
//     this.productRoute.post('/epson/export', exportEpsonProducts);
//     this.productRoute.post('/extreme/export', exportExtremeProducts);
//     this.productRoute.post('/gerbo/export', exportGerboProducts);
//     this.productRoute.post('/gertec/export', exportGertecProducts);
//     this.productRoute.post('/gts/export', exportGtsProducts);
//     this.productRoute.post('/honeywell/export', exportHoneywellProducts);
//     this.productRoute.post(
//       '/logic_controls/export',
//       exportLogicControlsProducts,
//     );
//     this.productRoute.post('/menno/export', exportMennoProducts);
//     this.productRoute.post('/nonus/export', exportNonusProducts);
//     this.productRoute.post('/postech/export', exportPostechProducts);
//     this.productRoute.post('/tanca/export', exportTancaProducts);
//     this.productRoute.post('/zebra/export', exportZebraProducts);

//     this.productRoute.post(
//       '/argox/import',
//       importProductsMiddleware,
//       importArgoxProducts,
//     );
//     this.productRoute.post(
//       '/datalogic/import',
//       importProductsMiddleware,
//       importDatalogicProducts,
//     );
//     this.productRoute.post(
//       '/dimep/import',
//       importProductsMiddleware,
//       importDimepProducts,
//     );
//     this.productRoute.post(
//       '/elgin_bematech/import',
//       importProductsMiddleware,
//       importElginBematechProducts,
//     );
//     this.productRoute.post(
//       '/elo/import',
//       importProductsMiddleware,
//       importEloProducts,
//     );
//     this.productRoute.post(
//       '/epson/import',
//       importProductsMiddleware,
//       importEpsonProducts,
//     );
//     this.productRoute.post(
//       '/extreme/import',
//       importProductsMiddleware,
//       importExtremeProducts,
//     );
//     this.productRoute.post(
//       '/gerbo/import',
//       importProductsMiddleware,
//       importGerboProducts,
//     );
//     this.productRoute.post(
//       '/gertec/import',
//       importProductsMiddleware,
//       importGertecProducts,
//     );
//     this.productRoute.post(
//       '/gts/import',
//       importProductsMiddleware,
//       importGtsProducts,
//     );
//     this.productRoute.post(
//       '/honeywell/import',
//       importProductsMiddleware,
//       importHoneywellProducts,
//     );
//     this.productRoute.post(
//       '/logic_controls/import',
//       importProductsMiddleware,
//       importLogicControlsProducts,
//     );
//     this.productRoute.post(
//       '/menno/import',
//       importProductsMiddleware,
//       importMennoProducts,
//     );
//     this.productRoute.post(
//       '/nonus/import',
//       importProductsMiddleware,
//       importNonusProducts,
//     );
//     this.productRoute.post(
//       '/postech/import',
//       importProductsMiddleware,
//       importPostechProducts,
//     );
//     this.productRoute.post(
//       '/tanca/import',
//       importProductsMiddleware,
//       importTancaProducts,
//     );
//     this.productRoute.post(
//       '/zebra/import',
//       importProductsMiddleware,
//       importZebraProducts,
//     );

//     this.productRoute.delete(
//       '/argox/:product_id',
//       deleteProductMiddleware,
//       deleteArgoxProduct,
//     );
//     this.productRoute.delete(
//       '/datalogic/:product_id',
//       deleteProductMiddleware,
//       deleteDatalogicProduct,
//     );
//     this.productRoute.delete(
//       '/dimep/:product_id',
//       deleteProductMiddleware,
//       deleteDimepProduct,
//     );
//     this.productRoute.delete(
//       '/elgin_bematech/:product_id',
//       deleteProductMiddleware,
//       deleteElginBematechProduct,
//     );
//     this.productRoute.delete(
//       '/elo/:product_id',
//       deleteProductMiddleware,
//       deleteEloProduct,
//     );
//     this.productRoute.delete(
//       '/epson/:product_id',
//       deleteProductMiddleware,
//       deleteEpsonProduct,
//     );
//     this.productRoute.delete(
//       '/extreme/:product_id',
//       deleteProductMiddleware,
//       deleteExtremeProduct,
//     );
//     this.productRoute.delete(
//       '/gerbo/:product_id',
//       deleteProductMiddleware,
//       deleteGerboProduct,
//     );
//     this.productRoute.delete(
//       '/gertec/:product_id',
//       deleteProductMiddleware,
//       deleteGertecProduct,
//     );
//     this.productRoute.delete(
//       '/gts/:product_id',
//       deleteProductMiddleware,
//       deleteGtsProduct,
//     );
//     this.productRoute.delete(
//       '/honeywell/:product_id',
//       deleteProductMiddleware,
//       deleteHoneywellProduct,
//     );
//     this.productRoute.delete(
//       '/logic_controls/:product_id',
//       deleteProductMiddleware,
//       deleteLogicControlsProduct,
//     );
//     this.productRoute.delete(
//       '/menno/:product_id',
//       deleteProductMiddleware,
//       deleteMennoProduct,
//     );
//     this.productRoute.delete(
//       '/nonus/:product_id',
//       deleteProductMiddleware,
//       deleteNonusProduct,
//     );
//     this.productRoute.delete(
//       '/postech/:product_id',
//       deleteProductMiddleware,
//       deletePostechProduct,
//     );
//     this.productRoute.delete(
//       '/tanca/:product_id',
//       deleteProductMiddleware,
//       deleteTancaProduct,
//     );
//     this.productRoute.delete(
//       '/zebra/:product_id',
//       deleteProductMiddleware,
//       deleteZebraProduct,
//     );

//     //E-mails
//     const getArgoxEmails = this.productsArgoxController.getEmails.bind(
//       this.productsController,
//     );
//     const getDatalogicEmails = this.productsDatalogicController.getEmails.bind(
//       this.productsController,
//     );
//     const getDimepEmails = this.productsDimepController.getEmails.bind(
//       this.productsController,
//     );
//     const getElginBematechEmails =
//       this.productsElginBematechController.getEmails.bind(
//         this.productsController,
//       );
//     const getEloEmails = this.productsEloController.getEmails.bind(
//       this.productsController,
//     );
//     const getEpsonEmails = this.productsEpsonController.getEmails.bind(
//       this.productsController,
//     );
//     const getExtremeEmails = this.productsExtremeController.getEmails.bind(
//       this.productsController,
//     );
//     const getGerboEmails = this.productsGerboController.getEmails.bind(
//       this.productsController,
//     );
//     const getGertecEmails = this.productsGertecController.getEmails.bind(
//       this.productsController,
//     );
//     const getGtsEmails = this.productsGtsController.getEmails.bind(
//       this.productsController,
//     );
//     const getHoneywellEmails = this.productsHoneywellController.getEmails.bind(
//       this.productsController,
//     );
//     const getLogicControlsEmails =
//       this.productsLogicControlsController.getEmails.bind(
//         this.productsController,
//       );
//     const getMennoEmails = this.productsMennoController.getEmails.bind(
//       this.productsController,
//     );
//     const getNonusEmails = this.productsNonusController.getEmails.bind(
//       this.productsController,
//     );
//     const getPostechEmails = this.productsPostechController.getEmails.bind(
//       this.productsController,
//     );
//     const getTancaEmails = this.productsTancaController.getEmails.bind(
//       this.productsController,
//     );
//     const getZebraEmails = this.productsZebraController.getEmails.bind(
//       this.productsController,
//     );

//     const createArgoxEmail = this.productsArgoxController.createEmail.bind(
//       this.productsController,
//     );
//     const createDatalogicEmail =
//       this.productsDatalogicController.createEmail.bind(
//         this.productsController,
//       );
//     const createDimepEmail = this.productsDimepController.createEmail.bind(
//       this.productsController,
//     );
//     const createElginBematechEmail =
//       this.productsElginBematechController.createEmail.bind(
//         this.productsController,
//       );
//     const createEloEmail = this.productsEloController.createEmail.bind(
//       this.productsController,
//     );
//     const createEpsonEmail = this.productsEpsonController.createEmail.bind(
//       this.productsController,
//     );
//     const createExtremeEmail = this.productsExtremeController.createEmail.bind(
//       this.productsController,
//     );
//     const createGerboEmail = this.productsGerboController.createEmail.bind(
//       this.productsController,
//     );
//     const createGertecEmail = this.productsGertecController.createEmail.bind(
//       this.productsController,
//     );
//     const createGtsEmail = this.productsGtsController.createEmail.bind(
//       this.productsController,
//     );
//     const createHoneywellEmail =
//       this.productsHoneywellController.createEmail.bind(
//         this.productsController,
//       );
//     const createLogicControlsEmail =
//       this.productsLogicControlsController.createEmail.bind(
//         this.productsController,
//       );
//     const createMennoEmail = this.productsMennoController.createEmail.bind(
//       this.productsController,
//     );
//     const createNonusEmail = this.productsNonusController.createEmail.bind(
//       this.productsController,
//     );
//     const createPostechEmail = this.productsPostechController.createEmail.bind(
//       this.productsController,
//     );
//     const createTancaEmail = this.productsTancaController.createEmail.bind(
//       this.productsController,
//     );
//     const createZebraEmail = this.productsZebraController.createEmail.bind(
//       this.productsController,
//     );

//     const deleteArgoxEmail = this.productsArgoxController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteDatalogicEmail =
//       this.productsDatalogicController.deleteEmail.bind(
//         this.productsController,
//       );
//     const deleteDimepEmail = this.productsDimepController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteElginBematechEmail =
//       this.productsElginBematechController.deleteEmail.bind(
//         this.productsController,
//       );
//     const deleteEloEmail = this.productsEloController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteEpsonEmail = this.productsEpsonController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteExtremeEmail = this.productsExtremeController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteGerboEmail = this.productsGerboController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteGertecEmail = this.productsGertecController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteGtsEmail = this.productsGtsController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteHoneywellEmail =
//       this.productsHoneywellController.deleteEmail.bind(
//         this.productsController,
//       );
//     const deleteLogicControlsEmail =
//       this.productsLogicControlsController.deleteEmail.bind(
//         this.productsController,
//       );
//     const deleteMennoEmail = this.productsMennoController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteNonusEmail = this.productsNonusController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deletePostechEmail = this.productsPostechController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteTancaEmail = this.productsTancaController.deleteEmail.bind(
//       this.productsController,
//     );
//     const deleteZebraEmail = this.productsZebraController.deleteEmail.bind(
//       this.productsController,
//     );

//     const updateArgoxEmail = this.productsArgoxController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateDatalogicEmail =
//       this.productsDatalogicController.updateEmail.bind(
//         this.productsController,
//       );
//     const updateDimepEmail = this.productsDimepController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateElginBematechEmail =
//       this.productsElginBematechController.updateEmail.bind(
//         this.productsController,
//       );
//     const updateEloEmail = this.productsEloController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateEpsonEmail = this.productsEpsonController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateExtremeEmail = this.productsExtremeController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateGerboEmail = this.productsGerboController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateGertecEmail = this.productsGertecController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateGtsEmail = this.productsGtsController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateHoneywellEmail =
//       this.productsHoneywellController.updateEmail.bind(
//         this.productsController,
//       );
//     const updateLogicControlsEmail =
//       this.productsLogicControlsController.updateEmail.bind(
//         this.productsController,
//       );
//     const updateMennoEmail = this.productsMennoController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateNonusEmail = this.productsNonusController.updateEmail.bind(
//       this.productsController,
//     );
//     const updatePostechEmail = this.productsPostechController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateTancaEmail = this.productsTancaController.updateEmail.bind(
//       this.productsController,
//     );
//     const updateZebraEmail = this.productsZebraController.updateEmail.bind(
//       this.productsController,
//     );

//     this.productRoute.get('/argox/manufacturer-emails', getArgoxEmails);
//     this.productRoute.get('/datalogic/manufacturer-emails', getDatalogicEmails);
//     this.productRoute.get('/dimep/manufacturer-emails', getDimepEmails);
//     this.productRoute.get(
//       '/elgin_bematech/manufacturer-emails',
//       getElginBematechEmails,
//     );
//     this.productRoute.get('/elo/manufacturer-emails', getEloEmails);
//     this.productRoute.get('/epson/manufacturer-emails', getEpsonEmails);
//     this.productRoute.get('/extreme/manufacturer-emails', getExtremeEmails);
//     this.productRoute.get('/gerbo/manufacturer-emails', getGerboEmails);
//     this.productRoute.get('/gertec/manufacturer-emails', getGertecEmails);
//     this.productRoute.get('/gts/manufacturer-emails', getGtsEmails);
//     this.productRoute.get('/honeywell/manufacturer-emails', getHoneywellEmails);
//     this.productRoute.get(
//       '/logic_controls/manufacturer-emails',
//       getLogicControlsEmails,
//     );
//     this.productRoute.get('/menno/manufacturer-emails', getMennoEmails);
//     this.productRoute.get('/nonus/manufacturer-emails', getNonusEmails);
//     this.productRoute.get('/postech/manufacturer-emails', getPostechEmails);
//     this.productRoute.get('/tanca/manufacturer-emails', getTancaEmails);
//     this.productRoute.get('/zebra/manufacturer-emails', getZebraEmails);

//     this.productRoute.post(
//       '/argox/manufacturer-emails',
//       createEmailMiddleware,
//       createArgoxEmail,
//     );
//     this.productRoute.post(
//       '/datalogic/manufacturer-emails',
//       createEmailMiddleware,
//       createDatalogicEmail,
//     );
//     this.productRoute.post(
//       '/dimep/manufacturer-emails',
//       createEmailMiddleware,
//       createDimepEmail,
//     );
//     this.productRoute.post(
//       '/elgin_bematech/manufacturer-emails',
//       createEmailMiddleware,
//       createElginBematechEmail,
//     );
//     this.productRoute.post(
//       '/elo/manufacturer-emails',
//       createEmailMiddleware,
//       createEloEmail,
//     );
//     this.productRoute.post(
//       '/epson/manufacturer-emails',
//       createEmailMiddleware,
//       createEpsonEmail,
//     );
//     this.productRoute.post(
//       '/extreme/manufacturer-emails',
//       createEmailMiddleware,
//       createExtremeEmail,
//     );
//     this.productRoute.post(
//       '/gerbo/manufacturer-emails',
//       createEmailMiddleware,
//       createGerboEmail,
//     );
//     this.productRoute.post(
//       '/gertec/manufacturer-emails',
//       createEmailMiddleware,
//       createGertecEmail,
//     );
//     this.productRoute.post(
//       '/gts/manufacturer-emails',
//       createEmailMiddleware,
//       createGtsEmail,
//     );
//     this.productRoute.post(
//       '/honeywell/manufacturer-emails',
//       createEmailMiddleware,
//       createHoneywellEmail,
//     );
//     this.productRoute.post(
//       '/logic_controls/manufacturer-emails',
//       createEmailMiddleware,
//       createLogicControlsEmail,
//     );
//     this.productRoute.post(
//       '/menno/manufacturer-emails',
//       createEmailMiddleware,
//       createMennoEmail,
//     );
//     this.productRoute.post(
//       '/nonus/manufacturer-emails',
//       createEmailMiddleware,
//       createNonusEmail,
//     );
//     this.productRoute.post(
//       '/postech/manufacturer-emails',
//       createEmailMiddleware,
//       createPostechEmail,
//     );
//     this.productRoute.post(
//       '/tanca/manufacturer-emails',
//       createEmailMiddleware,
//       createTancaEmail,
//     );
//     this.productRoute.post(
//       '/zebra/manufacturer-emails',
//       createEmailMiddleware,
//       createZebraEmail,
//     );
//     this.productRoute.put(
//       '/argox/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateArgoxEmail,
//     );
//     this.productRoute.put(
//       '/datalogic/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateDatalogicEmail,
//     );
//     this.productRoute.put(
//       '/dimep/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateDimepEmail,
//     );
//     this.productRoute.put(
//       '/elgin_bematech/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateElginBematechEmail,
//     );
//     this.productRoute.put(
//       '/elo/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateEloEmail,
//     );
//     this.productRoute.put(
//       '/epson/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateEpsonEmail,
//     );
//     this.productRoute.put(
//       '/extreme/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateExtremeEmail,
//     );
//     this.productRoute.put(
//       '/gerbo/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateGerboEmail,
//     );
//     this.productRoute.put(
//       '/gertec/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateGertecEmail,
//     );
//     this.productRoute.put(
//       '/gts/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateGtsEmail,
//     );
//     this.productRoute.put(
//       '/honeywell/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateHoneywellEmail,
//     );
//     this.productRoute.put(
//       '/logic_controls/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateLogicControlsEmail,
//     );
//     this.productRoute.put(
//       '/menno/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateMennoEmail,
//     );
//     this.productRoute.put(
//       '/nonus/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateNonusEmail,
//     );
//     this.productRoute.put(
//       '/postech/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updatePostechEmail,
//     );
//     this.productRoute.put(
//       '/tanca/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateTancaEmail,
//     );
//     this.productRoute.put(
//       '/zebra/manufacturer-emails/:id',
//       updateEmailMiddleware,
//       updateZebraEmail,
//     );

//     this.productRoute.delete(
//       '/argox/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteArgoxEmail,
//     );
//     this.productRoute.delete(
//       '/datalogic/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteDatalogicEmail,
//     );
//     this.productRoute.delete(
//       '/dimep/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteDimepEmail,
//     );
//     this.productRoute.delete(
//       '/elgin_bematech/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteElginBematechEmail,
//     );
//     this.productRoute.delete(
//       '/elo/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteEloEmail,
//     );
//     this.productRoute.delete(
//       '/epson/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteEpsonEmail,
//     );
//     this.productRoute.delete(
//       '/extreme/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteExtremeEmail,
//     );
//     this.productRoute.delete(
//       '/gerbo/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteGerboEmail,
//     );
//     this.productRoute.delete(
//       '/gertec/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteGertecEmail,
//     );
//     this.productRoute.delete(
//       '/gts/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteGtsEmail,
//     );
//     this.productRoute.delete(
//       '/honeywell/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteHoneywellEmail,
//     );
//     this.productRoute.delete(
//       '/logic_controls/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteLogicControlsEmail,
//     );
//     this.productRoute.delete(
//       '/menno/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteMennoEmail,
//     );
//     this.productRoute.delete(
//       '/nonus/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteNonusEmail,
//     );
//     this.productRoute.delete(
//       '/postech/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deletePostechEmail,
//     );
//     this.productRoute.delete(
//       '/tanca/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteTancaEmail,
//     );
//     this.productRoute.delete(
//       '/zebra/manufacturer-emails/:id',
//       deleteEmailMiddleware,
//       deleteZebraEmail,
//     );
//   }

//   get productRoute() {
//     return this.productsRoute;
//   }
// }
