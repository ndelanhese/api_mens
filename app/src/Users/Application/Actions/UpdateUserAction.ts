import User from '../../Domain/Entities/User';
import UserRepository from '../../Infrastructure/Repositories/UserRepository';
import UpdateUserInputData from '../Dtos/UpdateUserInputData';

export default class UpdateUserAction {
  async execute(input: UpdateUserInputData, currentValue: User): Promise<void> {
    const userRepository = new UserRepository();
    const user = new User(
      input.user?.trim()?.toLowerCase() || currentValue.getUser(),
      input.email?.trim()?.toLowerCase() || currentValue.getEmail(),
      input.password || currentValue.getPassword(),
      input.status || currentValue.getStatus(),
      input.employee_id || currentValue.getEmployeeId(),
      input.id || currentValue.getId(),
    );
    await userRepository.update(user);
  }
}
