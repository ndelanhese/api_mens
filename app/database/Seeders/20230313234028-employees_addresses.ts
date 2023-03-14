import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('employees_addresses', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('employees_addresses', {});
}
