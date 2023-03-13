import HttpError from '@exceptions/HttpError';
import EstimateProductsModel from '@db-models/EstimateProducts';
import EstimateProducts from '../../Domain/Entities/EstimateProducts';

export default class EstimatesProductsModel {
  public async createEstimateProducts(payload: EstimateProducts[]) {
    try {
      const estimate = payload.map((estimateProduct) => ({
        estimate_id: estimateProduct.getEstimateId(),
        product_id: estimateProduct.getProductId(),
        qtd: estimateProduct.getQtd(),
      }));
      return await EstimateProductsModel.bulkCreate(estimate);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar produtos do orçamento.');
    }
  }
}
