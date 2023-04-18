import UserPermissions from '../../Domain/Entities/UserPermissions';
import UserRole from '../../Domain/Entities/UserRoles';
import UserPermissionsRepository from '../../Infrastructure/Repositories/UserPermissionsRepository';
import UserRolesRepository from '../../Infrastructure/Repositories/UserRolesRepository';
import UploadRolesAndPermissionsInputData from '../Dtos/UpdateRolesAndPermissionsInputData';

export default class UpdateRolesAndPermissionsAction {
  async execute(input: UploadRolesAndPermissionsInputData): Promise<void> {
    const userPermissionsRepository = new UserPermissionsRepository();
    const userRolesRepository = new UserRolesRepository();
    const userPermissions = input.permissions_id.map(
      permission => new UserPermissions(permission, input.userId),
    );
    const userRoles = input.roles_id.map(
      role => new UserRole(role, input.userId),
    );
    await userPermissionsRepository.delete(input.userId);
    await userRolesRepository.delete(input.userId);
    await userPermissionsRepository.save(userPermissions);
    await userRolesRepository.save(userRoles);
  }
}
