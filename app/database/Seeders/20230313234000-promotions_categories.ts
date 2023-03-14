import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('promotions_categories', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('promotions_categories', {});
}
