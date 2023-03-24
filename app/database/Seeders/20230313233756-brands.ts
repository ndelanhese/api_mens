import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'brands',
    [{ name: 'Touvo', createdAt: getDate(), updatedAt: getDate() }],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('brands', {});
}
