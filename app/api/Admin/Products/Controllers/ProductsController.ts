import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import BaseController from '@admin-base-controller/BaseController';
import ProductsModel from '../Models/ProductsModel';
import {
  getNameFromURLByList,
  getSlugManufacturerName,
  getSlugName,
  getUpperString,
} from '@shared/String';
import {
  IProducts,
  IProductsPagination,
  IProductsParams,
  IProductsResponse,
  IProductsStock,
  IProductsStockNbcReturn,
} from './ProductsController.types';
import axios from 'axios';
import CreateProductFactory from '../Factories/CreateProductFactory';
import CreateProductAction from '@app/src/Products/Application/Actions/CreateProductAction';
import ExportProductsFactory from '../Factories/ExportProductsFacotry';
import ExportProductsAction from '@app/src/Products/Application/Actions/ExportProductsAction';
import ImportProductsFactory from '../Factories/ImportProductsFactory';
import ImportProductsAction from '@app/src/Products/Application/Actions/ImportProductsAction';
import DeleteProductFactory from '../Factories/DeleteProductFacotry';
import DeleteProductAction from '@app/src/Products/Application/Actions/DeleteProductAction';
import UpdateProductFactory from '../Factories/UpdateProductFacotry';
import UpdateProductAction from '@app/src/Products/Application/Actions/UpdateProductAction';

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
      const { url } = req;
      await this.verifyPermission(
        req,
        `${getSlugName(getNameFromURLByList(url))}_read`,
      );
      const { order } = req.query;
      const { direction } = req.query;
      const perPage = req.query.per_page;
      const { page } = req.query;
      const { search } = req.query;
      const cache = await this.getCache(`admin-products-${url}`);
      if (cache) {
        return res.status(200).json(cache);
      }
      const params: IProductsParams = {
        ...(order ? { order: String(order) } : { order: 'id' }),
        ...(direction
          ? { direction: getUpperString(direction) }
          : { direction: 'ASC' }),
        ...(search ? { search: String(search) } : { search: '' }),
        slug: getSlugManufacturerName(getNameFromURLByList(url)),
      };
      const products = await this.productsModel.getProducts(params);
      if (products.data.length === 0) {
        await this.createCache(`admin-products-${url}`, products);
        return res.status(200).json(products);
      }
      const productsWithStock = await this.productsNbc({
        page: page ? Number(page) : 1,
        perPage: perPage ? Number(perPage) : 15,
        products: products.data,
        total: products.data.length,
      });
      await this.createCache(`admin-products-${url}`, productsWithStock);
      return res.status(200).json(productsWithStock);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getProductsTypes(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'type_products');
      const cache = await this.getCache('admin-products-types');
      if (cache) {
        return res.status(200).json(cache);
      }
      const data = await this.productsModel.getProductsTypes();
      await this.createCache('admin-products-types', data);
      return res.status(200).json(data);
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
      await this.verifyPermission(
        req,
        `${this.getManufacturerByUrl(req)}_create`,
      );
      const productInputData = CreateProductFactory.fromRequest(req);
      const productAction = new CreateProductAction();
      const productId = (await productAction.execute(productInputData)).getId();
      this.deleteCache('products');
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
      await this.verifyPermission(
        req,
        `${this.getManufacturerByUrl(req)}_delete`,
      );
      const product = await this.productsModel.getProductsById(
        Number(req.params.product_id),
      );
      const productInputData = DeleteProductFactory.fromRequest(req, product);
      const productAction = new DeleteProductAction();
      await productAction.execute(productInputData);
      this.deleteCache('products');
      return res.status(200).json('Produto deletado.');
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
      const manufacturer = this.getManufacturerByUrl(req);
      await this.verifyPermission(req, `${manufacturer}_update`);
      const product = await this.productsModel.getProductsById(
        Number(req.params.product_id),
      );
      const productInputData = UpdateProductFactory.fromRequest(
        req,
        manufacturer,
      );
      const currentProduct =
        UpdateProductFactory.currentValueFromRequest(product);
      const productAction = new UpdateProductAction();
      await productAction.execute(productInputData, currentProduct);
      await this.deleteCache('products');
      return res.status(200).json('Produto atualizado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async importProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(
        req,
        `${this.getManufacturerByUrl(req)}_import`,
      );
      const productInputData = ImportProductsFactory.fromRequest(req);
      const productAction = new ImportProductsAction();
      const productsId = await productAction.execute(productInputData);
      this.deleteCache('products');
      return res.status(200).json(productsId);
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
      await this.verifyPermission(
        req,
        `${this.getManufacturerByUrl(req)}_export`,
      );
      const productInputData = ExportProductsFactory.fromRequest(req);
      const productAction = new ExportProductsAction();
      const products = await productAction.execute(productInputData);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-produtos-${this.getManufacturerByUrl(
          req,
        )}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end(products);
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

  private async getProductsStockByNbc(partNumberList: string) {
    try {
      const data: IProductsStockNbcReturn[] = await axios
        .post(
          'http://digital.network1.com.br/rserverb2b/api/produto?userName=MKT&userCompany=AWARD',
          {
            CNPJ_REV: '19139',
            CNPJ_CLI: '',
            PARTN: '',
            SESSION: 'imo7pa8fz5p2',
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
    } catch {
      throw new HttpError(500, 'Erro ao buscar estoque do(s) produto(s)');
    }
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
        stock: stockValue?.stock ?? 0,
      };
    });
  };

  private async productsNbc({ page, perPage, products, total }: IProducts) {
    const productsSplitted = this.productsPagination({
      page,
      perPage,
      products,
    });
    const partNumberList = this.createPartNumberList(productsSplitted.data);
    const stock = await this.getProductsStockByNbc(partNumberList);
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
