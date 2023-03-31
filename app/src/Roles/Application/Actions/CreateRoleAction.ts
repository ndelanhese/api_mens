import Role from '../../Domain/Entities/Role';
import RolePermissions from '../../Domain/Entities/RolePermissions';
import RolePermissionsRepository from '../../Infrastructure/Repositories/RolePermissionsRepository';
import RoleRepository from '../../Infrastructure/Repositories/RoleRepository';
import CreateRoleInputData from '../Dtos/CreateRoleInputData';

export default class CreateRoleAction {
  async execute(input: CreateRoleInputData): Promise<Role> {
    const roleRepository = new RoleRepository();
    const role = new Role(input.name, input.description);
    const roleCreated = await roleRepository.save(role);
    const rolePermissionsRepository = new RolePermissionsRepository();
    const rolePermissions = input.permissions.map(
      permissions =>
        new RolePermissions(Number(roleCreated.getId()), permissions),
    );
    await rolePermissionsRepository.save(rolePermissions);
    return roleCreated;
  }
}
