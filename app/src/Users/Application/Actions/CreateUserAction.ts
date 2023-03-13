import User from '../../Domain/Entities/User';
import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import CreateUserInputData from '../Dtos/CreateUserInputData';

export default class CreateUserAction {
  async execute(input: CreateUserInputData): Promise<User> {
    const userRepository = new UserRepository();
    const user = new User(
      input.first_name,
      input.last_name,
      input.phone,
      input.email,
      input.password,
      input.status,
    );
    return await userRepository.save(user);
  }
}
