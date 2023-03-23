import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'superAdmin',
        description: 'Super Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        description: 'Usuário do sistema',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('roles', {});
}
