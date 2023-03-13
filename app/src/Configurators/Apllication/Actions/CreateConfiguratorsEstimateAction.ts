import ConfiguratorEstimate from '../../Domain/Entities/ConfiguratorEstimate';
import ConfiguratorEstimateRepository from '../../Infrastructure/Repositories/Infrastructure';
import CreateConfiguratorEstimateInputData from '../Dtos/CreateConfiguratorEstimateInputData';

export default class CreateConfiguratorEstimateAction {
  async execute(
    input: CreateConfiguratorEstimateInputData,
  ): Promise<ConfiguratorEstimate> {
    const estimateRepository = new ConfiguratorEstimateRepository();
    const estimate = new ConfiguratorEstimate(
      input.configurator_key,
      input.content,
      input.rpmContent,
    );
    return await estimateRepository.save(estimate);
  }
}
