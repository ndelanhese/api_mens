import UserRepository from '../../Infrastructure/Repositories/CustomersRepository';
import DeleteUserInputData from '../Dtos/DeleteCustomerInputData';

export default class DeleteCustomerAction {
  async execute(input: DeleteUserInputData): Promise<void> {
    const userRepository = new UserRepository();
    await userRepository.delete(input.id);
  }
}
