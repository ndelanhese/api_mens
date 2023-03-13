import HttpError from '@exceptions/HttpError';
import ConfiguratorsEstimateModel from '@db-models/ConfiguratorsEstimateModel';
import ConfiguratorEstimate from '../../Domain/Entities/ConfiguratorEstimate';

export default class ConfiguratorEstimateModel {
  public async createConfiguratorEstimate(payload: ConfiguratorEstimate) {
    try {
      return await ConfiguratorsEstimateModel.create({
        configurator_key: payload.getConfiguratorKey(),
        content: payload.getContent(),
        rpm_content: payload.getRpmContent(),
      });
    } catch {
      throw new HttpError(500, 'Erro ao criar pedido.');
    }
  }
}
