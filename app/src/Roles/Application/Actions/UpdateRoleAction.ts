import Role from '../../Domain/Entities/Role';
import RolePermissions from '../../Domain/Entities/RolePermissions';
import RolePermissionsRepository from '../../Infrastructure/Repositories/RolePermissionsRepository';
import RoleRepository from '../../Infrastructure/Repositories/RoleRepository';
import UpdateRoleInputData from '../Dtos/UpdateRoleInputData';

export default class UpdateRoleAction {
  async execute(input: UpdateRoleInputData, currentValue: Role): Promise<Role> {
    const roleRepository = new RoleRepository();
    const role = new Role(
      input.name || currentValue.getName(),
      input.description || currentValue.getDescription(),
      input.id || currentValue.getId(),
    );
    if (input.permissions) {
      const rolePermissionsRepository = new RolePermissionsRepository();
      await rolePermissionsRepository.delete(input.id);
      const rolePermissions = input.permissions.map(
        (permissions) => new RolePermissions(input.id, permissions),
      );
      await rolePermissionsRepository.save(rolePermissions);
    }
    return await roleRepository.update(role);
  }
}
