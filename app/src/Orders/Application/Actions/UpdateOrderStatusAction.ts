import OrdersRepository from '../../Infrastructure/Repositories/OrdersRepository';
import UpdateOrderStatusInputData from '../Dtos/UpdateOrderStatusInputData';

export default class UpdateOrderStatusAction {
  async execute(input: UpdateOrderStatusInputData) {
    const { id, status, observation } = input;
    const ordersRepository = new OrdersRepository();
    await ordersRepository.updateStatus(id, status, observation);
  }
}
