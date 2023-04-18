import User from '../../Domain/Entities/User';
import UserModel from '../Models/UserModel';

export default class UserRepository {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async save(user: User): Promise<User> {
    if (user.getId()) {
      this.update(user);
    }
    return this.create(user);
  }

  async create(user: User): Promise<User> {
    const { id } = await this.userModel.createUser(user);
    return user.setId(id);
  }

  async delete(userId: number): Promise<void> {
    await this.userModel.deleteUser(userId);
  }

  async update(user: User): Promise<void> {
    await this.userModel.updateUser(user);
  }

  async restore(userId: number): Promise<void> {
    await this.userModel.restoreUser(userId);
  }
}
