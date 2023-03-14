import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('methods_of_payments', [], {});
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('methods_of_payments', {});
}
