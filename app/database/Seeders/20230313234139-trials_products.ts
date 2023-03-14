import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('trials_products', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('trials_products', {});
}
