import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('sales_methods_of_payments', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('sales_methods_of_payments', {});
}
