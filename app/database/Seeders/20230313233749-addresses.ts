import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('addresses', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('addresses', {});
}
