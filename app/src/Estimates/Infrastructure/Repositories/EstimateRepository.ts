import Estimate from '../../Domain/Entities/Estimate';
import EstimatesModel from '../Models/EstimateModel';

export default class EstimateRepository {
  private estimateModel: EstimatesModel;

  constructor() {
    this.estimateModel = new EstimatesModel();
  }

  async save(estimate: Estimate): Promise<Estimate> {
    return this.create(estimate);
  }

  async create(estimate: Estimate): Promise<Estimate> {
    const { id } = await this.estimateModel.createEstimate(estimate);
    return estimate.setId(id);
  }
}
