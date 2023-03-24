import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'users_roles',
    [
      {
        role_id: 1,
        user_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        role_id: 2,
        user_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('users_roles', {});
}
