import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import UpdateSaleStatusInputData from '../Dtos/UpdateSaleStatusInputData';

export default class UpdateSaleStatusAction {
  async execute(input: UpdateSaleStatusInputData) {
    const { id, status, observation } = input;
    const salesRepository = new SalesRepository();
    await salesRepository.updateStatus(id, status, observation);
  }
}
