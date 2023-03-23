import { QueryInterface } from 'sequelize';

import { permissionsAdmin } from '../utils/PermissionsAdmin';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('users_permissions', permissionsAdmin(), {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('users_permissions', {});
}
