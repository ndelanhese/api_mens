import { Request } from 'express';
import {
  IEstimatePayload,
  IEstimateProduct,
} from './CreateCyberpassEstimate.types';
import payloadToRequest, { fieldsPositions } from './CyberpassRpmPayload';

export default class CreateCyberpassEstimateFactory {
  static fromRequest(req: Request) {
    const payload: IEstimatePayload = {
      agent: req.body.agent,
      observations: req.body.observations,
      products: req.body.products,
    };
    return {
      content: payload,
      rpmContent: this.valuesOnPayload(payload),
    };
  }

  private static valuesOnPayload(payload: IEstimatePayload) {
    const { agent, observations, products } = payload;
    const payloadEstimate = payloadToRequest;
    const setFieldValue = (
      fieldPosition: number,
      fieldValue: string | number,
    ) => {
      payloadEstimate.Form.Fields[fieldPosition].Value = fieldValue;
    };
    setFieldValue(fieldsPositions.channelCompanyName, agent.company_name);
    setFieldValue(fieldsPositions.channelCNPJ, agent.cnpj);
    setFieldValue(fieldsPositions.channelRepresentative, agent.name);
    setFieldValue(
      fieldsPositions.channelRepresentativeContactEmail,
      agent.email,
    );
    setFieldValue(
      fieldsPositions.channelRepresentativeContactPhone,
      agent.phone,
    );
    setFieldValue(fieldsPositions.contractDuration, '24 Meses');
    setFieldValue(fieldsPositions.specialInstructions, observations);
    const productPosition = payloadEstimate.Form.Fields.findIndex(
      (fieldPosition) => fieldPosition.Field === 'Produto Principal',
    );
    if (productPosition !== -1) {
      payloadEstimate.Form.Fields.pop();
    }
    payloadEstimate.Form.Fields.push({
      Field: 'Produto Principal',
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
}
