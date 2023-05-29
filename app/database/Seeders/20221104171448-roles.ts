import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'superadmin',
        description: 'Super Administrador',
        created_at: getDate(),
        updated_at: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('roles', {});
}
