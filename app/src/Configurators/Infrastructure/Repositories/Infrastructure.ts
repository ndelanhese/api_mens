import ConfiguratorEstimate from '../../Domain/Entities/ConfiguratorEstimate';
import ConfiguratorEstimateModel from '../Models/ConfiguratorEstimate';

export default class ConfiguratorEstimateRepository {
  private configuratorEstimateModel: ConfiguratorEstimateModel;

  constructor() {
    this.configuratorEstimateModel = new ConfiguratorEstimateModel();
  }

  async save(
    configuratorEstimate: ConfiguratorEstimate,
  ): Promise<ConfiguratorEstimate> {
    return this.create(configuratorEstimate);
  }

  async create(
    configuratorEstimate: ConfiguratorEstimate,
  ): Promise<ConfiguratorEstimate> {
    const { id } =
      await this.configuratorEstimateModel.createConfiguratorEstimate(
        configuratorEstimate,
      );
    return configuratorEstimate.setId(id);
  }
}
