import RolePermissionsRepository from '../../Infrastructure/Repositories/RolePermissionsRepository';
import RoleRepository from '../../Infrastructure/Repositories/RoleRepository';
import DeleteRoleInputData from '../Dtos/DeleteRoleInputData';

export default class DeleteRoleAction {
  async execute(input: DeleteRoleInputData): Promise<void> {
    const roleRepository = new RoleRepository();
    await roleRepository.delete(input.id);
    const rolePermissionsRepository = new RolePermissionsRepository();
    await rolePermissionsRepository.delete(input.id);
  }
}
