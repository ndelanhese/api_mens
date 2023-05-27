import CreateBrandAction from '@app/src/Brands/Application/Actions/CreateBrandAction';
import DeleteBrandAction from '@app/src/Brands/Application/Actions/DeleteBrandAction';
import UpdateBrandAction from '@app/src/Brands/Application/Actions/UpdateBrandAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateBrandFactory from '../Factories/CreateBrandFactory';
import DeleteBrandFactory from '../Factories/DeleteBrandFactory';
import UpdateBrandFactory from '../Factories/UpdateBrandFactory';
import BrandsModel from '../Models/BrandsModel';

export default class BrandsController extends BaseController {
  public async getBrands(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'brands_read');
      const cacheKey = 'brands';
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const brandsModel = new BrandsModel();
      const brands = await brandsModel.getBrands();
      await this.createCache(cacheKey, brands);
      return res.status(200).json(brands);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getBrand(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'brands_read');
      const { id } = req.params;
      const cacheKey = `brands-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const brandsModel = new BrandsModel();
      const brand = await brandsModel.getBrand(Number(id));
      await this.createCache(cacheKey, brand);
      return res.status(200).json(brand);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createBrand(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'brands_create');
      const brandInputData = CreateBrandFactory.fromRequest(req);
      const brandAction = new CreateBrandAction();
      const brandId = (await brandAction.execute(brandInputData)).getId();
      await this.deleteCache('brands');
      return res.status(201).json(brandId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateBrand(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'brands_update');
      const userInputData = UpdateBrandFactory.fromRequest(req);
      const userAction = new UpdateBrandAction();
      const brandsModel = new BrandsModel();
      const currentBrands = await brandsModel.getBrand(userInputData.id);
      const currentBrandsInputData =
        UpdateBrandFactory.fromCurrentBrand(currentBrands);
      await userAction.execute(userInputData, currentBrandsInputData);
      await this.deleteCache('brands');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteBrand(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'brands_delete');
      const userInputData = DeleteBrandFactory.fromRequest(req);
      const userAction = new DeleteBrandAction();
      await userAction.execute(userInputData);
      await this.deleteCache('brands');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
