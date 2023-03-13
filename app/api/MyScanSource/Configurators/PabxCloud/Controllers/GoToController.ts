import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';
import {
  ProductInterface,
  ProductsThatHaveTheOptionals,
  RpmProductsResponse,
} from './GoToController.types';
import CreateGoToEstimateFactory from '../Factories/CreateGoToEstimate';
import BaseController from '@my-scan-source/Shared/Controllers/BaseController';
import RpmProvider from '@app/src/Configurators/Infrastructure/Providers/RpmProvider';
import CreateConfiguratorEstimateInputData from '@app/src/Configurators/Apllication/Dtos/CreateConfiguratorEstimateInputData';
import CreateConfiguratorEstimateAction from '@app/src/Configurators/Apllication/Actions/CreateConfiguratorsEstimateAction';
export default class GoToController extends BaseController {
  public async getProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { url } = req;
      const cache = await this.getCache(`configurator-pabx-goto-${url}`);
      if (cache) return res.status(200).json(cache);
      const quantity = this.prepareRangeByQuantity(req.query.quantity);
      const products = await this.getGoToProducts(quantity);
      await this.createCache(`configurator-pabx-goto-${url}`, {
        data: products,
      });
      return res.status(200).json({
        data: products,
      });
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
      await this.deleteCache('configurator-pabx-goto');
      const { content, rpmContent } =
        CreateGoToEstimateFactory.fromRequest(req);
      const rpmProvider = new RpmProvider();
      const rpmResponse = await rpmProvider.submitForm(rpmContent);
      const estimateInput = new CreateConfiguratorEstimateInputData(
        'Pabx Cloud',
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

  protected prepareRangeByQuantity(quantity: string | any) {
    if (!quantity || typeof quantity !== 'string') return 1;
    return Number(quantity);
  }

  private async getGoToProducts(filter: number) {
    try {
      const processId = '96';
      const viewId = '1312';
      const rpmProvider = new RpmProvider();
      const productsRpm = await rpmProvider.getProducts(processId, viewId);
      const goToType = 'GoTo Connect Total';
      const productTypePosition = 2; // Position of the product type in the array.
      const productMinRangePosition = 10; // Position of the product min range in the array.
      const productMaxRangePosition = 11; // Position of the product max range in the array.
      //Filters the products by type
      const goToProducts = productsRpm.filter(
        (product) => product.Values[productTypePosition] === goToType,
      );
      //Filters the products within the range.
      const goToProductsFilteredByRange = goToProducts.filter((product) => {
        if (filter === 501) {
          return product.Values[productMaxRangePosition] === '';
        }
        if (filter === 1) {
          return product;
        }
        return (
          filter >= Number(product.Values[productMinRangePosition]) &&
          filter <= Number(product.Values[productMaxRangePosition])
        );
      });
      const goToOptionalProducts = this.getOptionalProducts(productsRpm);
      const productsThatHaveTheOptionals =
        this.getProductsThatHaveTheOptional(goToOptionalProducts);
      return this.getProductsAndOptionals(
        goToProductsFilteredByRange,
        goToOptionalProducts,
        productsThatHaveTheOptionals,
      );
    } catch {
      throw new HttpError(500, 'Erro ao listar os produtos');
    }
  }

  private numberParse(value: string): number {
    if (value === '' || !value) return 1000;
    return Number(value);
  }

  private getOptionalProducts(products: RpmProductsResponse[]) {
    // partNumberPositions is the position of the part number code in the product array
    const partNumberPosition = 1;
    // this partNumber are the product named ms teams
    const msTeamsPartNumber = 'LMI-IMST';
    // this partNumber are the product named lines
    const linesPartNumber = 'LMI-BRVP';
    return products.filter(
      (product) =>
        product.Values[partNumberPosition] === msTeamsPartNumber ||
        product.Values[partNumberPosition] === linesPartNumber,
    );
  }

  private getProductsThatHaveTheOptional(products: RpmProductsResponse[]) {
    // This code is related to the extraction of products that have msTeams or Lines as optional.
    // These two positions refer to the part numbers LMI-IMST and LMI-BRVP, respectively, and they are the optional products.
    const msTeamsPosition = 0;
    const linesPosition = 1;
    // This position is the position in the array where there is a string with the name of all products that have this optional.
    const productsParticipantsPosition = 16;
    // These two functionalities convert a comma-separated string to an array,
    //removing all spaces at the beginning and end of the names and also replacing(501 +),
    // which is how it appears in the response, with (+de 501), which is present in the product names.
    const teamsParticipantsProducts = products[msTeamsPosition].Values[
      productsParticipantsPosition
    ]
      .split(',')
      .map((product) => product.replace('(501+)', '(+de 501)').trim());
    const linesParticipantsProducts = products[linesPosition].Values[
      productsParticipantsPosition
    ]
      .split(',')
      .map((product) => product.replace('(501+)', '(+de 501)').trim());
    return {
      integration: teamsParticipantsProducts,
      lines: linesParticipantsProducts,
      integrationPosition: msTeamsPosition,
      linesPosition,
    };
  }

  private getProductsAndOptionals(
    products: RpmProductsResponse[],
    optionalProducts: RpmProductsResponse[],
    productsThatHaveTheOptionals: ProductsThatHaveTheOptionals,
  ) {
    // This method retrieves the products and checks if they have optionals, assigning them accordingly.
    const productNumberPosition = 0; // Position of the product number in the array.
    const productPartNumberPosition = 1; // Position of the product part number in the array.
    const productTypePosition = 2; // Position of the product type in the array.
    const productNamePosition = 5; // Position of the product name in the array.
    const productPricePosition = 7; // Position of the product price in the array.
    const productDescriptionPosition = 8; // Position of the product description in the array.
    const productMinRangePosition = 10; // Position of the product min range in the array.
    const productMaxRangePosition = 11; // Position of the product max range in the array.
    return products
      .map((product) => {
        // This replace handles an exception where one of the products has a space between the + and the de.
        const name = product.Values[productNamePosition].replace(
          '(+ de 501)',
          '(+de 501)',
        );
        // Check if the product has an integration optional.
        const hasOptionalIntegration =
          productsThatHaveTheOptionals.integration.includes(name);
        // Check if the product has a line optional.
        const hasOptionalLine =
          productsThatHaveTheOptionals.lines.includes(name);
        const { FormID, Values } = product;
        const productObject: ProductInterface = {
          form_id: FormID,
          number: this.numberParse(Values[productNumberPosition]),
          part_number: Values[productPartNumberPosition],
          name: Values[productNamePosition],
          price: this.numberParse(Values[productPricePosition]),
          description: Values[productDescriptionPosition],
          min: this.numberParse(Values[productMinRangePosition]),
          max: this.numberParse(Values[productMaxRangePosition]),
          type: Values[productTypePosition],
          optional: {
            line: null,
            integration: null,
          },
        };
        if (hasOptionalIntegration && name.includes('STANDARD')) {
          const integration =
            optionalProducts[productsThatHaveTheOptionals.integrationPosition];
          // Add the integration optional to the object.
          productObject.optional.integration = {
            form_id: integration.FormID,
            number: this.numberParse(integration.Values[productNumberPosition]),
            part_number: integration.Values[productPartNumberPosition],
            name: integration.Values[productNamePosition],
            price: this.numberParse(integration.Values[productPricePosition]),
          };
        }
        if (hasOptionalLine) {
          const line =
            optionalProducts[productsThatHaveTheOptionals.linesPosition];
          // Add the line optional to the object.
          productObject.optional.line = {
            form_id: line.FormID,
            number: this.numberParse(line.Values[productNumberPosition]),
            part_number: line.Values[productPartNumberPosition],
            name: line.Values[productNamePosition],
            price: this.numberParse(line.Values[productPricePosition]),
            quantity_free: 1,
          };
        }
        return productObject;
      })
      .sort((a, b) => a.min - b.min);
  }
}
