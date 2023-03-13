import EstimateProducts from '../../Domain/Entities/EstimateProducts';
import EstimatesProductsModel from '../Models/EstimateProductsModel';

export default class EstimateProductsRepository {
  private estimateProductsModel: EstimatesProductsModel;

  constructor() {
    this.estimateProductsModel = new EstimatesProductsModel();
  }

  async save(estimate: EstimateProducts[]): Promise<EstimateProducts[]> {
    return this.create(estimate);
  }

  async create(estimate: EstimateProducts[]): Promise<EstimateProducts[]> {
    const responses = await this.estimateProductsModel.createEstimateProducts(
      estimate,
    );
    return responses.map(
      (response) =>
        new EstimateProducts(
          response.product_id,
          response.estimate_id,
          response.qtd,
          response.id,
        ),
    );
  }
}
