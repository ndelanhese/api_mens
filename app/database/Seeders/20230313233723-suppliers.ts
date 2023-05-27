import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'suppliers',
    [
      {
        contact_name: 'Cristiane Samuel',
        corporate_name: 'Cristiane Samuel Vidros Ltda.',
        cnpj: '91239063000150',
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('suppliers', {});
}
