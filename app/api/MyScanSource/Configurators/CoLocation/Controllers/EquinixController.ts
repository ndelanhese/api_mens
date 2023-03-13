import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';
import { RpmProductsResponse } from './EquinixController.types';
import CreateEquinixEstimateFactory from '../Factories/CreateEquinixEstimate';
import BaseController from '@app/api/MyScanSource/Shared/Controllers/BaseController';
import RpmProvider from '@app/src/Configurators/Infrastructure/Providers/RpmProvider';
import CreateConfiguratorEstimateInputData from '@app/src/Configurators/Apllication/Dtos/CreateConfiguratorEstimateInputData';
import CreateConfiguratorEstimateAction from '@app/src/Configurators/Apllication/Actions/CreateConfiguratorsEstimateAction';
export default class EquinixController extends BaseController {
  public async getProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { url } = req;
      const cache = await this.getCache(
        `configurator-co-location-equinix-${url}`,
      );
      if (cache) return res.status(200).json(cache);
      const products = await this.getEquinixProducts();
      const dataResponse = {
        data: products,
      };
      await this.createCache(
        `configurator-co-location-equinix-${url}`,
        dataResponse,
      );
      return res.status(200).json(dataResponse);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createEstimate(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.deleteCache('configurator-co-location-equinix');
      const { content, rpmContent } =
        CreateEquinixEstimateFactory.fromRequest(req);
      const rpmProvider = new RpmProvider();
      const rpmResponse = await rpmProvider.submitForm(rpmContent);
      const estimateInput = new CreateConfiguratorEstimateInputData(
        'Co Location',
        JSON.parse(JSON.stringify(content)),
        JSON.parse(JSON.stringify(rpmContent)),
      );
      const createEstimate = new CreateConfiguratorEstimateAction();
      await createEstimate.execute(estimateInput);
      return res.status(200).json(rpmResponse);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private async getEquinixProducts() {
    try {
      const processId = '96';
      const viewId = '1431';
      const rpmProvider = new RpmProvider();
      const productsRpm = await rpmProvider.getProducts(processId, viewId);
      return this.getProductsData(productsRpm);
    } catch {
      throw new HttpError(500, 'Erro ao listar os produtos');
    }
  }

  private numberParse(value: string): number {
    if (value === '' || !value) return 1000;
    return Number(value);
  }

  private getProductsData(products: RpmProductsResponse[]) {
    // This method retrieves the products and checks if they have optionals, assigning them accordingly.
    const productNumberPosition = 0; // Position of the product number in the array.
    const productPartNumberPosition = 1; // Position of the product part number in the array.
    const productNamePosition = 2; // Position of the product name in the array.
    const productManufacturer = 5; // Position of the product manufacturer in the array.
    const productPricePosition = 6; // Position of the product price in the array.
    const productInstallPricePosition = 7; // Position of the product install price in the array.

    return products
      .map((product) => {
        const { FormID, Values } = product;
        return {
          form_id: FormID,
          number: this.numberParse(Values[productNumberPosition]),
          part_number: Values[productPartNumberPosition],
          manufacturer: Values[productManufacturer],
          name: Values[productNamePosition],
          install_price: this.numberParse(Values[productInstallPricePosition]),
          price: this.numberParse(Values[productPricePosition]),
        };
      })
      .sort((a, b) => a.price - b.price);
  }
}
