import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('sales_products', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('sales_products', {});
}
