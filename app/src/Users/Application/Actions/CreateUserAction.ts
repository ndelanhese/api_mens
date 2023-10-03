import User from '../../Domain/Entities/User';
import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import CreateUserInputData from '../Dtos/CreateUserInputData';

export default class CreateUserAction {
  async execute(input: CreateUserInputData): Promise<User> {
    const userRepository = new UserRepository();
    const user = new User(
      input.user.trim().toLowerCase(),
      input.email.trim().toLowerCase(),
      input.password,
      input.status,
      input.employee_id,
    );
    return await userRepository.save(user);
  }
}
