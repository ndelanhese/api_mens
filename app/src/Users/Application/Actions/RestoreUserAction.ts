import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import RestoreUserInputData from '../Dtos/RestoreUserInputData';

export default class RestoreUserAction {
  async execute(input: RestoreUserInputData): Promise<void> {
    const userRepository = new UserRepository();
    await userRepository.restore(input.id);
  }
}
