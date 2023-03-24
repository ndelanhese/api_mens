import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'roles_permissions',
    [
      {
        role_id: 1,
        permission_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('roles_permissions', {});
}
