import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'methods_of_payments',
    [
      { name: 'Pix', created_at: getDate(), updated_at: getDate() },
      {
        name: 'Cartão de Crédito',
        created_at: getDate(),
        updated_at: getDate(),
      },
      {
        name: 'Cartão de Débito',
        created_at: getDate(),
        updated_at: getDate(),
      },
      { name: 'Dinheiro', created_at: getDate(), updated_at: getDate() },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('methods_of_payments', {});
}
