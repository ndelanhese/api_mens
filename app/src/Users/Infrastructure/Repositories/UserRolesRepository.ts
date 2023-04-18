import UserRoles from '../../Domain/Entities/UserRoles';
import UserRoleModel from '../Models/UserRoleModel';

export default class UserRolesRepository {
  private userRoleModel: UserRoleModel;

  constructor() {
    this.userRoleModel = new UserRoleModel();
  }

  async save(userRoles: UserRoles[]): Promise<UserRoles[]> {
    return this.create(userRoles);
  }

  async create(userRoles: UserRoles[]): Promise<UserRoles[]> {
    const userRole = await this.userRoleModel.bulkCreate(userRoles);
    return userRole.map(
      userRole =>
        new UserRoles(userRole.id, userRole.role_id, userRole.user_id),
    );
  }

  async delete(userId: number): Promise<void> {
    await this.userRoleModel.bulkDelete(userId);
  }
}
