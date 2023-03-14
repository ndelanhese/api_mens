import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('suppliers_addresses', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('suppliers_addresses', {});
}
