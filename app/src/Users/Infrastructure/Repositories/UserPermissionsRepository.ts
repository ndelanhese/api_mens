import UserPermissions from '../../Domain/Entities/UserPermissions';
import UserPermissionsModel from '../Models/UserPermissionsModel';

export default class UserPermissionsRepository {
  private userPermissionsModel: UserPermissionsModel;

  constructor() {
    this.userPermissionsModel = new UserPermissionsModel();
  }

  async save(userPermissions: UserPermissions[]): Promise<UserPermissions[]> {
    return this.create(userPermissions);
  }

  async create(userPermissions: UserPermissions[]): Promise<UserPermissions[]> {
    const userPermission = await this.userPermissionsModel.bulkCreate(
      userPermissions,
    );
    return userPermission.map(
      userPermission =>
        new UserPermissions(
          userPermission.id,
          userPermission.permission_id,
          userPermission.user_id,
        ),
    );
  }

  async delete(userId: number): Promise<void> {
    await this.userPermissionsModel.bulkDelete(userId);
  }
}
