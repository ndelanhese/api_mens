import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'superadmin',
        description: 'Super Administrador',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('roles', {});
}
