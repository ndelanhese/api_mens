import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateProductAction from '@app/src/Products/Application/Actions/CreateProductAction';
import DeleteProductAction from '@app/src/Products/Application/Actions/DeleteProductAction';
import ExportProductsAction from '@app/src/Products/Application/Actions/ExportProductsAction';
import UpdateProductAction from '@app/src/Products/Application/Actions/UpdateProductAction';
import UpdateProductStockAction from '@app/src/Products/Application/Actions/UpdateProductStockAction';
import { getDateString, getTime } from '@app/src/Shared/Domain/Utils/Date';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateProductFactory from '../Factories/CreateProductFactory';
import DeleteProductFactory from '../Factories/DeleteProductFactory';
import ExportProductsFactory from '../Factories/ExportProductsFactory';
import ListProductsFactory from '../Factories/ListProductsFactory';
import UpdateProductFactory from '../Factories/UpdateProductFactory';
import UpdateProductStockFactory from '../Factories/UpdateProductStockFactory';
import ProductsModel from '../Models/ProductsModel';

export default class ProductsController extends BaseController {
  public async getProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'products_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const { page, perPage, order, direction } =
        PaginationFactory.fromRequest(req);
      const {
        brand_id,
        category_id,
        description,
        final_value,
        initial_value,
        name,
        part_number,
        supplier_id,
      } = ListProductsFactory.fromRequest(req);
      const productsModel = new ProductsModel();
      const products = await productsModel.getProducts(
        order,
        direction,
        category_id,
        brand_id,
        supplier_id,
        initial_value,
        final_value,
        name,
        part_number,
        description,
      );
      const productsPaginated = this.dataPagination(page, perPage, products);
      await this.createCache(cacheKey, productsPaginated);
      return res.status(200).json(productsPaginated);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getProduct(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-${req.params.id}`;
      await this.verifyPermission(req, 'products_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const productsModel = new ProductsModel();
      const product = await productsModel.getProduct(Number(req.params.id));
      await this.createCache(cacheKey, product);
      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createProduct(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_create');
      const productInputData = CreateProductFactory.fromRequest(req);
      const productAction = new CreateProductAction();
      const productId = (await productAction.execute(productInputData)).getId();
      await this.deleteCache('products');
      return res.status(200).json(productId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteProduct(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_delete');
      const productInputData = DeleteProductFactory.fromRequest(req);
      const productAction = new DeleteProductAction();
      await productAction.execute(productInputData);
      await this.deleteCache('products');
      return res.status(200).json('Produto deletado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateProduct(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_update');
      const productsModel = new ProductsModel();
      const product = await productsModel.getProduct(Number(req.params.id));
      const productInputData = UpdateProductFactory.fromRequest(req);
      const currentProduct =
        UpdateProductFactory.currentValueFromRequest(product);
      const productAction = new UpdateProductAction();
      await productAction.execute(productInputData, currentProduct);
      await this.deleteCache('products');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateProductStock(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_update');
      const productInputData = UpdateProductStockFactory.fromRequest(req);
      const productAction = new UpdateProductStockAction();
      await productAction.execute(productInputData);
      await this.deleteCache('products');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async exportProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_export');
      const productAction = new ExportProductsAction();
      const productsInputData = ExportProductsFactory.fromRequest(req);
      const products = await productAction.execute(productsInputData);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-produtos-${getDateString()}-${getTime()}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end(products);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
