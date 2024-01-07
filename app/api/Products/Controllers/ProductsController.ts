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
import { PromotionProductsModel } from '../Models/PromotionProductsModel';
import { PromotionsModel } from '../Models/PromotionsModel';

import { Product, Promotion } from './ProductsController.types';

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
      const showSoldOutProducts = req.query?.show_sold_out
        ? req.query?.show_sold_out === 'true'
        : false;
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
        showSoldOutProducts,
      );
      const preparedProducts = await this.prepareProductsResponse(products);
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
      const preparedProduct = await this.prepareProductResponse(product);
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

  private async getPromotionsByProduct(productId: number) {
    const productsPromotionsModel = new PromotionProductsModel();
    return await productsPromotionsModel.getPromotionsByProduct(productId);
  }

  private async getPromotionById(promotionId: number) {
    const promotionsModel = new PromotionsModel();
    return await promotionsModel.getPromotion(promotionId);
  }

  private calculateDiscount(productPrice: number, promotion: Promotion | null) {
    if (!promotion) return { discount: 0, finalPrice: productPrice };

    let discount: number;
    if (promotion.discount_type === 'fixed') {
      discount = Math.min(promotion.discount_amount, productPrice);
    } else {
      const percentageDiscount =
        (productPrice * promotion.discount_amount) / 100;
      discount = Math.min(percentageDiscount, productPrice);
    }

    const finalPrice = productPrice - discount;

    return { discount, finalPrice };
  }

  private async prepareProductDiscount(
    productId: number,
    productPrice: number,
  ) {
    const productPromotions = await this.getPromotionsByProduct(productId);

    if (!productPromotions || productPromotions.length < 1) return {};

    const promotionPromises = productPromotions.map(
      async promotion => await this.getPromotionById(promotion.promotion_id),
    );
    const promotions: Promotion[] = (await Promise.all(
      promotionPromises,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;

    if (!promotions || promotions.length < 1) return {};

    let minFinalPrice = Infinity;
    let minFinalPricePromotion: Promotion | undefined;

    for (const promotion of promotions) {
      const { finalPrice } = this.calculateDiscount(
        productPrice,
        promotion as Promotion,
      );

      if (finalPrice < minFinalPrice) {
        minFinalPrice = finalPrice;
        minFinalPricePromotion = promotion;
      }
    }

    if (minFinalPricePromotion) {
      const { discount_type, discount_amount } = minFinalPricePromotion;
      return {
        discount_type,
        discount_amount,
        discount_formatted:
          discount_type === 'percentage'
            ? `${discount_amount}%`
            : formatMoneyByCurrencySymbol(discount_amount),
        final_price: formatMoneyByCurrencySymbol(minFinalPrice),
      };
    }

    return {};
  }

  private async prepareProductResponse(product: Product) {
    const discount = await this.prepareProductDiscount(
      product.id,
      product.price,
    );
    return {
      id: product.id,
      name: product.name,
      part_number: product.part_number,
      description: product.description,
      quantity: product.quantity,
      size: product?.size,
      color: product?.color,
      original_price: product.purchase_price ?? product.price,
      original_price_formatted: formatMoneyByCurrencySymbol(
        product.purchase_price ?? product.price,
      ),
      price: product.price,
      price_formatted: formatMoneyByCurrencySymbol(product.price),
      ...discount,
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

  private async prepareProductsResponse(products: Product[]) {
    const productsPromise = products.map(async product => {
      const discount = await this.prepareProductDiscount(
        product.id,
        product.price,
      );
      return {
        id: product.id,
        name: product.name,
        part_number: product.part_number,
        description: product.description,
        quantity: product.quantity,
        size: product?.size,
        color: product?.color,
        original_price: product.purchase_price ?? product.price,
        original_price_formatted: formatMoneyByCurrencySymbol(
          product.purchase_price ?? product.price,
        ),
        price: product.price,
        price_formatted: formatMoneyByCurrencySymbol(product.price),
        ...discount,
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
    });
    return await Promise.all(productsPromise);
  }
}
