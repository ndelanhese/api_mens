import ListFactory from '@app/api/Shared/Factories/ListFactory';
import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateProductAction from '@app/src/Products/Application/Actions/CreateProductAction';
import DeleteProductAction from '@app/src/Products/Application/Actions/DeleteProductAction';
import ExportProductsAction from '@app/src/Products/Application/Actions/ExportProductsAction';
import UpdateProductAction from '@app/src/Products/Application/Actions/UpdateProductAction';
import UpdateProductStockAction from '@app/src/Products/Application/Actions/UpdateProductStockAction';
import { ProductStatusTypes } from '@app/src/Products/Domain/Enums/ProductStatusTypes';
import { formatCnpj } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import {
  getDateString,
  getTime,
} from '@app/src/Shared/Infrastructure/Utils/Date';
import { formatMoneyByCurrencySymbol } from '@app/src/Shared/Infrastructure/Utils/helpers/money';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateProductFactory from '../Factories/CreateProductFactory';
import DeleteProductFactory from '../Factories/DeleteProductFactory';
import ExportProductsFactory from '../Factories/ExportProductsFactory';
import ListProductsFactory from '../Factories/ListProductsFactory';
import ListProductsStockFactory from '../Factories/ListProductsStockFactory';
import UpdateProductFactory from '../Factories/UpdateProductFactory';
import UpdateProductStockFactory from '../Factories/UpdateProductStockFactory';
import ProductsModel from '../Models/ProductsModel';

import { Product } from './ProductsController.types';

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
      const { order, direction } = PaginationFactory.fromRequest(req);
      const { status } = ListFactory.fromRequest(req);
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
        status,
      );
      const preparedProducts = this.prepareProductsResponse(products);
      const productsPaginated = this.returnInData(preparedProducts);
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
      const preparedProduct = this.prepareProductResponse(product);
      await this.createCache(cacheKey, preparedProduct);
      return res.status(200).json(preparedProduct);
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
      return res.status(201).json(productId);
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
      return res.status(204).send();
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

  public async getProductsStock(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-stock-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'products_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      // const { page, perPage } = PaginationFactory.fromRequest(req);
      const { status, limit } = ListProductsStockFactory.fromRequest(req);
      const productsModel = new ProductsModel();
      const products = await productsModel.getProductsStock(status, limit);
      const productsPaginated = this.returnInData(products);
      await this.createCache(cacheKey, productsPaginated);
      return res.status(200).json(productsPaginated);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'products_read');
      const cache = await this.getCache('products-status');
      if (cache) return res.status(200).json(cache);
      const status = ProductStatusTypes.labelsToKeyValue();
      await this.createCache('products-status', status);
      return res.status(200).json(status);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareProductResponse(product: Product) {
    return {
      id: product.id,
      name: product.name,
      part_number: product.part_number,
      description: product.description,
      quantity: product.quantity,
      original_price: product.purchase_price ?? product.price,
      original_price_formatted: formatMoneyByCurrencySymbol(
        product.purchase_price ?? product.price,
      ),
      price: product.price,
      price_formatted: formatMoneyByCurrencySymbol(product.price),
      discount: product.purchase_price
        ? product.purchase_price - product.price
        : null,
      discount_formatted: product.purchase_price
        ? formatMoneyByCurrencySymbol(product.purchase_price - product.price)
        : null,
      status: ProductStatusTypes.getLabel(product.status),
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      supplier: {
        id: product.supplier.id,
        contact_name: product.supplier.contact_name,
        corporate_name: product.supplier.corporate_name,
        cnpj: formatCnpj(product.supplier.cnpj),
      },
    };
  }

  private prepareProductsResponse(products: Product[]) {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      part_number: product.part_number,
      description: product.description,
      quantity: product.quantity,
      original_price: product.purchase_price ?? product.price,
      original_price_formatted: formatMoneyByCurrencySymbol(
        product.purchase_price ?? product.price,
      ),
      price: product.price,
      price_formatted: formatMoneyByCurrencySymbol(product.price),
      discount: product.purchase_price
        ? product.purchase_price - product.price
        : null,
      discount_formatted: product.purchase_price
        ? formatMoneyByCurrencySymbol(product.purchase_price - product.price)
        : null,
      status: ProductStatusTypes.getLabel(product.status),
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      supplier: {
        id: product.supplier.id,
        contact_name: product.supplier.contact_name,
        corporate_name: product.supplier.corporate_name,
        cnpj: formatCnpj(product.supplier.cnpj),
      },
    }));
  }
}
