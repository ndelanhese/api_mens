import User from '../../Domain/Entities/User';
import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import UpdateUserInputData from '../Dtos/UpdateUserInputData';

export default class UpdateUserAction {
  async execute(input: UpdateUserInputData, currentValue: User): Promise<User> {
    const userRepository = new UserRepository();
    const user = new User(
      input.first_name || currentValue.getFirstName(),
      input.last_name || currentValue.getLastName(),
      input.phone || currentValue.getPhone(),
      input.email || currentValue.getEmail(),
      input.password || currentValue.getPassword(),
      input.status || currentValue.getStatus(),
      input.id || currentValue.getId(),
    );
    return await userRepository.update(user);
  }
}
