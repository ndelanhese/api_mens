import getDate from '@app/src/Shared/Domain/Utils/Date';
import { QueryInterface } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(
    'products',
    [
      {
        name: 'Camiseta Branca Lisa',
        description: 'Camiseta Masculina Branca Lisa',
        purchase_price: 40.55,
        price: 140.25,
        size: 'GG',
        color: 'Branco',
        quantity: 14,
        createdAt: getDate(),
        updatedAt: getDate(),
      },
    ],
    {},
  );
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('products', {});
}
