import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'superAdmin',
        description: 'Super Administrador',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
      {
        name: 'user',
        description: 'Usuário do sistema',
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
