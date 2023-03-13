import { Request } from 'express';
import {
  IEstimatePayload,
  IEstimateProduct,
} from './CreateEquinixEstimate.types';
import payloadToRequest, { fieldsPositions } from './EquinixRpmPayload';

export default class CreateEquinixEstimateFactory {
  static fromRequest(req: Request) {
    const payload: IEstimatePayload = {
      agent: req.body.agent,
      duration: req.body.duration,
      observations: req.body.observations,
      products: req.body.products,
    };
    return {
      content: payload,
      rpmContent: this.valuesOnPayload(payload),
    };
  }

  private static valuesOnPayload(payload: IEstimatePayload) {
    const { agent, duration, observations, products } = payload;
    const payloadEstimate = payloadToRequest;
    const setFieldValue = (
      fieldPosition: number,
      fieldValue: string | number,
    ) => {
      payloadEstimate.Form.Fields[fieldPosition].Value = fieldValue;
    };
    setFieldValue(fieldsPositions.companyNamePosition, agent.company_name);
    setFieldValue(fieldsPositions.cnpjPosition, agent.cnpj);
    setFieldValue(fieldsPositions.representativePosition, agent.name);
    setFieldValue(fieldsPositions.representativeEmailPosition, agent.email);
    setFieldValue(fieldsPositions.representativePhonePosition, agent.phone);
    setFieldValue(
      fieldsPositions.contractDurationPosition,
      `${duration}+Meses`,
    );
    setFieldValue(
      fieldsPositions.installPricePosition,
      this.getInstallationValue(products),
    );
    setFieldValue(fieldsPositions.specialInstructionsPosition, observations);
    const productPosition = payloadEstimate.Form.Fields.findIndex(
      (fieldPosition) => fieldPosition.Field === 'Produto+Principal',
    );
    if (productPosition !== -1) {
      payloadEstimate.Form.Fields.pop();
    }
    payloadEstimate.Form.Fields.push({
      Field: 'Produto+Principal',
      Rows: this.convert(products),
    });
    return payloadEstimate;
  }

  private static convert(products: IEstimateProduct[]) {
    return products.map((product) => ({
      Fields: [
        { Uid: '522_633', Values: [{ ID: product.form_id }] },
        { Uid: '500_6974', Values: [{ Value: product.quantity }] },
        { Uid: '500_8539', Values: [{ Value: product.price.toFixed(4) }] },
      ],
    }));
  }

  private static getInstallationValue(payloadProducts: IEstimateProduct[]) {
    const installPrices = payloadProducts.map(
      (product) => product.install_price,
    );
    const price = installPrices.reduce(
      (accumulator, current) => accumulator + current,
      0,
    );
    return price;
  }
}
