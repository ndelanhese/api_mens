import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'suppliers_addresses',
    [
      {
        supplier_id: 1,
        address_id: 1,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('suppliers_addresses', {});
}
