import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'methods_of_payments',
    [
      { name: 'Pix', createdAt: getDate(), updatedAt: getDate() },
      { name: 'Cartão de Crédito', createdAt: getDate(), updatedAt: getDate() },
      { name: 'Cartão de Débito', createdAt: getDate(), updatedAt: getDate() },
      { name: 'Dinheiro', createdAt: getDate(), updatedAt: getDate() },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('methods_of_payments', {});
}
