import { Request } from 'express';
import {
  IEstimatePayload,
  IEstimateProduct,
  IProductFieldsRpmPattern,
} from './CreateGoToEstimate.types';
import payloadToRequest, { fieldsPositions } from './GoToRpmPayload';

export default class CreateGoToEstimateFactory {
  static fromRequest(req: Request) {
    const payload: IEstimatePayload = {
      agent: req.body.agent,
      customer: req.body.customer,
      portability: req.body.portability,
      observation: req.body.observation,
      products: req.body.products,
    };
    return {
      content: payload,
      rpmContent: this.valuesOnPayload(payload),
    };
  }

  private static valuesOnPayload(payload: IEstimatePayload) {
    const { agent, customer, observation, portability, products } = payload;
    const payloadEstimate = payloadToRequest;
    const setFieldValue = (fieldPosition: number, fieldValue: string) => {
      payloadEstimate.Form.Fields[fieldPosition].Value = fieldValue;
    };
    setFieldValue(fieldsPositions.companyNamePosition, agent.company_name);
    setFieldValue(fieldsPositions.cnpjPosition, agent.cnpj);
    setFieldValue(fieldsPositions.representativePosition, agent.name);
    setFieldValue(fieldsPositions.representativeEmailPosition, agent.email);
    setFieldValue(fieldsPositions.representativePhonePosition, agent.phone);

    setFieldValue(fieldsPositions.customerNamePosition, customer.company_name);
    setFieldValue(fieldsPositions.customerCnpjPosition, customer.cnpj);
    setFieldValue(fieldsPositions.portabilityPosition, 'no');
    setFieldValue(fieldsPositions.portabilityNumbersPosition, '');
    if (portability) {
      setFieldValue(fieldsPositions.portabilityPosition, 'yes');
      setFieldValue(
        fieldsPositions.portabilityNumbersPosition,
        portability.phone_numbers.join('+'),
      );
    }
    setFieldValue(fieldsPositions.specialInstructionsPosition, observation);

    const lineData = this.getLineField(products);
    payloadEstimate.Form.Fields[fieldsPositions.linePosition].Value =
      lineData.number;
    payloadEstimate.Form.Fields[fieldsPositions.linePosition].ID = lineData.id;
    payloadEstimate.Form.Fields[fieldsPositions.lineQuantityPosition].Value =
      lineData.value;
    setFieldValue(fieldsPositions.contractDurationPosition, '36+Meses');
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

  private static getLineField(payloadProducts: IEstimateProduct[]) {
    const lineProducts = payloadProducts.map(
      (product) => product.optional.line,
    );
    const lineQuantity = lineProducts.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0,
    );
    const lineFormId = lineProducts[0].form_id;
    const lineNumber = lineProducts[0].number;
    return {
      number: String(lineNumber),
      value: lineQuantity,
      id: String(lineFormId),
    };
  }

  private static convert(products: IEstimateProduct[]) {
    const productForms: IProductFieldsRpmPattern[] = [];
    products.map((product) => {
      const productFields: IProductFieldsRpmPattern = {
        Fields: [
          { Uid: '522_633', Values: [{ ID: product.form_id }] },
          { Uid: '500_6974', Values: [{ Value: product.quantity.toString() }] },
          { Uid: '500_8539', Values: [{ Value: product.price.toFixed(4) }] },
        ],
      };
      if (product.optional?.integration) {
        const integrationFields: IProductFieldsRpmPattern = {
          Fields: [
            {
              Uid: '522_633',
              Values: [{ ID: product.optional.integration.form_id }],
            },
            {
              Uid: '500_6974',
              Values: [{ Value: product.optional.integration.quantity }],
            },
            {
              Uid: '500_8539',
              Values: [
                { Value: product.optional.integration.price.toFixed(4) },
              ],
            },
          ],
        };
        productForms.push(integrationFields);
      }
      productForms.push(productFields);
    });
    return productForms;
  }
}
