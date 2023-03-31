import Role from '../../Domain/Entities/Role';
import RoleModel from '../Models/RolesModel';

export default class RoleRepository {
  private roleModel: RoleModel;

  constructor() {
    this.roleModel = new RoleModel();
  }

  async save(role: Role): Promise<Role> {
    if (role.getId()) {
      return this.update(role);
    }
    return this.create(role);
  }

  async create(role: Role): Promise<Role> {
    const { id } = await this.roleModel.createRole(role);
    return role.setId(id);
  }

  async delete(roleId: number): Promise<void> {
    await this.roleModel.deleteRole(roleId);
  }

  async update(role: Role): Promise<Role> {
    await this.roleModel.updateRole(role);
    return role;
  }
}
