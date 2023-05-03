// import CreateProductAction from '@app/src/Products/Application/Actions/CreateProductAction';
// import DeleteProductAction from '@app/src/Products/Application/Actions/DeleteProductAction';
// import ExportProductsAction from '@app/src/Products/Application/Actions/ExportProductsAction';
// import ImportProductsAction from '@app/src/Products/Application/Actions/ImportProductsAction';
// import UpdateProductAction from '@app/src/Products/Application/Actions/UpdateProductAction';
// import CreateEmailAction from '@app/src/ProductsEmails/Application/Actions/CreateEmailAction';
// import DeleteEmailAction from '@app/src/ProductsEmails/Application/Actions/DeleteEmailAction';
// import UpdateEmailAction from '@app/src/ProductsEmails/Application/Actions/UpdateEmailAction';
// import HttpError from '@exceptions/HttpError';
// import { getUpperString } from '@shared/String';
// import { Request, Response } from 'express';

// import CreateEmailFactory from '../Factories/Emails/CreateEmailFactory';
// import DeleteEmailFactory from '../Factories/Emails/DeleteEmailFactory';
// import UpdateEmailFactory from '../Factories/Emails/UpdateEmailFactory';
// import CreateProductFactory from '../Factories/CreateProductFactory';
// import DeleteProductFactory from '../Factories/Products/DeleteProductFactory';
// import ExportProductsFactory from '../Factories/Products/ExportProductsFactory';
// import ImportProductsFactory from '../Factories/Products/ImportProductsFactory';
// import UpdateProductFactory from '../Factories/Products/UpdateProductFactory';
// import EmailsModel from '../Models/EmailsModel';

// import BaseManufacturersController from './BaseManufacturersController';
// import { IProductsParams } from './ProductsController.types';

// export default class ProductsArgoxController extends BaseManufacturersController {
//   public async getProducts(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       const cacheKey = `admin-products-ARGOX-${JSON.stringify(req.query)}`;
//       await this.verifyPermission(req, 'ARGOX_read');
//       const { order } = req.query;
//       const { direction } = req.query;
//       const perPage = req.query.per_page;
//       const { page } = req.query;
//       const { search } = req.query;
//       const cache = await this.getCache(cacheKey);
//       if (cache) {
//         return res.status(200).json(cache);
//       }
//       const params: IProductsParams = {
//         ...(order ? { order: String(order) } : { order: 'id' }),
//         ...(direction
//           ? { direction: getUpperString(String(direction)) }
//           : { direction: 'ASC' }),
//         ...(search ? { search: String(search) } : { search: '' }),
//         slug: 'ARGOX',
//       };
//       const products = await this.productsModel.getProducts(params);
//       if (products.data.length === 0) {
//         await this.createCache(cacheKey, products);
//         return res.status(200).json(products);
//       }
//       const productsWithStock = await this.productsNbc({
//         page: page ? Number(page) : 1,
//         perPage: perPage ? Number(perPage) : 15,
//         products: products.data,
//         total: products.data.length,
//       });
//       await this.createCache(cacheKey, productsWithStock);
//       return res.status(200).json(productsWithStock);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async createProduct(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_create');
//       const productInputData = CreateProductFactory.fromRequest(req, 'ARGOX');
//       const productAction = new CreateProductAction();
//       const productId = (await productAction.execute(productInputData)).getId();
//       await this.deleteCache('products');
//       return res.status(200).json(productId);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async deleteProduct(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_delete');
//       const product = await this.productsModel.getProductsById(
//         Number(req.params.product_id),
//       );
//       const productInputData = DeleteProductFactory.fromRequest(req, product);
//       const productAction = new DeleteProductAction();
//       await productAction.execute(productInputData);
//       await this.deleteCache('products');
//       return res.status(200).json('Produto deletado.');
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async updateProduct(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_update');
//       const product = await this.productsModel.getProductsById(
//         Number(req.params.product_id),
//       );
//       const productInputData = UpdateProductFactory.fromRequest(req, 'ARGOX');
//       const currentProduct =
//         UpdateProductFactory.currentValueFromRequest(product);
//       const productAction = new UpdateProductAction();
//       await productAction.execute(productInputData, currentProduct);
//       await this.deleteCache('products');
//       return res.status(200).json('Produto atualizado com sucesso.');
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async importProducts(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_import');
//       const productInputData = ImportProductsFactory.fromRequest(req, 'ARGOX');
//       const productAction = new ImportProductsAction();
//       const dataImport = await productAction.execute(productInputData);
//       await this.deleteCache('products');
//       return res.status(200).json(dataImport);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async exportProducts(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_export');
//       const productInputData = ExportProductsFactory.fromRequest('ARGOX');
//       const productAction = new ExportProductsAction();
//       const products = await productAction.execute(productInputData);
//       res.setHeader(
//         'Content-Disposition',
//         `attachment; filename="Tabela-de-produtos-ARGOX.xlsx"`,
//       );
//       res.setHeader('Content-Type', 'application/vnd.ms-excel');
//       return res.end(products);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async getEmails(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_read');
//       const cacheKey = `admin-products-ARGOX-emails`;
//       const cache = await this.getCache(cacheKey);
//       if (cache) {
//         return res.status(200).json(cache);
//       }
//       const emailsModel = new EmailsModel();
//       const emails = await emailsModel.getEmailsByManufacturer('ARGOX');
//       await this.createCache(cacheKey, emails);
//       return res.status(200).json(emails);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async createEmail(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_create');
//       const emailInputData = CreateEmailFactory.fromRequest(req, 'ARGOX');
//       const emailAction = new CreateEmailAction();
//       const emailId = (await emailAction.execute(emailInputData)).getId();
//       await this.deleteCache('emails');
//       return res.status(200).json(emailId);
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async deleteEmail(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_delete');
//       const emailsModel = new EmailsModel();
//       const email = await emailsModel.getEmailById(Number(req.params.id));
//       const emailInputData = DeleteEmailFactory.fromRequest(req, email);
//       const emailAction = new DeleteEmailAction();
//       await emailAction.execute(emailInputData);
//       await this.deleteCache('emails');
//       return res.status(200).json('E-mail deletado.');
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }

//   public async updateEmail(
//     req: Request,
//     res: Response,
//   ): Promise<Response<string> | undefined> {
//     try {
//       await this.verifyPermission(req, 'ARGOX_update');
//       const emailsModel = new EmailsModel();
//       const email = await emailsModel.getEmailById(Number(req.params.id));
//       const emailInputData = UpdateEmailFactory.fromRequest(req, 'ARGOX');
//       const currentEmail = UpdateEmailFactory.currentValueFromRequest(email);
//       const emailAction = new UpdateEmailAction();
//       await emailAction.execute(emailInputData, currentEmail);
//       await this.deleteCache('emails');
//       return res.status(200).json('E-mail atualizado com sucesso.');
//     } catch (error) {
//       if (error instanceof HttpError) {
//         return res.status(error.statusCode).send({ message: error.message });
//       }
//     }
//   }
// }
