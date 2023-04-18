import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import DeleteUserInputData from '../Dtos/DeleteUserInputData';

export default class DeleteUserAction {
  async execute(input: DeleteUserInputData): Promise<void> {
    const userRepository = new UserRepository();
    await userRepository.delete(input.id);
  }
}
