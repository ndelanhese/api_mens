import { Request, Response } from 'express';
import BaseController from '@my-scan-source-base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import ProductsModel from '../Models/ProductsModel';
import { getUpperString, nameLabel } from '@shared/String';
import {
  IProducts,
  IProductsPagination,
  IProductsParams,
  IProductsResponse,
  IProductsStock,
  IProductsStockNbcReturn,
} from './ProductsController.types';
import { removeMask } from '@shared/Formatter';
import axios from 'axios';

export default class ProductsController extends BaseController {
  private productsModel: ProductsModel;

  constructor() {
    super();
    this.productsModel = new ProductsModel();
  }

  public async getProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { order } = req.query;
      const { direction } = req.query;
      const perPage = req.query.per_page;
      const { page } = req.query;
      const partNumber = req.query.part_number;
      const { description } = req.query;
      const { manufacturer } = req.query;
      const { type } = req.query;
      const { url } = req;
      const { authorization } = req.headers;
      if (!authorization)
        return res.status(401).send({ message: 'Não autorizado' });

      const { token, cnpj, login, resale } = this.getUser(authorization);
      const cache = await this.getCache(`products-my-scan-source-${url}`);
      if (cache) return res.status(200).json(cache);
      const params: IProductsParams = {
        ...(order ? { order: String(order) } : { order: 'id' }),
        ...(direction
          ? { direction: getUpperString(direction) }
          : { direction: 'ASC' }),
        ...(perPage ? { limit: Number(perPage) } : { limit: 15 }),
        ...(page ? { offset: Number(page) } : { offset: 0 }),
        ...(partNumber
          ? { partNumber: String(partNumber).trim() }
          : { partNumber: '' }),
        ...(description
          ? { description: String(description).trim() }
          : { description: '' }),
        ...(manufacturer
          ? { manufacturer: String(manufacturer).trim() }
          : { manufacturer: '' }),
        ...(type ? { type: String(type).trim() } : { type: '%%' }),
        session: token,
        cnpj: removeMask(cnpj),
        userName: login,
        company: resale,
      };
      const products = await this.productsModel.getProducts(params);
      if (products.length === 0) {
        await this.createCache(`products-my-scan-source-${url}`, products);
        return res.status(200).json(products);
      }
      const productsWithStock = await this.productsNbc({
        page: page ? Number(page) : 1,
        perPage: perPage ? Number(perPage) : 15,
        products: products,
        total: products.length,
        session: token,
      });
      await this.createCache(
        `products-my-scan-source-${url}`,
        productsWithStock,
      );
      return res.status(200).json(productsWithStock);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getProductsType(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache('products-types-my-scan-source');
      if (cache) return res.status(200).json(cache);
      const productsType = await this.productsModel.findAllProductsTypes();
      const typesObject = {
        data: productsType.map((type) => ({
          name: type.type,
        })),
      };
      await this.createCache('products-types-my-scan-source', typesObject);
      return res.status(200).json(typesObject);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getProductsManufacturers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache(
        'products-manufacturers-my-scan-source',
      );
      if (cache) return res.status(200).json(cache);
      const manufacturers = await this.productsModel.getProductsManufacturer();
      const manufacturersObject = {
        data: manufacturers.map((manufacturer) => ({
          label: nameLabel(manufacturer.manufacturer_slug),
          slug: manufacturer.manufacturer_slug,
        })),
      };
      await this.createCache(
        'products-manufacturers-my-scan-source',
        manufacturersObject,
      );
      return res.status(200).json(manufacturersObject);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private productsPagination({ page, perPage, products }: IProductsPagination) {
    const from = perPage * page - perPage;
    const to = from + perPage;

    return {
      data: products.slice(from, to),
      from: from + 1,
      to: to > products.length ? products.length : to,
    };
  }

  private createPartNumberList(products: IProductsResponse[]) {
    if (products.length === 0) {
      return '';
    }
    const partNumberList = products.map((product) => product.part_number);
    return partNumberList.join(',');
  }

  private async getProductsStockByNbc(partNumberList: string, session: string) {
    const data: IProductsStockNbcReturn[] = await axios
      .post(
        'http://digital.network1.com.br/rserverb2b/api/produto?userName=MKT&userCompany=AWARD',
        {
          CNPJ_REV: '19139',
          CNPJ_CLI: '',
          PARTN: '',
          SESSION: session,
          UFDEST: 'SP',
          FINALIDADE: 'CONSUMO',
          CONTRIBUINTE: '',
          OPTANTE: '',
          LISTA_PN: partNumberList,
        },
      )
      .then((response) => response.data);

    return data.map((item) => ({
      stock: item.ESTOQUE_LOCAL,
      partNumber: item.PARTNUMBER,
    }));
  }

  private addStockOnProductsList = (
    data: IProductsResponse[],
    stock: IProductsStock[],
  ) => {
    return data.map((item) => {
      const stockValue = stock.find(
        (stockItem) => item.part_number === stockItem.partNumber,
      );
      return {
        id: item.id,
        manufacturer_slug: item.manufacturer_slug,
        type: item.type,
        part_number: item.part_number,
        description: item.description,
        currency: item.currency,
        contributor_price: item.contributor_price,
        ...(item.exempt_price === 0
          ? { exempt_price: 'Sob consulta' }
          : { exempt_price: item.exempt_price }),
        note: item.note,
        outlet: item.outlet,
        stock: stockValue?.stock ?? '0',
      };
    });
  };

  private async productsNbc({
    page,
    perPage,
    products,
    total,
    session,
  }: IProducts) {
    const productsSplitted = this.productsPagination({
      page,
      perPage,
      products,
    });
    const partNumberList = this.createPartNumberList(productsSplitted.data);
    const stock = await this.getProductsStockByNbc(partNumberList, session);
    if (productsSplitted.data.length === 0) {
      return {
        data: [],
      };
    }
    return {
      data: this.addStockOnProductsList(productsSplitted.data, stock),
      total,
      page: page,
      per_page: perPage,
      from: productsSplitted.from,
      to: productsSplitted.to,
    };
  }
}
