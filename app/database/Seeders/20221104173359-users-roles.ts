import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'users_roles',
    [
      {
        role_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('users_roles', {});
}
